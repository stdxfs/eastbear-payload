'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  MapPin,
  Calendar,
  User,
  Users,
  Phone,
  Mail,
  Tag,
  Headphones,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'

type TripType = 'round-trip' | 'one-way' | 'multi-city'

export function GetQuoteForm({ className }: { className?: string }) {
  const [tripType, setTripType] = useState<TripType>('round-trip')

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Header Section */}
      <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 to-pink-50 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="size-16 rounded-full border-2 border-white bg-gray-200 shadow-md overflow-hidden">
                <div className="size-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <Headphones className="size-8 text-gray-600" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 size-4 rounded-full bg-green-500 border-2 border-white" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-gray-600">Call to Learn More or Book</p>
              <a
                href="tel:888-668-0828"
                className="text-2xl font-bold text-[#ff385c] hover:underline"
              >
                888-668-0828
              </a>
              <p className="text-xs text-gray-500">
                Your Discount ID <span className="font-bold">SKY562-1854</span>
              </p>
            </div>
          </div>
          <div className="rounded-full bg-[#ff385c] px-5 py-2.5 shadow-lg">
            <span className="font-bold text-white">SAVE $200</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-200" />
        <span className="mx-4 flex-shrink bg-background px-2 text-xs text-muted-foreground">
          OR SUBMIT A REQUEST
        </span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      {/* Form Section */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-lg overflow-hidden">
        {/* Trip Type Tabs */}
        <div className="flex border-b border-gray-200">
          {(['round-trip', 'one-way', 'multi-city'] as TripType[]).map((type) => (
            <button
              key={type}
              onClick={() => setTripType(type)}
              className={cn(
                'flex-1 py-4 text-sm font-medium uppercase tracking-wide transition-colors',
                tripType === type
                  ? 'border-b-2 border-gray-900 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
              )}
            >
              {type.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-5">
            {/* From */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700">From*</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  placeholder="City or airport"
                  className="h-14 rounded-xl border-gray-300 pl-12 text-base"
                />
              </div>
            </div>

            {/* To */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700">To*</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  placeholder="City or airport"
                  className="h-14 rounded-xl border-gray-300 pl-12 text-base"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-700">Depart Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input type="date" className="h-14 rounded-xl border-gray-300 pl-12 text-base" />
                </div>
              </div>
              {tripType !== 'one-way' && (
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Return Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <Input
                      type="date"
                      className="h-14 rounded-xl border-gray-300 pl-12 text-base"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700">Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  placeholder="e.g. John Smith"
                  className="h-14 rounded-xl border-gray-300 pl-12 text-base"
                />
              </div>
            </div>

            {/* Passengers / Cabin */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700">Passengers / Cabin</Label>
              <div className="flex gap-2">
                <div className="relative w-20">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    type="number"
                    min="1"
                    max="9"
                    defaultValue="1"
                    className="h-14 rounded-xl border-gray-300 pl-10 pr-2 text-base text-center"
                  />
                </div>
                <Select defaultValue="economy">
                  <SelectTrigger className="h-14 flex-1 rounded-xl border-gray-300 text-base">
                    <SelectValue placeholder="Select cabin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="first">First Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700">Phone Number*</Label>
              <div className="flex gap-2">
                <Select defaultValue="+1">
                  <SelectTrigger className="h-14 w-24 rounded-xl border-gray-300 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+91">+91</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    className="h-14 rounded-xl border-gray-300 pl-12 text-base"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700">Email*</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="someone@example.com"
                  className="h-14 rounded-xl border-gray-300 pl-12 text-base"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="button"
              className="h-14 w-full rounded-xl bg-[#ff385c] text-lg font-bold text-white shadow-lg hover:bg-[#e31c5f] transition-colors"
            >
              GET FREE QUOTES
            </Button>

            {/* Privacy Notice */}
            <p className="text-xs text-gray-500 leading-relaxed">
              *No Spam - only phone-exclusive deals. No purchase necessary. By providing your
              contact details and clicking on &quot;Get Free Quotes&quot; you agree to be contacted
              for travel information via phone and automated phone and text messages and by email.
              Your consent to receive such messages is not a condition of purchase. We respect your{' '}
              <Link href="/privacy" className="underline hover:text-gray-700">
                privacy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Why Book With Us Section */}
      <div className="space-y-6">
        <h3 className="text-center text-xl font-bold text-gray-900">
          Why Book With Us?
          <span className="ml-1 inline-block size-3 rounded-full bg-[#ff385c]" />
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-rose-100">
              <Tag className="size-6 text-rose-500" />
            </div>
            <p className="text-sm font-bold text-gray-900">70%* OFF</p>
            <p className="text-xs text-gray-500">Phone-Only Deals</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-yellow-100">
              <CheckCircle className="size-6 text-yellow-500" />
            </div>
            <p className="text-sm font-bold text-gray-900">2M+ Clients</p>
            <p className="text-xs text-gray-500">Trusted Worldwide</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-blue-100">
              <Headphones className="size-6 text-blue-500" />
            </div>
            <p className="text-sm font-bold text-gray-900">500+ Experts</p>
            <p className="text-xs text-gray-500">Ready to Help</p>
          </div>
        </div>
      </div>
    </div>
  )
}
