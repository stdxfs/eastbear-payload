'use client'
import React, { useState } from 'react'
import { format } from 'date-fns'
import { type DateRange } from 'react-day-picker'
import {
  X,
  ArrowRightLeft,
  CalendarIcon,
  Users,
  Search,
  Minus,
  Plus,
  HelpCircle,
} from 'lucide-react'

import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

type TripType = 'oneWay' | 'roundTrip'
type CabinClass = 'business' | 'first'

// Input with Clear Button Component - defined outside to prevent focus loss on re-render
const ClearableInput = ({
  value,
  onChange,
  placeholder,
  label,
  id,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  id: string
}) => (
  <div className="relative flex-1">
    <label htmlFor={id} className="block text-xs text-white/60 mb-1 md:hidden">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 md:h-14 px-4 pr-8 bg-transparent text-white placeholder:text-white/50 focus:outline-none text-sm md:text-base"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  </div>
)

export const ItinerarySearchBar: React.FC = () => {
  const router = useRouter()
  // State
  const [tripType, setTripType] = useState<TripType>('roundTrip')
  const [departure, setDeparture] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined)
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(undefined)
  const rangeSnapshotRef = React.useRef<DateRange | undefined>(undefined)
  const [passengers, setPassengers] = useState(1)
  const [cabinClass, setCabinClass] = useState<CabinClass>('business')
  const [datePickerOpenDesktop, setDatePickerOpenDesktop] = useState(false)
  const [datePickerOpenMobile, setDatePickerOpenMobile] = useState(false)
  const [passengerPopoverOpenDesktop, setPassengerPopoverOpenDesktop] = useState(false)
  const [passengerPopoverOpenMobile, setPassengerPopoverOpenMobile] = useState(false)

  // Handlers
  const handleSwap = () => {
    const temp = departure
    setDeparture(destination)
    setDestination(temp)
  }

  const handleDateSelect = (selected: DateRange | Date | undefined, closePicker: () => void) => {
    if (tripType === 'roundTrip') {
      const range = selected as DateRange | undefined
      if (!range?.from) {
        setDraftRange(undefined)
        return
      }
      const isDrafting = Boolean(draftRange?.from && !draftRange?.to)

      if (!isDrafting) {
        const snapshot = rangeSnapshotRef.current
        let nextStart = range.from

        if (snapshot?.from && range.from.getTime() !== snapshot.from.getTime()) {
          nextStart = range.from
        } else if (snapshot?.to && range.to && range.to.getTime() !== snapshot.to.getTime()) {
          nextStart = range.to
        }

        setDraftRange({ from: nextStart, to: undefined })
        return
      }

      if (!range.to || range.from.getTime() === range.to.getTime()) {
        setDraftRange({ from: range.from, to: undefined })
        return
      }

      setDraftRange({ from: range.from, to: range.to })
      setDepartureDate(range.from)
      setReturnDate(range.to)
      closePicker()
    } else {
      setDepartureDate(selected as Date | undefined)
      setReturnDate(undefined)
      closePicker()
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search:', {
      tripType,
      departure,
      destination,
      departureDate,
      returnDate,
      passengers,
      cabinClass,
    })
    router.push(
      `/result?departure=${departure}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&passengers=${passengers}&cabinClass=${cabinClass}`,
    )
  }

  const formatPassengerDisplay = () => {
    const cabinLabel = cabinClass === 'business' ? 'Business' : 'First Class'
    return `${passengers} , ${cabinLabel}`
  }

  // Trip Type Toggle Component
  const TripTypeToggle = () => (
    <div className="flex gap-1 mb-3 md:mb-0 md:absolute md:-top-8 md:left-0">
      <button
        type="button"
        onClick={() => setTripType('roundTrip')}
        className={cn(
          'px-3 py-1 text-sm font-medium rounded-md transition-colors',
          tripType === 'roundTrip'
            ? 'text-white bg-white/20'
            : 'text-white/60 hover:text-white hover:bg-white/10',
        )}
      >
        Round trip
      </button>
      <button
        type="button"
        onClick={() => {
          setTripType('oneWay')
          setDraftRange(undefined)
        }}
        className={cn(
          'px-3 py-1 text-sm font-medium rounded-md transition-colors',
          tripType === 'oneWay'
            ? 'text-white bg-white/20'
            : 'text-white/60 hover:text-white hover:bg-white/10',
        )}
      >
        One way
      </button>
    </div>
  )

  // Date Range Picker Component with separate Depart and Return inputs
  const DateRangePicker = ({
    open,
    onOpenChange,
    closePicker,
    variant = 'desktop',
  }: {
    open: boolean
    onOpenChange: (open: boolean) => void
    closePicker: () => void
    variant?: 'desktop' | 'mobile'
  }) => {
    const handleOpenChange = (isOpen: boolean) => {
      if (isOpen && tripType === 'roundTrip') {
        rangeSnapshotRef.current =
          departureDate || returnDate ? { from: departureDate, to: returnDate } : undefined
        setDraftRange(
          departureDate || returnDate ? { from: departureDate, to: returnDate } : undefined,
        )
      }

      if (!isOpen) {
        if (draftRange?.from && !draftRange?.to) {
          setDepartureDate(draftRange.from)
          if (returnDate && draftRange.from.getTime() > returnDate.getTime()) {
            setReturnDate(undefined)
          }
        }

        rangeSnapshotRef.current = undefined
        setDraftRange(undefined)
      }

      onOpenChange(isOpen)
    }

    const selectedRange =
      draftRange ??
      (departureDate || returnDate ? { from: departureDate, to: returnDate } : undefined)

    if (variant === 'mobile') {
      return (
        <Popover open={open} onOpenChange={handleOpenChange}>
          <div className="flex items-center border-b border-white/20">
            {/* Depart Input */}
            <div className="flex-1 border-r border-white/20">
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full text-left hover:bg-white/5 transition-colors"
                >
                  <div className="px-4 pt-2">
                    <span className="text-xs text-white/60">Depart</span>
                  </div>
                  <div className="h-12 px-4 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-white/60" />
                    <span className="text-white text-sm">
                      {departureDate ? format(departureDate, 'MMM d, yyyy') : 'Select date'}
                    </span>
                  </div>
                </button>
              </PopoverTrigger>
            </div>

            {/* Return Input */}
            <div
              className={cn('flex-1', tripType === 'oneWay' && 'opacity-50 pointer-events-none')}
            >
              <button
                type="button"
                className="w-full text-left hover:bg-white/5 transition-colors disabled:cursor-not-allowed"
                onClick={() => handleOpenChange(true)}
                disabled={tripType === 'oneWay'}
              >
                <div className="px-4 pt-2">
                  <span className="text-xs text-white/60">Return</span>
                </div>
                <div className="h-12 px-4 flex items-center">
                  <span className="text-white text-sm">
                    {tripType === 'roundTrip' && returnDate
                      ? format(returnDate, 'MMM d, yyyy')
                      : tripType === 'oneWay'
                        ? '-'
                        : 'Select date'}
                  </span>
                </div>
              </button>
            </div>
          </div>
          <PopoverContent className="w-auto p-0" side="bottom" align="start" sideOffset={8}>
            {tripType === 'roundTrip' ? (
              <Calendar
                mode="range"
                defaultMonth={departureDate || new Date()}
                selected={selectedRange}
                onSelect={(range) => handleDateSelect(range, closePicker)}
                numberOfMonths={2}
                disabled={{ before: new Date() }}
                className="rounded-lg"
              />
            ) : (
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={(date) => handleDateSelect(date, closePicker)}
                numberOfMonths={2}
                disabled={{ before: new Date() }}
                className="rounded-lg"
              />
            )}
          </PopoverContent>
        </Popover>
      )
    }

    // Desktop variant
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <div className="flex items-center h-full w-full">
          {/* Depart Input */}
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex-1 flex flex-col justify-center h-12 md:h-14 px-4 text-left hover:bg-white/5 transition-colors border-r border-white/20"
            >
              <span className="text-xs text-white/60">Depart</span>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-white/60" />
                <span className="text-white text-sm whitespace-nowrap">
                  {departureDate ? format(departureDate, 'MMM d') : 'Select'}
                </span>
              </div>
            </button>
          </PopoverTrigger>

          {/* Return Input */}
          <button
            type="button"
            className={cn(
              'flex-1 flex flex-col justify-center h-12 md:h-14 px-4 text-left transition-colors',
              tripType === 'oneWay' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5',
            )}
            onClick={() => handleOpenChange(true)}
            disabled={tripType === 'oneWay'}
          >
            <span className="text-xs text-white/60">Return</span>
            <span className="text-white text-sm whitespace-nowrap">
              {tripType === 'roundTrip' && returnDate
                ? format(returnDate, 'MMM d')
                : tripType === 'oneWay'
                  ? '-'
                  : 'Select'}
            </span>
          </button>
        </div>
        <PopoverContent className="w-auto p-0" side="bottom" align="start" sideOffset={8}>
          {tripType === 'roundTrip' ? (
            <Calendar
              mode="range"
              defaultMonth={departureDate || new Date()}
              selected={selectedRange}
              onSelect={(range) => handleDateSelect(range, closePicker)}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
              className="rounded-lg"
            />
          ) : (
            <Calendar
              mode="single"
              selected={departureDate}
              onSelect={(date) => handleDateSelect(date, closePicker)}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
              className="rounded-lg"
            />
          )}
        </PopoverContent>
      </Popover>
    )
  }

  // Passenger & Cabin Popover Component
  const PassengerCabinButton = ({
    open,
    onOpenChange,
    closePopover,
  }: {
    open: boolean
    onOpenChange: (open: boolean) => void
    closePopover: () => void
  }) => (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 h-12 md:h-14 px-4 text-left text-sm md:text-base hover:bg-white/5 transition-colors"
        >
          <Users className="w-4 h-4 text-white/60" />
          <span className="text-white whitespace-nowrap">{formatPassengerDisplay()}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="start" sideOffset={8}>
        <div className="space-y-4">
          {/* Passengers */}
          <div>
            <label className="text-sm font-medium text-foreground">Passengers</label>
            <div className="flex items-center justify-between mt-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                disabled={passengers <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-lg font-medium w-12 text-center">{passengers}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setPassengers((p) => Math.min(50, p + 1))}
                disabled={passengers >= 50}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Cabin Class */}
          <div>
            <label className="text-sm font-medium text-foreground">Cabin Class</label>
            <div className="flex flex-col gap-2 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="cabinClass"
                  value="business"
                  checked={cabinClass === 'business'}
                  onChange={() => setCabinClass('business')}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm">Business Class</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="cabinClass"
                  value="first"
                  checked={cabinClass === 'first'}
                  onChange={() => setCabinClass('first')}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm">First Class</span>
              </label>
            </div>
          </div>

          <Button type="button" className="w-full" onClick={closePopover}>
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )

  // How It Works Dialog (Mobile)
  const HowItWorksDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>How it works</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How It Works</DialogTitle>
          <DialogDescription className="space-y-3 pt-2">
            {/* <p>
              <strong>1. Search for flights</strong> - Enter your departure and destination cities,
              select your travel dates, and specify passenger details.
            </p>
            <p>
              <strong>2. Compare options</strong> - We&apos;ll show you available business and first
              class flights from multiple airlines.
            </p>
            <p>
              <strong>3. Book with confidence</strong> - Select your preferred flight and complete
              your booking securely.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Our team specializes in premium cabin bookings, ensuring you get the best value for
              your luxury travel experience.
            </p> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      {/* Desktop Layout */}
      <div className="hidden md:block relative w-full">
        <TripTypeToggle />
        <div className="flex w-full items-stretch bg-white/10 backdrop-blur-md rounded-full overflow-hidden shadow-lg">
          {/* From */}
          <div className="flex items-center border-r border-white/20 flex-1 min-w-0">
            <ClearableInput
              id="departure-desktop"
              value={departure}
              onChange={setDeparture}
              placeholder="From"
              label="From"
            />
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={handleSwap}
            className="flex items-center justify-center w-10 hover:bg-white/10 transition-colors group"
            title="Swap departure and destination"
          >
            <ArrowRightLeft className="w-4 h-4 text-white/60 group-hover:text-white transition-colors group-hover:rotate-180 duration-300" />
          </button>

          {/* To */}
          <div className="flex items-center border-r border-white/20 flex-1 min-w-0">
            <ClearableInput
              id="destination-desktop"
              value={destination}
              onChange={setDestination}
              placeholder="To"
              label="To"
            />
          </div>

          {/* Date Picker - Depart + Return (2 units) */}
          <div className="flex items-center border-r border-white/20 flex-[2] min-w-0">
            <DateRangePicker
              open={datePickerOpenDesktop}
              onOpenChange={setDatePickerOpenDesktop}
              closePicker={() => setDatePickerOpenDesktop(false)}
              variant="desktop"
            />
          </div>

          {/* Passengers & Cabin */}
          <div className="flex items-center border-r border-white/20 flex-1 min-w-0">
            <PassengerCabinButton
              open={passengerPopoverOpenDesktop}
              onOpenChange={setPassengerPopoverOpenDesktop}
              closePopover={() => setPassengerPopoverOpenDesktop(false)}
            />
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="h-14 px-8 rounded-none rounded-r-full bg-white text-gray-900 hover:bg-white/90 font-semibold"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <TripTypeToggle />
        <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg">
          {/* Row 1: From / To */}
          <div className="flex items-center border-b border-white/20">
            <ClearableInput
              id="departure-mobile"
              value={departure}
              onChange={setDeparture}
              placeholder="From"
              label="From"
            />
            <button
              type="button"
              onClick={handleSwap}
              className="flex items-center justify-center w-12 h-12 hover:bg-white/10 transition-colors"
              title="Swap"
            >
              <ArrowRightLeft className="w-4 h-4 text-white/60" />
            </button>
            <ClearableInput
              id="destination-mobile"
              value={destination}
              onChange={setDestination}
              placeholder="To"
              label="To"
            />
          </div>

          {/* Row 2: Dates */}
          <DateRangePicker
            open={datePickerOpenMobile}
            onOpenChange={setDatePickerOpenMobile}
            closePicker={() => setDatePickerOpenMobile(false)}
            variant="mobile"
          />

          {/* Row 3: Passengers & Cabin */}
          <div className="border-b border-white/20">
            <div className="px-4 pt-2">
              <span className="text-xs text-white/60">Travelers & Class</span>
            </div>
            <PassengerCabinButton
              open={passengerPopoverOpenMobile}
              onOpenChange={setPassengerPopoverOpenMobile}
              closePopover={() => setPassengerPopoverOpenMobile(false)}
            />
          </div>

          {/* Row 4: Search & How it works */}
          <div className="p-4 flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full h-12 bg-white text-gray-900 hover:bg-white/90 font-semibold rounded-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Flights
            </Button>
            <div className="flex justify-center">
              <HowItWorksDialog />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
