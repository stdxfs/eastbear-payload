'use client'

import * as React from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames, type DateRange } from 'react-day-picker'

import { cn } from '@/utilities/ui'
import { Button, buttonVariants } from '@/components/ui/button'

// Context for hover state
const HoverContext = React.createContext<{
  hoveredDate: Date | undefined
  rangeStart: Date | undefined
}>({
  hoveredDate: undefined,
  rangeStart: undefined,
})

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  // Track hovered date for range preview
  const [hoveredDate, setHoveredDate] = React.useState<Date | undefined>(undefined)

  // Get range start from selected prop if in range mode
  const rangeStart =
    props.mode === 'range' && props.selected ? (props.selected as DateRange)?.from : undefined

  // Only show hover preview when we have a start date but no end date
  const showHoverPreview =
    props.mode === 'range' && rangeStart && !(props.selected as DateRange)?.to

  return (
    <HoverContext.Provider
      value={{ hoveredDate: showHoverPreview ? hoveredDate : undefined, rangeStart }}
    >
      <DayPicker
        showOutsideDays={showOutsideDays}
        onDayMouseEnter={(date) => setHoveredDate(date)}
        onDayMouseLeave={() => setHoveredDate(undefined)}
        className={cn(
          'bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
          String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
          String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
          className,
        )}
        captionLayout={captionLayout}
        formatters={{
          formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
          ...formatters,
        }}
        classNames={{
          root: cn('w-fit', defaultClassNames.root),
          months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
          month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
          nav: cn(
            'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
            defaultClassNames.nav,
          ),
          button_previous: cn(
            buttonVariants({ variant: buttonVariant }),
            'h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50',
            defaultClassNames.button_previous,
          ),
          button_next: cn(
            buttonVariants({ variant: buttonVariant }),
            'h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50',
            defaultClassNames.button_next,
          ),
          month_caption: cn(
            'flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]',
            defaultClassNames.month_caption,
          ),
          dropdowns: cn(
            'flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium',
            defaultClassNames.dropdowns,
          ),
          dropdown_root: cn(
            'has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border',
            defaultClassNames.dropdown_root,
          ),
          dropdown: cn('bg-popover absolute inset-0 opacity-0', defaultClassNames.dropdown),
          caption_label: cn(
            'select-none font-medium',
            captionLayout === 'label'
              ? 'text-sm'
              : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5',
            defaultClassNames.caption_label,
          ),
          table: 'w-full border-collapse',
          weekdays: cn('flex', defaultClassNames.weekdays),
          weekday: cn(
            'text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal',
            defaultClassNames.weekday,
          ),
          week: cn('mt-0 flex w-full', defaultClassNames.week),
          week_number_header: cn(
            'w-[--cell-size] select-none',
            defaultClassNames.week_number_header,
          ),
          week_number: cn(
            'text-muted-foreground select-none text-[0.8rem]',
            defaultClassNames.week_number,
          ),
          day: cn(
            'group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md',
            defaultClassNames.day,
          ),
          range_start: cn('bg-accent rounded-l-sm', defaultClassNames.range_start),
          range_middle: cn('rounded-none', defaultClassNames.range_middle),
          range_end: cn('bg-accent rounded-r-sm', defaultClassNames.range_end),
          today: cn('', defaultClassNames.today),
          outside: cn(
            'text-muted-foreground aria-selected:text-muted-foreground',
            defaultClassNames.outside,
          ),
          disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
          hidden: cn('invisible', defaultClassNames.hidden),
          ...classNames,
        }}
        components={{
          Root: ({ className, rootRef, ...props }) => {
            return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
          },
          Chevron: ({ className, orientation, ...props }) => {
            if (orientation === 'left') {
              return <ChevronLeftIcon className={cn('size-4', className)} {...props} />
            }

            if (orientation === 'right') {
              return <ChevronRightIcon className={cn('size-4', className)} {...props} />
            }

            return <ChevronDownIcon className={cn('size-4', className)} {...props} />
          },
          DayButton: CalendarDayButton,
          WeekNumber: ({ children, ...props }) => {
            return (
              <td {...props}>
                <div className="flex size-[--cell-size] items-center justify-center text-center">
                  {children}
                </div>
              </td>
            )
          },
          ...components,
        }}
        {...props}
      />
    </HoverContext.Provider>
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()
  const { hoveredDate, rangeStart } = React.useContext(HoverContext)

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  // Check if this day is in the hover preview range (handles both forward and backward selection)
  const isInHoverRange = React.useMemo(() => {
    if (!hoveredDate || !rangeStart) return false

    const dayTime = day.date.getTime()
    const startTime = rangeStart.getTime()
    const hoverTime = hoveredDate.getTime()

    // Handle both forward (start < hover) and backward (hover < start) selection
    const minTime = Math.min(startTime, hoverTime)
    const maxTime = Math.max(startTime, hoverTime)

    // Strictly between (not including endpoints which have their own styling)
    return dayTime > minTime && dayTime < maxTime
  }, [hoveredDate, rangeStart, day.date])

  // Check if this is the hovered end date (but not the start date)
  const isHoveredEnd =
    hoveredDate &&
    rangeStart &&
    day.date.getTime() === hoveredDate.getTime() &&
    day.date.getTime() !== rangeStart.getTime()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-hover-range={isInHoverRange}
      data-hover-end={isHoveredEnd}
      className={cn(
        // Base styles - no rounding by default for seamless grid
        'rounded-none',
        // Transition for smooth hover
        'transition-[background-color,color] duration-150 ease-in-out',
        // Layout
        'flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none',
        // Selected states
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:rounded-sm',
        'data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:rounded-l-sm',
        'data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground',
        'data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:rounded-r-sm',
        // Hover preview states
        'data-[hover-range=true]:bg-accent data-[hover-range=true]:text-accent-foreground',
        'data-[hover-end=true]:bg-accent data-[hover-end=true]:text-accent-foreground data-[hover-end=true]:rounded-r-sm',
        // Default hover
        'hover:bg-accent hover:text-accent-foreground',
        // Focus states
        'group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]',
        // Misc
        '[&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
