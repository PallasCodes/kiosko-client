import React from 'react'

interface Props {
  usePadding?: boolean
  children: React.ReactNode
}

export default function Layout({ usePadding = true, children }: Props) {
  return (
    <div
      id="layout"
      className={`w-full min-h-[100vh] ${usePadding ? 'py-10 px-16' : ''}`}
    >
      <div className="mx-auto">{children}</div>
    </div>
  )
}
