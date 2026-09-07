import {
  HouseSimple, AddressBook, Bell, ChatCircleDots, Sparkle,
} from '@phosphor-icons/react'

export interface NavItem {
  href: string
  icon: React.ElementType
  label: string
}

/** Single source of truth for the primary destinations — used by the desktop
 *  sidebar and by the mobile "More" sheet so the two cannot drift apart. */
export const NAV_ITEMS: NavItem[] = [
  { href: '/leader/home', icon: HouseSimple, label: 'Home' },
  { href: '/leader/contacts', icon: AddressBook, label: 'Contacts' },
  { href: '/leader/notifications', icon: Bell, label: 'Notifications' },
  { href: '/leader/messages', icon: ChatCircleDots, label: 'Messages' },
  { href: '/leader/ai', icon: Sparkle, label: 'AI' },
]

/** The four that get their own slot in the mobile bottom bar. */
export const MOBILE_PRIMARY_HREFS = [
  '/leader/home',
  '/leader/contacts',
  '/leader/notifications',
  '/leader/messages',
]
