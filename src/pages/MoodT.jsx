import { useState, useRef, useCallback } from "react";
import arrowl from "../assets/arrowl.png"
import arrowr from "../assets/arrowr.png"
import done from "../assets/done.png"
import hdone from "../assets/hdone.png"
import ndone from "../assets/ndone.png"

const MOODS = [
  { score: 0, emoji: "😩", label: "Terrible", sub: "Extremely distressed", color: "#E24B4A" },
  { score: 1, emoji: "😞", label: "Very bad", sub: "Feeling very down", color: "#D85A30" },
  { score: 2, emoji: "😟", label: "Bad", sub: "Not doing well", color: "#EF9F27" },
  { score: 3, emoji: "😕", label: "Poor", sub: "Struggling a bit", color: "#BA7517" },
  { score: 4, emoji: "😐", label: "Low", sub: "Below average day", color: "#888780" },
  { score: 5, emoji: "🙂", label: "Okay", sub: "Neither good nor bad", color: "#5DCAA5" },
  { score: 6, emoji: "😊", label: "Good", sub: "Feeling decent", color: "#1D9E75" },
  { score: 7, emoji: "😄", label: "Pretty good", sub: "Having a good day", color: "#1D9E75" },
  { score: 8, emoji: "😁", label: "Great", sub: "Feeling really well", color: "#0F6E56" },
  { score: 9, emoji: "😃", label: "Excellent", sub: "Almost at my best", color: "#085041" },
  { score: 10, emoji: "🤩", label: "Amazing", sub: "Feeling absolutely great", color: "#085041" },
];

