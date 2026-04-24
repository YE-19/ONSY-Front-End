import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts'

// ── SVG Circular Gauge — scales via CSS wrapper ───────────────────────────────
const CircularGauge = ({ value = 75 }) => {
  const size = 230
  const cx = size / 2
  const cy = size / 2
  const strokeWidth = 30
  const radius = (size - strokeWidth) / 2 - 6
  const circumference = 2 * Math.PI * radius
  const filled = (value / 100) * circumference
  const gap = circumference - filled

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="gaugeGrad" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5dd6e4" />
          <stop offset="55%"  stopColor="#1b8799" />
          <stop offset="100%" stopColor="#0b3645" />
        </linearGradient>
        <radialGradient id="innerGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%"   stopColor="#e8f5f7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#c2dde1" stopOpacity="0.3" />
        </radialGradient>
        <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer border ring */}
      <circle cx={cx} cy={cy} r={radius + strokeWidth / 2 + 2}
        fill="none" stroke="rgba(97,132,117,0.18)" strokeWidth={1.5} />

      {/* Background track */}
      <circle cx={cx} cy={cy} r={radius}
        fill="none" stroke="rgba(97,132,117,0.22)" strokeWidth={strokeWidth} />

      {/* Filled progress arc */}
      <circle cx={cx} cy={cy} r={radius}
        fill="none"
        stroke="url(#gaugeGrad)"
        strokeWidth={strokeWidth}
        strokeDasharray={`${filled} ${gap}`}
        strokeLinecap="butt"
        transform={`rotate(-90, ${cx}, ${cy})`}
        filter="url(#arcGlow)"
      />

      {/* Inner circle depth */}
      <circle cx={cx} cy={cy} r={radius - strokeWidth / 2 - 2}
        fill="url(#innerGrad)" />
      <circle cx={cx} cy={cy} r={radius - strokeWidth / 2 - 2}
        fill="none" stroke="rgba(97,132,117,0.2)" strokeWidth={1} />

      {/* Center text */}
      <text x={cx} y={cy + 11} textAnchor="middle"
        fill="#2d7d8a" fontSize={32} fontWeight={800}
        fontFamily="inherit" letterSpacing="-1">
        {value}%
      </text>
    </svg>
  )
}

// ── Line Chart data & helpers ─────────────────────────────────────────────────
const moodData = [
  { week: 1, mood: 2   },
  { week: 2, mood: 2.4 },
  { week: 3, mood: 3.8 },
  { week: 4, mood: 2.9 },
  { week: 5, mood: 1.5 },
  { week: 6, mood: 2.2 },
  { week: 7, mood: 2.1 },
  { week: 8, mood: 1.3 },
]

const moodLabels = { 1: 'Sad', 2: 'Natural', 3: 'Happy', 4: 'Excited' }

const MoodTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const val  = payload[0].value
  const name = val >= 3.5 ? 'Excited' : val >= 2.8 ? 'Happy' : val >= 1.8 ? 'Natural' : 'Sad'
  return (
    <div style={{
      background: '#0e6b78', color: '#fff', fontSize: 11, fontWeight: 600,
      padding: '5px 10px', borderRadius: 7, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    }}>
      Week {label}: <span style={{ color: '#a8e6ef' }}>{name}</span>
    </div>
  )
}

