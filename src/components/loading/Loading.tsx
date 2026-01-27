import {
  Ellipsis,
  Loader,
  LoaderCircle,
  LoaderPinwheel,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'

const ICONS = {
  ellipsis: Ellipsis,
  loader: Loader,
  pinwheel: LoaderPinwheel,
  circle: LoaderCircle,
} satisfies Record<string, LucideIcon>

export type LoadingProps = LucideProps & {
  variant?: keyof typeof ICONS
  label?: string
}

export function Loading({ variant = 'loader', label, ...iconProps }: LoadingProps) {
  const Icon = ICONS[variant]
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-2"
      aria-label={label ?? 'Loading'}
    >
      <Icon {...iconProps} className="animate-spin" />
      {label && <p className="text-xs">{label}</p>}
    </div>
  )
}
