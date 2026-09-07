'use client'
import { useState } from 'react'
import { useAppStore } from '@/stores/appStore'
import {
  useUpcomingBirthdays, useFollowUps,
} from '@/queries'
import Link from 'next/link'
import { Lightning, Cake, X } from '@phosphor-icons/react'
import { formatShortDate } from '@/lib/formatting'
import { MiniCalendar } from '@/components/common/MiniCalendar'
import type { Contact } from '@/types/contact'

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isSameMonthDay(a: Date, b: Date) {
  return a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function RightPanel() {
  const { activeTenantId, userRole } = useAppStore()
  const { data: birthdays } = useUpcomingBirthdays(activeTenantId, userRole)
  const { data: followUps } = useFollowUps(activeTenantId, userRole)

  const [selectedDate, setSelectedDate] = useState<Date | null>(() => new Date())

  // With no date picked, show the first couple of each as a quick digest.
  // With a date picked, show exactly what falls on that day — birthdays
  // match month+day every year, follow-ups match the exact date.
  const birthdaysForDay = (birthdays ?? []).filter((c: Contact) =>
    selectedDate && c.importantDates.some(d => d.type === 'birthday' && isSameMonthDay(new Date(d.date), selectedDate))
  )
  const followUpsForDay = (followUps ?? []).filter((c: Contact) =>
    selectedDate && c.nextFollowUpDate && isSameDay(new Date(c.nextFollowUpDate), selectedDate)
  )
  const upcomingBirthdays = selectedDate ? birthdaysForDay : (birthdays ?? []).slice(0, 2)
  const pendingFollowUps = selectedDate ? followUpsForDay : (followUps ?? []).slice(0, 2)

  return (
    <aside className="hidden xl:flex flex-col w-72 shrink-0 sticky top-0 h-screen py-6 pl-6 pr-3 overflow-y-auto scrollbar-none">

      {/* Calendar, today's briefing and needs-attention all live in one
          card — picking a day filters the attention list below. */}
      <section className="mb-6 rounded-2xl border border-border bg-card shrink-0">
        <div className="p-3">
          <MiniCalendar value={selectedDate} onChange={setSelectedDate} />
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-foreground py-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              Clear selection
            </button>
          )}
        </div>

        {/* Needs attention — birthdays and follow-ups, filtered to the
            picked date when one is selected */}
        <div className="px-3 pb-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">
              {selectedDate
                ? `Attention · ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                : 'Needs attention'}
            </h3>
            {selectedDate && (
              <button onClick={() => setSelectedDate(null)} className="flex items-center gap-1 text-xs text-primary font-medium">
                <X size={11} weight="bold" />
                Clear
              </button>
            )}
          </div>

          {upcomingBirthdays.length === 0 && pendingFollowUps.length === 0 ? (
            <p className="text-xs text-muted-foreground px-1">
              {selectedDate ? 'Nothing needs attention on this day.' : 'Nothing needs attention right now.'}
            </p>
          ) : (
            <div className="space-y-2">
              {upcomingBirthdays.map(c => (
                <Link
                  key={`bday-${c.id}`}
                  href={`/leader/contacts/${c.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Cake size={15} weight="fill" className="text-rose-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Birthday {formatShortDate(c.importantDates.find(d => d.type === 'birthday')?.date ?? c.importantDates[0]?.date ?? '')}
                    </p>
                  </div>
                </Link>
              ))}
              {pendingFollowUps.map(c => (
                <Link
                  key={`fu-${c.id}`}
                  href={`/leader/contacts/${c.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Lightning size={15} weight="fill" className="text-amber-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.nextFollowUpNote ?? 'Follow up needed'}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

    </aside>
  )
}