const BestDayLabel = ({ viewBox }) => {
  if (!viewBox) return null
  const { x, y } = viewBox
  const w = 108, h = 26
  return (
    <g>
      <rect x={x - w / 2} y={y - h - 12} width={w} height={h} rx={7} fill="#0e6b78" />
      <text x={x} y={y - h - 12 + h / 2 + 4}
        textAnchor="middle" fill="white" fontSize={11} fontWeight={700}>
        Best day : 12/23
      </text>
    </g>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = () => {
  return (
    <section className="
      py-24 px-5
      sm:py-24 sm:px-10
      lg:py-24 lg:px-30
      flex flex-col lg:flex-row
      lg:justify-between
      gap-10 lg:gap-0
    ">

      {/* ── Left Column ── */}
      <div className="flex flex-col gap-5 w-full lg:w-157">

        {/* Line Chart Card */}
        <div className="
          w-full lg:w-157
          h-64 sm:h-80 lg:h-101
          bg-[#147E8F3D] rounded-4xl
          shadow-[0_0_40.6px_0_rgba(0,0,0,0.2)]
          flex items-center justify-center
          px-2 py-4
        ">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData} margin={{ top: 46, right: 16, left: 4, bottom: 24 }}>
              <CartesianGrid vertical horizontal={false}
                stroke="rgba(255,255,255,0.6)" strokeWidth={1} />

              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={{ stroke: 'rgba(20,126,143,0.35)' }}
                tick={{ fill: '#3a7c89', fontSize: 10, fontWeight: 500 }}
                label={{
                  value: 'Weeks', position: 'insideBottom', offset: -12,
                  style: { fill: '#147E8F', fontSize: 12, fontWeight: 700 },
                }}
              />

              <YAxis
                domain={[1, 4]} ticks={[1, 2, 3, 4]}
                tickLine={false} axisLine={false} width={54}
                tickFormatter={(v) => moodLabels[v] ?? ''}
                tick={{ fill: '#3a7c89', fontSize: 10, fontWeight: 500 }}
                label={{
                  value: 'Moods', angle: -90, position: 'insideLeft', offset: 14,
                  style: { fill: '#147E8F', fontSize: 12, fontWeight: 700 },
                }}
              />

              <Tooltip content={<MoodTooltip />}
                cursor={{ stroke: 'rgba(20,126,143,0.3)', strokeWidth: 1 }} />

              <Line type="monotone" dataKey="mood"
                stroke="#0e6b78" strokeWidth={2.5} dot={false}
                activeDot={{ r: 5, fill: '#0e6b78', stroke: 'white', strokeWidth: 2 }}
              />

              <ReferenceDot x={3} y={3.8} r={5}
                fill="#0e6b78" stroke="white" strokeWidth={2}
                label={<BestDayLabel />}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Mood Text */}
        <div className="w-full lg:w-157 flex flex-col gap-4">
          <h2 className="font-bold text-xl sm:text-2xl text-[#111111]">
            Weekly Mood Analysis
          </h2>
          <ul className="flex flex-col gap-5 lg:gap-8 font-semibold list-disc pl-5 text-[#5F5F5F]">
            <li>
              Week 1 (<span className="text-[#147E8F]">The Baseline</span>): Your mood started
              at a stable <span className="text-[#147E8F]">"Natural"</span> level. It remained
              steady throughout the week with a very slight upward trend toward the end.
            </li>
            <li>
              Week 2 (<span className="text-[#147E8F]">The Climb</span>): There was a noticeable
              improvement in your mood. You moved from the "Natural" state steadily upward,
              approaching the "Happy" zone.
            </li>
            <li>
              Week 3 (<span className="text-[#147E8F]">The Peak</span>): This was clearly your{' '}
              <span className="text-[#147E8F] font-bold">best week</span>. The mood surged past
              "Happy" to reach the "Excited" level. The chart specifically highlights 12/23 as
              the "Best Day" during this period.
            </li>
          </ul>
        </div>
      </div>

      {/* ── Right Column ── */}
      <div className="flex flex-col gap-5 w-full lg:w-157">

        {/* Gauge Card */}
        <div className="
          w-full lg:w-157
          h-64 sm:h-80 lg:h-101
          bg-[#61847547] rounded-4xl
          shadow-[0_0_40.6px_0_rgba(0,0,0,0.2)]
          flex flex-col items-center justify-center gap-3
        ">
          <p className="text-[#2d5c5c] font-semibold text-base tracking-wide">
            Overall Mood
          </p>

          {/* Gauge scales: 160px mobile → 200px tablet → 230px desktop */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-[230px] lg:h-[230px]">
            <CircularGauge value={75} />
          </div>
        </div>

        {/* Overall Mood Text */}
        <div className="w-full lg:w-157 flex flex-col gap-4">
          <h2 className="font-bold text-xl sm:text-2xl text-[#111111]">
            Overall Mood Summary
          </h2>
          <ul className="flex flex-col gap-5 lg:gap-8 font-semibold list-disc pl-5 text-[#5F5F5F]">
            <li>
              The chart shows that your{' '}
              <span className="text-[#147E8F]">Overall Mood</span> is at{' '}
              <span className="text-[#147E8F]">75%</span>.
            </li>
            <li>
              In the context of the previous weekly breakdown, this indicates a very positive
              aggregate score. While the line graph showed some significant dips (especially
              around Week 5), staying at a three-quarters satisfaction level suggests that your
              "highs" (like the excitement in Week 3) and your "natural" days carry more weight
              than the temporary lows.
            </li>
            <li>
              An overall rating of <span className="text-[#147E8F]">75%</span> typically reflects
              a state of being <span className="text-[#147E8F]">"Happy"</span> to{' '}
              <span className="text-[#4a9e6b]">"Very Good"</span> on a standard emotional scale.
            </li>
          </ul>
        </div>
      </div>

    </section>
  )
}

export default Dashboard