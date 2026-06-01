'use client'

import ScreenAdapter from './components/ScreenAdapter'
import TechPanel from './components/TechPanel'
import BaseChart from './components/charts/BaseChart'
import FlipNumber from './components/FlipNumber'
import RealTimeClock from './components/RealTimeClock'
import ParticleBackground from './components/ParticleBackground'

const barData = {
  xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
  series: [420, 380, 890, 1200, 1050, 780],
}

const areaData = {
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  series: [820, 932, 901, 934, 1290, 1330, 1320, 1450, 1520, 1480, 1590, 1680],
}

const lineData1 = {
  xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [120, 132, 101, 134, 90, 230, 210],
}

const lineData2 = {
  xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [220, 182, 191, 234, 290, 330, 310],
}

const pieData = {
  series: [
    { name: '数据采集', value: 435 },
    { name: '边缘计算', value: 310 },
    { name: '云端存储', value: 234 },
    { name: 'AI推理', value: 135 },
    { name: '日志分析', value: 148 },
  ],
}

const top5Data = [
  { name: '华东节点', value: 98.2, color: '#0ea5e9' },
  { name: '华北节点', value: 95.7, color: '#06b6d4' },
  { name: '华南节点', value: 92.4, color: '#6366f1' },
  { name: '西南节点', value: 88.1, color: '#8b5cf6' },
  { name: '西北节点', value: 84.6, color: '#ec4899' },
]

