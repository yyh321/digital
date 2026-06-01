'use client'

import { ReactNode } from 'react'

interface TechPanelProps {
  title: string
  children: ReactNode
  className?: string
  height?: string
  showScan?: boolean
}

export default function TechPanel({ title, children, className = '', height = 'auto', showScan = false }: TechPanelProps) {
  return (
    <div
      className={`relative bg-[#0a1225]/80 backdrop-blur-sm border border-[#0ea5e9]/20 rounded-sm p-4 overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* 四角装饰 */}
      <span className="corner-mark corner-mark-tl" />
      <span className="corner-mark corner-mark-tr" />
      <span className="corner-mark corner-mark-bl" />
      <span className="corner-mark corner-mark-br" />

      {/* 标题 */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="tech-title text-[18px] text-[#e0f2fe]">{title}</h3>
        <span className="w-2 h-2 rounded-full bg-[#0ea5e9] pulse-dot" />
      </div>

      {/* 内容区 */}
      <div className="relative h-[calc(100%-36px)]">
        {children}
        {showScan && <div className="scan-line absolute inset-0 pointer-events-none" />}
      </div>
    </div>
  )
}
