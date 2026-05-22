import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllMoods } from '../services/moodService';
import { getToken } from '../utils/cookieUtils';

const INITIAL_DELAY_MS = 20_000;   // 20 seconds after page load
const RECHECK_MS = 15 * 60 * 1000; // 15 minutes
const AUTO_DISMISS_MS = 30_000;   // 30 seconds auto-hide
const MIN_HOURS_GAP = 12;       // hours between mood 1 and mood 2

/* ─── helpers ─────────────────────────────────────────────────── */
function isToday(dateStr) {
  const d = new Date(dateStr);
  const n = new Date();
  return d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate();
}

function hoursSince(dateStr) {
  return (Date.now() - new Date(dateStr).getTime()) / 3_600_000;
}

/* ─── main component ───────────────────────────────────────────── */
export default function MoodReminderNotification() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const intervalRef = useRef(null);
  const dismissedThisCycle = useRef(false);

  /* decide whether to show */
  const decide = useCallback(async () => {
    if (!getToken()) return;   // not logged in
    if (dismissedThisCycle.current) return; // user dismissed → wait for next cycle

    let shouldShow = true; // default: show if we can't verify

    try {
      const raw = await getAllMoods();
      const moods = Array.isArray(raw) ? raw
        : Array.isArray(raw?.moods) ? raw.moods
          : [];

      const todayMoods = moods.filter(m => isToday(m.createdAt || m.date));

      if (todayMoods.length === 0) {
        // No mood today — check 12-hour gap from last EVER entry
        const sorted = [...moods].sort((a, b) =>
          new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        const last = sorted[0];
        if (last && hoursSince(last.createdAt || last.date) < MIN_HOURS_GAP) {
          shouldShow = false; // too soon after last mood
        }
      } else if (todayMoods.length === 1) {
        // 1 mood logged today — only remind again after 12 h
        const entry = todayMoods[0];
        shouldShow = hoursSince(entry.createdAt || entry.date) >= MIN_HOURS_GAP;
      } else {
        // 2+ moods today → never nag
        shouldShow = false;
      }
    } catch (err) {
      // API unavailable → default to showing the reminder
      console.warn("Failed to fetch moods for notification:", err);
      shouldShow = true;
    }

    console.log("MoodReminderNotification decide() result -> shouldShow:", shouldShow);
    setShow(shouldShow);
  }, []);

  useEffect(() => {
    // Initial: wait 20 s then decide
    const init = setTimeout(decide, INITIAL_DELAY_MS);

    // Repeat every 15 min
    intervalRef.current = setInterval(() => {
      dismissedThisCycle.current = false; // allow re-show each cycle
      decide();
    }, RECHECK_MS);

    return () => {
      clearTimeout(init);
      clearInterval(intervalRef.current);
    };
  }, [decide]);

  const dismiss = () => {
    setShow(false);
    dismissedThisCycle.current = true;
  };

  const goToMood = () => {
    dismiss();
    navigate('/Mood');
  };

  /* ── render ── */
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="mood-toast"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="fixed bottom-6 right-5 z-[9999] w-80 max-w-[calc(100vw-2.5rem)]"
        >
          <div className="relative rounded-2xl overflow-hidden
                          bg-white dark:bg-slate-800
                          border border-slate-200 dark:border-slate-700
                          shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">

            {/* top accent */}
            <div className="h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500" />

            <div className="p-4 flex flex-col gap-3">

              {/* header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {/* pulse dot */}
                  <span className="relative flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
                    <span className="relative flex h-3 w-3 rounded-full bg-teal-500" />
                  </span>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Track your mood 😊
                  </p>
                </div>

                <button
                  onClick={dismiss}
                  aria-label="Dismiss"
                  className="flex-shrink-0 text-slate-400 hover:text-slate-600
                             dark:hover:text-slate-200 hover:bg-slate-100
                             dark:hover:bg-slate-700 rounded-full p-1
                             transition-all duration-150"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* body */}
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                You haven't logged your mood today! Take a second to track how you're feeling right now.
              </p>

              {/* emoji strip */}
              <div className="flex justify-between text-xl px-1">
                {['😔', '😕', '😐', '🙂', '😄', '😊', '🤩', '😌', '💪', '🌟'].map((e, i) => (
                  <span key={i} className="opacity-70 hover:opacity-100 hover:scale-125
                                           transition-all duration-150 cursor-default select-none">
                    {e}
                  </span>
                ))}
              </div>

              {/* actions */}
              <div className="flex gap-2 mt-1">
                <button
                  onClick={goToMood}
                  className="flex-1 h-9 rounded-xl text-sm font-semibold text-white
                             bg-gradient-to-r from-[#036464] to-teal-500
                             dark:from-teal-700 dark:to-teal-500
                             shadow-sm hover:shadow-md hover:-translate-y-0.5
                             active:translate-y-0 transition-all duration-200"
                >
                  Log Mood →
                </button>
                <button
                  onClick={dismiss}
                  className="h-9 px-4 rounded-xl text-sm font-medium
                             text-slate-500 dark:text-slate-400
                             border border-slate-200 dark:border-slate-600
                             hover:bg-slate-50 dark:hover:bg-slate-700
                             transition-all duration-200"
                >
                  Later
                </button>
              </div>
            </div>

            {/* countdown bar */}
            <CountdownBar ms={AUTO_DISMISS_MS} onDone={dismiss} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── countdown bar ────────────────────────────────────────────── */
function CountdownBar({ ms, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, ms);
    return () => clearTimeout(t);
  }, [ms, onDone]);

  return (
    <div className="h-1 bg-slate-100 dark:bg-slate-700">
      <motion.div
        className="h-full bg-teal-400 dark:bg-teal-500 origin-left"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: ms / 1000, ease: 'linear' }}
      />
    </div>
  );
}