const statusData = [
  { name: '主数据库集群', status: 'normal', text: '运行中' },
  { name: '缓存服务 Redis', status: 'normal', text: '运行中' },
  { name: '消息队列 Kafka', status: 'warning', text: '负载高' },
  { name: '对象存储 OSS', status: 'normal', text: '运行中' },
  { name: '网关服务', status: 'danger', text: '2个告警' },
]

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <ScreenAdapter>
        <div className="w-[1920px] h-[1080px] tech-bg relative z-10 overflow-hidden box-border flex flex-col">
        {/* Header */}
        <header className="h-[100px] relative flex items-center justify-between px-8 pt-2">
          {/* 左侧装饰 */}
          <div className="flex items-center gap-3 w-[360px]">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-[#0ea5e9]" />
            <div className="w-1.5 h-1.5 bg-[#0ea5e9] rotate-45" />
            <div className="w-2 h-2 bg-[#0ea5e9]/60 rotate-45" />
            <div className="text-[13px] text-[#64748b] tracking-widest">DATA CENTER</div>
          </div>

          {/* 中间标题 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-[44px] font-black tracking-[12px] text-white uppercase"
              style={{ textShadow: '0 0 20px rgba(14, 165, 233, 0.5), 0 0 40px rgba(14, 165, 233, 0.2)' }}>
              数字可视化大屏
            </h1>
            <div className="mt-1 flex items-center justify-center gap-2">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#0ea5e9]" />
              <div className="h-[2px] w-2 bg-[#0ea5e9]" />
              <div className="h-[1px] w-24 bg-gradient-to-r from-[#0ea5e9] via-[#06b6d4] to-[#0ea5e9]" />
              <div className="h-[2px] w-2 bg-[#0ea5e9]" />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#0ea5e9]" />
            </div>
          </div>

          {/* 右侧时间 */}
          <div className="w-[360px] flex justify-end">
            <RealTimeClock />
          </div>

          {/* 底部分隔线 */}
          <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent" />
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 pb-5 pt-4 flex gap-5 overflow-hidden">
          {/* Left Column */}
          <div className="w-[440px] flex flex-col gap-4">
            {/* Data Cards */}
            <div className="grid grid-cols-3 gap-3 h-[110px]">
              <div className="relative bg-[#0a1225]/80 border border-[#0ea5e9]/20 rounded-sm p-3 flex flex-col justify-center items-center overflow-hidden">
                <span className="corner-mark corner-mark-tl" /><span className="corner-mark corner-mark-tr" />
                <span className="corner-mark corner-mark-bl" /><span className="corner-mark corner-mark-br" />
                <div className="text-[12px] text-[#64748b] tracking-wider mb-1">今日总量</div>
                <FlipNumber value={128456} className="text-[26px] text-[#0ea5e9]" />
                <div className="text-[11px] text-[#10b981] mt-1">↑ 12.5%</div>
              </div>
              <div className="relative bg-[#0a1225]/80 border border-[#0ea5e9]/20 rounded-sm p-3 flex flex-col justify-center items-center overflow-hidden">
                <span className="corner-mark corner-mark-tl" /><span className="corner-mark corner-mark-tr" />
                <span className="corner-mark corner-mark-bl" /><span className="corner-mark corner-mark-br" />
                <div className="text-[12px] text-[#64748b] tracking-wider mb-1">在线设备</div>
                <FlipNumber value={3842} className="text-[26px] text-[#06b6d4]" />
                <div className="text-[11px] text-[#10b981] mt-1">↑ 5.2%</div>
              </div>
              <div className="relative bg-[#0a1225]/80 border border-[#f43f5e]/20 rounded-sm p-3 flex flex-col justify-center items-center overflow-hidden">
                <span className="corner-mark corner-mark-tl" style={{ borderColor: '#f43f5e' }} />
                <span className="corner-mark corner-mark-tr" style={{ borderColor: '#f43f5e' }} />
                <span className="corner-mark corner-mark-bl" style={{ borderColor: '#f43f5e' }} />
                <span className="corner-mark corner-mark-br" style={{ borderColor: '#f43f5e' }} />
                <div className="text-[12px] text-[#64748b] tracking-wider mb-1">告警数量</div>
                <FlipNumber value={12} className="text-[26px] text-[#f43f5e]" />
                <div className="text-[11px] text-[#f43f5e] mt-1">↑ 3个新增</div>
              </div>
            </div>

            <TechPanel title="业务量趋势" height="280px">
              <BaseChart type="bar" data={barData} />
            </TechPanel>

            <TechPanel title="TOP5 节点排行" height="240px">
              <div className="flex flex-col justify-between h-full py-1">
                {top5Data.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-digital text-[14px] w-5 text-[#64748b]">0{i + 1}</span>
                    <span className="text-[13px] text-[#94a3b8] w-[80px]">{item.name}</span>
                    <div className="flex-1 h-[6px] bg-[#0f172a] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${item.value}%`, backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                      />
                    </div>
                    <span className="font-digital text-[14px] w-[48px] text-right" style={{ color: item.color }}>
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </TechPanel>
          </div>

          {/* Center Column */}
          <div className="flex-1 flex flex-col gap-4">
            <TechPanel title="核心指标监控" height="520px" showScan>
              <BaseChart type="area" data={areaData} />
            </TechPanel>

            <TechPanel title="双通道流量对比" height="260px">
              <div className="flex gap-4 h-full">
                <div className="flex-1">
                  <div className="text-[12px] text-[#0ea5e9] mb-1 text-center tracking-wider">通道 A</div>
                  <BaseChart type="line" data={lineData1} />
                </div>
                <div className="w-[1px] bg-gradient-to-b from-transparent via-[#0ea5e9]/20 to-transparent" />
                <div className="flex-1">
                  <div className="text-[12px] text-[#8b5cf6] mb-1 text-center tracking-wider">通道 B</div>
                  <BaseChart type="line" data={lineData2} />
                </div>
              </div>
            </TechPanel>
          </div>

          {/* Right Column */}
          <div className="w-[440px] flex flex-col gap-4">
            <TechPanel title="资源类型占比" height="280px">
              <BaseChart type="pie" data={pieData} />
            </TechPanel>

            <TechPanel title="实时流量趋势" height="280px">
              <BaseChart type="area" data={{
                xAxis: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30'],
                series: [320, 332, 301, 334, 390, 330, 410],
              }} />
            </TechPanel>

            <TechPanel title="系统状态监控" height="220px">
              <div className="flex flex-col justify-between h-full py-1">
                {statusData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[#0ea5e9]/10 last:border-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full pulse-dot"
                        style={{
                          backgroundColor:
                            item.status === 'normal' ? '#10b981' : item.status === 'warning' ? '#f59e0b' : '#f43f5e',
                          color:
                            item.status === 'normal' ? '#10b981' : item.status === 'warning' ? '#f59e0b' : '#f43f5e',
                        }}
                      />
                      <span className="text-[13px] text-[#94a3b8]">{item.name}</span>
                    </div>
                    <span
                      className="text-[12px] font-digital px-2 py-0.5 rounded-sm"
                      style={{
                        color: item.status === 'normal' ? '#10b981' : item.status === 'warning' ? '#f59e0b' : '#f43f5e',
                        backgroundColor:
                          item.status === 'normal' ? 'rgba(16, 185, 129, 0.1)' : item.status === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </TechPanel>
          </div>
        </main>
      </div>
      </ScreenAdapter>
    </>
  )
}
