import React from 'react';
import clsx from "clsx";

type StatVariant = 'blue' | 'green' | 'orange'

const STAT_VARIANTS: Record<
  StatVariant,
  { container: string; icon: string }
> = {
  blue: {
    container: 'from-blue-50 to-indigo-50 border-blue-100',
    icon: 'bg-blue-500/10 text-blue-500',
  },
  green: {
    container: 'from-emerald-50 to-lime-50 border-emerald-100',
    icon: 'bg-emerald-500/10 text-emerald-500',
  },
  orange: {
    container: 'from-orange-50 to-amber-50 border-orange-100',
    icon: 'bg-orange-500/10 text-orange-500',
  },
}

type StatCardProps = {
  label: string
  value: string
  icon: string
  variant: StatVariant
}

const StatCard = ({label, value, icon, variant}: StatCardProps) => {
  const styles = STAT_VARIANTS[variant]

  return (
    <div
      className={clsx(
        'flex items-start justify-between rounded-md border bg-gradient-to-r p-2.5',
        styles.container,
      )}
    >
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <span className="mt-1 text-2xl text-gray-900">
          {value}
        </span>
      </div>

      <div
        className={clsx(
          'flex size-7 items-center justify-center rounded-md text-xs',
          styles.icon,
        )}
      >
        {icon}
      </div>
    </div>
  )
}

export default StatCard;