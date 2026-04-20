import { useState, useRef, useCallback } from "react";

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
      }, 1400);
    } catch (err) {
      console.error("Failed to log mood:", err);
    }
  }, [mood, onClose, onSubmit]);

  return (
    <div className="relative flex items-center justify-center p-4 z-50 my-40">
      <div className="bg-white rounded-[24px] p-8 w-full max-w-lg relative shadow-2xl border border-gray-100">

        <h2 className="text-[22px] font-bold text-gray-900 mb-6 leading-tight">
          What is your mood for today?
        </h2>

        {/* Mood Display Section */}
        <div className="flex flex-col items-center gap-1.5 mb-8">
          {submitted ? (
            <>
              <div className="w-[88px] h-[88px] rounded-full bg-[#E1F5EE] border-2 border-[#9FE1CB] flex items-center justify-center text-[36px] text-[#1D9E75] font-bold mb-1">
                ✓
              </div>
              <p className="text-[22px] font-bold" style={{ color: mood.color }}>Mood logged!</p>
              <p className="text-[13px] text-gray-400">Have a great day</p>
            </>
          ) : (
            <>
              <div
                className="w-[88px] h-[88px] rounded-full flex items-center justify-center mb-1 transition-all duration-300"
                style={{
                  background: mood.color + "18",
                  border: `2px solid ${mood.color}33`,
                }}
              >
                <span className="text-[48px] leading-none select-none">{mood.emoji}</span>
              </div>
              <p className="text-[22px] font-bold transition-colors duration-200" style={{ color: mood.color }}>
                {mood.label}
              </p>
              <p className="text-[13px] transition-colors duration-200" style={{ color: mood.color + "99" }}>
                {mood.sub}
              </p>
            </>
          )}
        </div>

        {/* Slider Section */}
        <div className="mb-7">
          {/* Number Ticks */}
          <div className="flex justify-between mb-2 px-0.5">
            {MOODS.map((m) => (
              <span
                key={m.score}
                className="w-5 text-center inline-block leading-none select-none transition-all duration-200"
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

          {/* Track + Thumb */}
          <div className="relative h-12 flex items-center">
            <div className="absolute inset-x-0 h-2.5 rounded-full bg-gray-100" />
            <div
              className="absolute left-0 h-2.5 rounded-full transition-[width] duration-75"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg, #E24B4A 0%, #EF9F27 30%, #1D9E75 70%, #085041 100%)",
              }}
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
              className="absolute w-7 h-7 rounded-full bg-white border-[3px] shadow-md flex items-center justify-center z-10 transition-[left] duration-75 pointer-events-none"
              style={{
                left: `calc(${pct}% - ${pct === 0 ? 0 : pct === 100 ? 28 : 14}px)`,
                borderColor: mood.color,
              }}
            >
              <span className="text-[10px] font-bold" style={{ color: mood.color }}>
                {value}
              </span>
            </div>
          </div>

          {/* Zone Labels */}
          <div className="flex justify-between mt-2 px-0.5">
            <span className="text-[11px] text-gray-300 select-none text-left">😩 Worst</span>
            <span className="text-[11px] text-gray-300 select-none text-center">😐 Neutral</span>
            <span className="text-[11px] text-gray-300 select-none text-right">🤩 Best</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={submitted}
          className="w-full py-4 rounded-[14px] text-white text-base font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:bg-gray-300"
          style={{
            background: submitted ? "#ccc" : mood.color,
            cursor: submitted ? "default" : "pointer",
          }}
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
  );
}