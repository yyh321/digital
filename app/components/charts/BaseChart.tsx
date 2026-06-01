'use client'

import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'

type ChartType = 'bar' | 'line' | 'pie' | 'area'

interface BaseChartProps {
  type: ChartType
  data: Record<string, unknown>
  className?: string
}

const THEME_COLORS = ['#0ea5e9', '#06b6d4', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e']

export default function BaseChart({ type, data, className = '' }: BaseChartProps) {
  const option: EChartsOption = useMemo(() => {
    const base: EChartsOption = {
      backgroundColor: 'transparent',
      textStyle: { color: '#94a3b8', fontFamily: 'Rajdhani, sans-serif' },
      tooltip: {
        trigger: type === 'pie' ? 'item' : 'axis',
        backgroundColor: 'rgba(2, 6, 23, 0.9)',
        borderColor: '#0ea5e9',
        borderWidth: 1,
        textStyle: { color: '#e0f2fe' },
      },
    }

    if (type === 'bar') {
      return {
        ...base,
        grid: { top: 30, right: 10, bottom: 20, left: 10, containLabel: true },
        xAxis: {
          type: 'category',
          data: data.xAxis as string[],
          axisLine: { lineStyle: { color: 'rgba(14, 165, 233, 0.2)' } },
          axisTick: { show: false },
          axisLabel: { color: '#64748b', fontSize: 11 },
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { color: 'rgba(14, 165, 233, 0.08)' } },
          axisLabel: { color: '#64748b', fontSize: 11 },
        },
        series: [
          {
            type: 'bar',
            data: data.series as number[],
            barWidth: '40%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#0ea5e9' },
                  { offset: 1, color: 'rgba(14, 165, 233, 0.1)' },
                ],
              },
              borderRadius: [2, 2, 0, 0],
            },
          },
        ],
      }
    }

    if (type === 'line' || type === 'area') {
      return {
        ...base,
        grid: { top: 30, right: 10, bottom: 20, left: 10, containLabel: true },
        xAxis: {
          type: 'category',
          data: data.xAxis as string[],
          axisLine: { lineStyle: { color: 'rgba(14, 165, 233, 0.2)' } },
          axisTick: { show: false },
          axisLabel: { color: '#64748b', fontSize: 11 },
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { color: 'rgba(14, 165, 233, 0.08)' } },
          axisLabel: { color: '#64748b', fontSize: 11 },
        },
        series: [
          {
            type: 'line',
            data: data.series as number[],
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: { width: 2, color: '#0ea5e9' },
            itemStyle: { color: '#0ea5e9', borderColor: '#020617', borderWidth: 2 },
            areaStyle: type === 'area' ? {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(14, 165, 233, 0.35)' },
                  { offset: 1, color: 'rgba(14, 165, 233, 0)' },
                ],
              },
            } : undefined,
          },
        ],
      }
    }

    if (type === 'pie') {
      return {
        ...base,
        series: [
          {
            type: 'pie',
            radius: ['45%', '75%'],
            center: ['50%', '55%'],
            data: data.series as Array<{ name: string; value: number }>,
            label: { color: '#94a3b8', fontSize: 12, formatter: '{b}\n{d}%' },
            labelLine: { lineStyle: { color: 'rgba(14, 165, 233, 0.3)' } },
            itemStyle: {
              borderColor: '#020617',
              borderWidth: 2,
              color: (params: { dataIndex: number }) => THEME_COLORS[params.dataIndex % THEME_COLORS.length],
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(14, 165, 233, 0.5)',
              },
            },
          },
        ],
      }
    }

    return base
  }, [type, data])

  return (
    <ReactECharts
      option={option}
      style={{ width: '100%', height: '100%' }}
      className={className}
      notMerge
      lazyUpdate
    />
  )
}
