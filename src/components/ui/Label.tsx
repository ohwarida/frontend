import React from 'react'

type LabelProps = {
  name: string
  label: string
}

const Label = (props: LabelProps) => {
  const { name, label } = props

  return (
    <label htmlFor={name} className="font-base ml-0.5 text-xs text-gray-700">
      {label}
    </label>
  )
}

export default Label
