import React from 'react'

const Loading = ({head, prag}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 p-4 transition-colors duration-300">
      <div className="max-w-md w-full mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.3)] border border-slate-100 dark:border-slate-700/60 p-10 flex flex-col gap-4">
        <div className="text-teal-600 dark:text-teal-400 font-labrada text-4xl font-bold text-center mb-2">ONSY</div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
          {head}
        </h2>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg">{prag}</p>
          <svg className="h-6 w-6 animate-spin text-teal-600 dark:text-teal-400" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2" />
            <path d="M2 12a10 10 0 0110-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Loading