import Image from 'next/image'

type IconName =
  | 'home'
  | 'user'
  | 'shield'
  | 'calendar'
  | 'clock'
  | 'notes'
  | 'report'
  | 'star'
  | 'location'
  | 'notification'
  | 'image'
  | 'document'
  | 'setting'
  | 'trash'
  | 'lock'
  | 'logout'
  | 'briefcase'
  | 'arrow'
  | 'warning'
  | 'search'
  | 'close'
  | 'check'
  | 'maximize'
  | 'minimize'
  | 'shieldWarning'
  | 'chatLock'

const paths: Record<IconName, string> = {
  home: 'smart house/outline/home.svg',
  user: 'user/outline/user.svg',
  shield: 'interface/outline/shield-check.svg',
  calendar: 'time and date/outline/calendar.svg',
  clock: 'time and date/outline/time-oclock.svg',
  notes: 'notes and task/outline/notes.svg',
  report: 'education/outline/report.svg',
  star: 'interface/outline/star.svg',
  location: 'navigation maps/outline/location.svg',
  notification: 'device/outline/notification.svg',
  image: 'multimedia and audio/outline/image.svg',
  document: 'editor/outline/document-text.svg',
  setting: 'interface/outline/setting.svg',
  trash: 'interface/outline/trash.svg',
  lock: 'device/outline/lock.svg',
  logout: 'interface/outline/logout.svg',
  briefcase: 'business/outline/briefcase.svg',
  arrow: 'arrows/outline/arrow-right.svg',
  warning: 'interface/outline/warning.svg',
  search: 'interface/outline/search 01.svg',
  close: 'interface/outline/remove.svg',
  check: 'interface/outline/check-circle.svg',
  maximize: 'arrows/outline/maximize.svg',
  minimize: 'arrows/outline/minimize.svg',
  shieldWarning: 'interface/outline/shield-warning.svg',
  chatLock: 'communication/outline/chat-lock.svg',
}

export function AdminIcon({
  name,
  className = '',
}: {
  name: IconName
  className?: string
}) {
  return (
    <Image
      unoptimized
      width={18}
      height={18}
      className={`admin-icon ${className}`}
      src={`/assets/icons/${paths[name].split('/').map(encodeURIComponent).join('/')}`}
      alt=""
      aria-hidden="true"
    />
  )
}

export type { IconName }
