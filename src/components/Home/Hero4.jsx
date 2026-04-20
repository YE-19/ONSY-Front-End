import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: '', value: 480 },
  { name: '', value: 250 },
  { name: 'Feb', value: 320 },
  { name: '', value: 450 },
  { name: 'Mar', value: 430 },
  { name: '', value: 500 },
  { name: '', value: 650 },
  { name: 'Apr', value: 630 },
  { name: '', value: 720 },
  { name: '', value: 580 },
  { name: 'May', value: 620 },
  { name: '', value: 650 },
  { name: '', value: 500 },
  { name: 'Jun', value: 550 },
  { name: '', value: 600 },
];

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  if (payload.name === '') return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="#062d2a" />
      <circle cx={cx} cy={cy} r={2} fill="#000" />
    </g>
  );
};

const data01 = [
  { name: 'LightBlue', value: 100, fill: '#a5d8ff' },
  { name: 'Green', value: 150, fill: '#69db7c' },
  { name: 'Blue', value: 400, fill: '#82b1ff' },
  { name: 'Dark', value: 700, fill: '#1a1a1a' },
];

const data02 = [
  { name: 'Greenish', value: 500, fill: '#76938a' },
  { name: 'white', value: 150, fill: '#A0BCE8' },
  { name: 'Green', value: 200, fill: '#69db7c' },
  { name: 'LightBlue', value: 100, fill: '#a5d8ff' },
];

const Hero4 = () => {
  return (
    <section className='w-full h-auto lg:h-180 bg-[#FEFDFE] pb-16 lg:pb-0'>
      
      <div className='w-full lg:w-145.75 m-auto text-center mt-10 lg:mt-14 mb-10 lg:mb-30 px-6'>
        <h3 className='text-black font-semibold text-3xl lg:text-5xl pb-2'>
            Understand Your Mind <br className='hidden lg:block' /> With <span className='text-[#618475]'>Clarity</span> 
        </h3>
        <p className='text-[#5F5F5F] text-sm lg:text-base'>Your emotional data, beautifully visualized — weekly trends, mood cycles, stress peaks, and AI-generated insights all in one place</p>
      </div>

      <div className='flex flex-col lg:flex-row lg:justify-between items-center gap-12 lg:gap-0 mx-6 lg:mx-40'>
        
        {/* Left Side: Bars and Pies */}
        <div className='w-full lg:w-134 flex flex-col gap-8'>
          
          <div className='flex justify-around w-full lg:w-134 h-22.5 '>
            {[
                { day: 'Sunday', h: 'h-8', color: 'bg-[#A0BCE8]' },
                { day: 'Monday', h: 'h-14', color: 'bg-[#6BE6D3]' },
                { day: 'Tuesday', h: 'h-10', color: 'bg-[#000000]' },
                { day: 'Wednesday', h: 'h-16', color: 'bg-[#7DBBFF]' },
                { day: 'Thursday', h: 'h-6', color: 'bg-[#B899EB]' },
                { day: 'Friday', h: 'h-12', color: 'bg-[#71DD8C]' },
            ].map((item, index) => (
                <div key={index} className='flex flex-col gap-2 items-center justify-end'>
                    <span className={`w-5 lg:w-7 rounded-lg ${item.h} ${item.color}`}></span>
                    <p className='text-[#00000066] text-[10px] lg:text-xs'>{item.day}</p>
                </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-around items-center gap-8 lg:gap-0">
            <div className="w-48 lg:w-52 aspect-square">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={data01}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="100%"
                    paddingAngle={2}
                    cornerRadius={2} 
                    dataKey="value"
                    stroke="none"  
                    >
                    {data01.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    </Pie>
                </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="w-48 lg:w-52 aspect-square">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={data02}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="100%"
                    paddingAngle={2}
                    cornerRadius={2} 
                    dataKey="value"
                    stroke="none"  
                    >
                    {data02.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    </Pie>
                </PieChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Side: Area Chart */}
        <div className="w-full lg:w-146 h-72 lg:h-81 max-w-2xl p-4 bg-[#F9F9FA] border border-linear-to-br from-[#020103] via-onsy-primary to-onsy-secondary rounded-xl shadow-sm flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-[#5a7d75] ml-4">User</h2>
            <div className="h-52 lg:h-63 w-full lg:w-138">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 20, left: -40, bottom: 0 }}>
                    <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5a7d75" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#5a7d75" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <CartesianGrid 
                    vertical={true} 
                    horizontal={false} 
                    stroke="#f5f5f5" 
                    />
                    <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#1a1a1a', fontSize: 11, fontWeight: 500 }}
                    interval={0} 
                    padding={{ left: 10, right: 10 }}
                    />
                    <YAxis hide={true} domain={[0, 800]} />
                    <Tooltip content={() => null} cursor={{ stroke: '#f0f0f0' }} />
                    <Area
                    type="linear" 
                    dataKey="value"
                    stroke="#4a6b64"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    dot={<CustomDot />}
                    activeDot={{ r: 8, fill: '#062d2a' }}
                    />
                </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Hero4