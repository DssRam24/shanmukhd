import { useState, FormEvent } from 'react';
import { addSubmission } from '../services/firebase';

interface CardFormProps {
  typeKey: string;
  placeholder: string;
  isTextArea?: boolean;
  ctaText: string;
  successMsg: string;
}

function InterestCardForm({ typeKey, placeholder, isTextArea = false, ctaText, successMsg }: CardFormProps) {
  const [value, setValue] = useState('');
  const [who, setWho] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    setIsSending(true);
    try {
      await addSubmission(typeKey, value.trim(), who.trim());
      setSent(true);
      setValue('');
      setWho('');
      setTimeout(() => setSent(false), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-[#FF6B1A]/10 flex flex-col gap-2">
      {isTextArea ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="w-full bg-[#FFFAF2] border-2 border-[#FF6B1A]/20 rounded-xl p-2.5 font-mono text-[0.62rem] text-neutral-800 outline-none focus:border-[#FF6B1A] transition-colors resize-none"
          required
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#FFFAF2] border-2 border-[#FF6B1A]/20 rounded-xl p-2.5 font-mono text-[0.62rem] text-neutral-800 outline-none focus:border-[#FF6B1A] transition-colors"
          required
        />
      )}
      <input
        type="text"
        value={who}
        onChange={(e) => setWho(e.target.value)}
        placeholder="Your name (optional)"
        className="w-full bg-[#FFFAF2] border-2 border-[#FF6B1A]/20 rounded-xl px-2.5 py-1.5 font-mono text-[0.58rem] text-neutral-800 outline-none focus:border-[#FF6B1A] transition-colors"
      />
      <button
        type="submit"
        disabled={isSending}
        className="px-3.5 py-1.5 bg-[#FF6B1A] text-white border-none rounded-lg font-mono text-[0.58rem] self-start transition-opacity hover:opacity-90 disabled:opacity-50 font-bold shadow-[2px_2px_0_#e55c10]"
      >
        {isSending ? 'Sending...' : ctaText}
      </button>
      {sent && (
        <div className="font-mono text-[0.55rem] text-green-500 mt-1 animate-pulse">
          {successMsg}
        </div>
      )}
    </form>
  );
}

export default function About() {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const toggleForm = (formId: string) => {
    setActiveForm(activeForm === formId ? null : formId);
  };

  return (
    <section id="about" className="py-24 px-[5%] bg-[#FFFAF2] relative text-center">
      <div className="font-mono text-[0.6rem] text-[#FF6B1A] tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-4 max-w-[600px] mx-auto">
        <span className="h-[1px] bg-[#FF6B1A]/30 flex-1" />
        001 — About Me
        <span className="h-[1px] bg-[#FF6B1A]/30 flex-1" />
      </div>

      <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight mb-8 text-neutral-900">
        I build things that <em className="italic text-[#FF6B1A]">look good</em> <br />
        and work better.
      </h2>

      {/* Tech Skill Badges */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950 text-[#FF6B1A] border border-[#FF6B1A]/30 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(255,107,26,0.2)] transition-all">
          React ⚛️
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950 text-[#FF6B1A] border border-[#FF6B1A]/30 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(255,107,26,0.2)] transition-all">
          Firebase 🔥
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950 text-[#FF6B1A] border border-[#FF6B1A]/30 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(255,107,26,0.2)] transition-all">
          UI/UX 🎨
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950 text-[#FF6B1A] border border-[#FF6B1A]/30 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(255,107,26,0.2)] transition-all">
          Figma ✏️
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-sky-400 border border-sky-400/20 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(56,189,248,0.15)] transition-all">
          Java ☕
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-sky-400 border border-sky-400/20 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(56,189,248,0.15)] transition-all">
          Python 🐍
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-sky-400 border border-sky-400/20 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(56,189,248,0.15)] transition-all">
          C 🔧
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-[#6BFFB8] border border-[#6BFFB8]/20 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(107,255,184,0.15)] transition-all">
          MySQL 🗄️
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-[#6BFFB8] border border-[#6BFFB8]/20 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(107,255,184,0.15)] transition-all">
          Git 🌿
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-amber-200 border border-amber-200/20 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(253,230,138,0.15)] transition-all">
          OOP 🧱
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-amber-200 border border-amber-200/20 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(253,230,138,0.15)] transition-all">
          DSA 🧠
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-amber-200 border border-amber-200/20 rounded text-[0.62rem] font-mono hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(253,230,138,0.15)] transition-all">
          OS &amp; Networks 💻
        </span>
      </div>

      {/* Grid of Interests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
        {/* Development Card */}
        <div className="bg-white rounded-2xl p-6 border-2 border-[#FF6B1A]/15 hover:translate-y-[-8px] hover:rotate-[0.8deg] hover:shadow-2xl transition-all duration-300">
          <span className="text-3xl mb-4 inline-block">💻</span>
          <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">Development</h3>
          <p className="font-mono text-[0.68rem] text-neutral-500 leading-relaxed">
            React, Firebase, and a genuine belief that the 47th console.log will finally explain everything.
          </p>
          <span className="inline-block mt-4 px-2.5 py-1 bg-[#FF6B1A]/10 text-[#FF6B1A] rounded-full text-[0.58rem] font-mono uppercase font-bold">
            ./dev
          </span>
        </div>

        {/* Design Card */}
        <div className="bg-white rounded-2xl p-6 border-2 border-[#FF6B1A]/15 hover:translate-y-[-8px] hover:rotate-[0.8deg] hover:shadow-2xl transition-all duration-300">
          <span className="text-3xl mb-4 inline-block">🎨</span>
          <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">Design</h3>
          <p className="font-mono text-[0.68rem] text-neutral-500 leading-relaxed">
            Will spend three hours on a border-radius. Built a full color system for a music app nobody asked for. No regrets.
          </p>
          <span className="inline-block mt-4 px-2.5 py-1 bg-[#FF6B1A]/10 text-[#FF6B1A] rounded-full text-[0.58rem] font-mono uppercase font-bold">
            ./design
          </span>
        </div>

        {/* Books Card */}
        <div className="bg-white rounded-2xl p-6 border-2 border-[#FF6B1A]/15 hover:translate-y-[-8px] hover:rotate-[0.8deg] hover:shadow-2xl transition-all duration-300">
          <span className="text-3xl mb-4 inline-block">📚</span>
          <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">Books</h3>
          <p className="font-mono text-[0.68rem] text-neutral-500 leading-relaxed">
            Non-fiction only. Fiction is lying on paper with better prose.
          </p>
          <span className="inline-block mt-4 px-2.5 py-1 bg-[#FF6B1A]/10 text-[#FF6B1A] rounded-full text-[0.58rem] font-mono uppercase font-bold">
            ./books
          </span>
        </div>

        {/* Music Interactive Card */}
        <div className="bg-white rounded-2xl p-6 border-2 border-[#FF6B1A]/15 hover:translate-y-[-8px] hover:rotate-[0.8deg] hover:shadow-2xl transition-all duration-300">
          <span className="text-3xl mb-4 inline-block">🎵</span>
          <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">Music</h3>
          <p className="font-mono text-[0.68rem] text-neutral-500 leading-relaxed">
            FLAC or nothing. Built a personal player because Spotify's audio quality felt like a personal insult.
          </p>
          <span className="inline-block mt-4 px-2.5 py-1 bg-[#FF6B1A]/10 text-[#FF6B1A] rounded-full text-[0.58rem] font-mono uppercase font-bold">
            ./music
          </span>
          <div className="mt-4">
            <button
              onClick={() => toggleForm('music')}
              className="font-mono text-[0.6rem] text-[#FF6B1A] font-extrabold hover:underline"
            >
              🎧 Drop me your playlist →
            </button>
            {activeForm === 'music' && (
              <InterestCardForm
                typeKey="playlist"
                placeholder="Playlist name or link..."
                ctaText="Send it 🎶"
                successMsg="✓ Sent. I'll check it out."
              />
            )}
          </div>
        </div>

        {/* Fitness Interactive Card */}
        <div className="bg-white rounded-2xl p-6 border-2 border-[#FF6B1A]/15 hover:translate-y-[-8px] hover:rotate-[0.8deg] hover:shadow-2xl transition-all duration-300">
          <span className="text-3xl mb-4 inline-block">🏋️</span>
          <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">Fitness</h3>
          <p className="font-mono text-[0.68rem] text-neutral-500 leading-relaxed">
            Body recomposition in progress. Day 1 is a recurring event — but the streak's building.
          </p>
          <span className="inline-block mt-4 px-2.5 py-1 bg-[#FF6B1A]/10 text-[#FF6B1A] rounded-full text-[0.58rem] font-mono uppercase font-bold">
            ./fitness
          </span>
          <div className="mt-4">
            <button
              onClick={() => toggleForm('fitness')}
              className="font-mono text-[0.6rem] text-[#FF6B1A] font-extrabold hover:underline"
            >
              💪 Tell me a routine →
            </button>
            {activeForm === 'fitness' && (
              <InterestCardForm
                typeKey="fitness"
                placeholder="Your go-to workout routine..."
                isTextArea={true}
                ctaText="Send it 🔥"
                successMsg="✓ Routine noted. Day 1 starts soon."
              />
            )}
          </div>
        </div>

        {/* Telugu poetry quote / Speaking Card */}
        <div className="bg-white rounded-2xl p-6 border-2 border-[#FF6B1A]/15 hover:translate-y-[-8px] hover:rotate-[0.8deg] hover:shadow-2xl transition-all duration-300">
          <span className="text-3xl mb-3 inline-block">🎤</span>
          <h3 className="font-serif text-[0.85rem] font-bold text-neutral-900 leading-normal mb-3 whitespace-pre-line">
            నేనొక దుర్గం{'\n'}
            నాదొక స్వర్గం{'\n'}
            అనర్గళం,{'\n'}
            అనితరసాధ్యం నా మార్గం
          </h3>
          <span className="inline-block mt-2 px-2.5 py-1 bg-[#FF6B1A]/10 text-[#FF6B1A] rounded-full text-[0.58rem] font-mono uppercase font-bold">
            ./speaking
          </span>
          <div className="mt-4">
            <button
              onClick={() => toggleForm('speaking')}
              className="font-mono text-[0.6rem] text-[#FF6B1A] font-extrabold hover:underline"
            >
              💬 Quote me something →
            </button>
            {activeForm === 'speaking' && (
              <InterestCardForm
                typeKey="quote"
                placeholder="Drop a quote that hits different..."
                isTextArea={true}
                ctaText="Send it ✨"
                successMsg="✓ Quoted. I'll carry it."
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