export default function MoodTracker({ onClose, onSubmit }) {
  const [value, setValue] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [showMoodForm, setShowMoodForm] = useState(false);
  const sliderRef = useRef(null);

  const mood = MOODS[value];
  const pct = (value / 10) * 100;

  const handleChange = useCallback((e) => {
    setValue(Number(e.target.value));
  }, []);

  const handleSubmit = useCallback(async () => {
    const payload = {
      mood_label: mood.label,
      score: mood.score,
      note: mood.sub,
    };

    try {
      await fetch("/api/mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
      setTimeout(() => {
        onSubmit?.(payload);
        onClose?.();
        setShowMoodForm(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to log mood:", err);
    }
  }, [mood, onClose, onSubmit]);


  return (
    <>
    {/* Main */}
    <section className="bg-gradient-to-br from-[#147E8F] via-teal-700 to-cyan-800 dark:from-teal-950 dark:via-slate-900 dark:to-slate-950 h-screen relative overflow-hidden flex flex-col items-center content-center justify-center p-4 md:p-0 transition-colors duration-300">
      {/* Decorative ambient blobs — replace background images */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-400/15 blur-3xl hidden md:block" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-teal-300/15 blur-3xl hidden md:block" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #99f6e4 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>

      <div className="flex flex-col items-center gap-6 md:gap-10 w-full z-10">
        <h2 className="text-6xl md:text-9xl text-white font-labrada font-semibold drop-shadow-lg">Mood</h2>
        <p className="font-semibold text-xl md:text-[32px] text-center px-2 text-white/90">
          Here you can submit, edit or delete your mood.
        </p>
        
        <div className="w-[95%] max-w-3xl md:w-[800px] h-auto min-h-62.5 md:h-65 rounded-3xl bg-white/15 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 flex flex-col px-4 md:px-6 py-6 md:py-3 justify-around gap-6 md:gap-0 shadow-xl">
          <div className="flex gap-5 items-center justify-center">
            <img src={arrowl} alt="" className="w-3.5 h-6 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
            <p className="text-white text-3xl md:text-5xl font-semibold">April</p>
            <img src={arrowr} alt="" className="w-3.5 h-6 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
          </div>
          
          {/* API */}
          <div 
            className="w-full md:w-[600px] min-h-15 md:h-23 bg-white dark:bg-slate-800 mx-auto text-center flex items-center justify-center rounded-2xl p-3 md:p-0 cursor-pointer text-sm md:text-base font-medium shadow-sm hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 text-slate-700 dark:text-slate-300" 
            onClick={() => setShowMoodForm(true)}
          >
            IT WILL BE DONE WITH THE API XD
          </div>
        
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mt-2 md:mt-0">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <p className="flex items-center gap-1.5 text-xs md:text-sm text-white/90">
                <img src={done} alt="" className="w-3 h-2.5" />Done
              </p>
              <p className="flex items-center gap-1.5 text-xs md:text-sm text-white/90">
                <img src={hdone} alt="" className="w-3 h-2.5" />Half day done
              </p>
              <p className="flex items-center gap-1.5 text-xs md:text-sm text-white/90">
                <img src={ndone} alt="" className="w-3 h-3" />Not Done Yet
              </p>
            </div>
            <p className="text-sm md:text-base text-white/80">Today's date : 4/22/2026</p>
          </div>
        </div>
      </div>
    </section>

    {/* Modal */}
    {showMoodForm && (
      <div 
        className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setShowMoodForm(false)}
      >
        <div 
          className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto relative shadow-2xl border border-slate-100 dark:border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={() => setShowMoodForm(false)}
            className="absolute top-4 right-4 md:top-5 md:right-5 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full p-1.5 cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <h2 className="text-xl md:text-[22px] font-bold text-slate-800 dark:text-slate-100 mb-6 leading-tight pr-8">
            What is your mood for today?
          </h2>

          <div className="flex flex-col items-center gap-1.5 mb-8">
            {submitted ? (
              <>
                <div className="w-20 h-20 md:w-22 md:h-22 rounded-full bg-[#E1F5EE] dark:bg-teal-900/40 border-2 border-[#9FE1CB] dark:border-teal-600 flex items-center justify-center text-[36px] text-[#1D9E75] dark:text-teal-400 font-bold mb-1">
                  ✓
                </div>
                <p className="text-xl md:text-[22px] font-bold" style={{ color: mood.color }}>Mood logged!</p>
                <p className="text-[13px] text-slate-400 dark:text-slate-500">Have a great day</p>
              </>
            ) : (
              <>
                <div
                  className="w-20 h-20 md:w-22 md:h-22 rounded-full flex items-center justify-center mb-1 transition-all duration-300"
                  style={{ background: mood.color + "18", border: `2px solid ${mood.color}33` }}
                >
                  <span className="text-4xl md:text-[48px] leading-none select-none">{mood.emoji}</span>
                </div>
                <p className="text-xl md:text-[22px] font-bold transition-colors duration-200" style={{ color: mood.color }}>
                  {mood.label}
                </p>
                <p className="text-xs md:text-[13px] transition-colors duration-200" style={{ color: mood.color + "99" }}>
                  {mood.sub}
                </p>
              </>
            )}
          </div>

          {/* Slider Section */}
          <div className="mb-7">
            <div className="flex justify-between mb-2 px-0.5">
              {MOODS.map((m) => (
                <span
                  key={m.score}
                  className="w-4 md:w-5 text-center inline-block leading-none select-none transition-all duration-200"
                  style={{
                    color: m.score === value ? mood.color : "#ccc",
                    fontWeight: m.score === value ? 700 : 400,
                    fontSize: m.score === value ? "14px" : "11px",
                    transform: m.score === value ? "scale(1.2)" : "scale(1)",
                  }}
                >
                  {m.score}
                </span>
              ))}
            </div>

            <div className="relative h-12 flex items-center">
              <div className="absolute inset-x-0 h-2.5 rounded-full bg-slate-100 dark:bg-slate-700" />
              <div
                className="absolute left-0 h-2.5 rounded-full transition-[width] duration-75"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg, #E24B4A 0%, #EF9F27 30%, #1D9E75 70%, #085041 100%)" }}
              />
              <input
                ref={sliderRef}
                type="range"
                min={0}
                max={10}
                step={1}
                value={value}
                onChange={handleChange}
                className="absolute inset-0 w-full opacity-0 h-12 cursor-pointer z-20"
                aria-label="Mood score"
              />
              <div
                className="absolute w-6 h-6 md:w-7 md:h-7 rounded-full bg-white dark:bg-slate-200 border-[3px] shadow-md flex items-center justify-center z-10 transition-[left] duration-75 pointer-events-none"
                style={{ left: `calc(${pct}% - ${pct === 0 ? 0 : pct === 100 ? 28 : 14}px)`, borderColor: mood.color }}
              >
                <span className="text-[9px] md:text-[10px] font-bold" style={{ color: mood.color }}>
                  {value}
                </span>
              </div>
            </div>

            <div className="flex justify-between mt-2 px-0.5">
              <span className="text-[10px] md:text-[11px] text-slate-400 dark:text-slate-500 select-none text-left">😩 Worst</span>
              <span className="text-[10px] md:text-[11px] text-slate-400 dark:text-slate-500 select-none text-center">😐 Neutral</span>
              <span className="text-[10px] md:text-[11px] text-slate-400 dark:text-slate-500 select-none text-right">🤩 Best</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitted}
            className="w-full py-3.5 md:py-4 rounded-2xl text-white text-sm md:text-base font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
            style={{ background: submitted ? "#ccc" : mood.color, cursor: submitted ? "default" : "pointer" }}
          >
            {!submitted && (
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#fff" stroke="none" />
              </svg>
            )}
            {submitted ? "Sent!" : "Send"}
          </button>
        </div>
      </div>
    )}
  </>
  );
}