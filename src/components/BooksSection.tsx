import { useState, useEffect, FormEvent } from 'react';
import { addSuggestion } from '../services/firebase';

const AMBIENT_QUOTES = [
  '"A reader lives a thousand lives before he dies."',
  '"Not all those who wander are lost."',
  '"So we beat on, boats against the current."',
  '"It was the best of times, it was the worst of times."',
  '"Imagination is more important than knowledge."',
  '"We accept the love we think we deserve."',
  '"Stay hungry, stay foolish."',
  '"There is no friend as loyal as a book."',
  '"Words are our most inexhaustible source of magic."',
  '"So many books, so little time."',
  '"Call me Ishmael."',
  '"To be or not to be, that is the question."',
  '"The journey of a thousand miles begins with one step."',
  '"Maha Prasthanam - SriSri"'
];

export default function BooksSection() {
  const [tab, setTab] = useState<'book' | 'movie'>('book');
  const [title, setTitle] = useState('');
  const [why, setWhy] = useState('');
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [quotes, setQuotes] = useState<{ text: string; left: number; delay: number; duration: number }[]>([]);

  // Generate randomized flying author quotes on mount
  useEffect(() => {
    const list = AMBIENT_QUOTES.map((q) => ({
      text: q,
      left: Math.random() * 85 + 5,
      delay: Math.random() * -20,
      duration: Math.random() * 12 + 18
    }));
    setQuotes(list);
  }, []);

  const handleSubmitSuggestion = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSending(true);
    try {
      await addSuggestion(title.trim(), why.trim(), name.trim(), tab);
      setSent(true);
      setTitle('');
      setWhy('');
      setName('');
      setTimeout(() => setSent(false), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const booksList = [
    {
      title: 'Surrounded by Idiots',
      author: 'Thomas Erikson',
      color: 'from-[#1a0a2e] to-[#3d1a5e]',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200&h=300',
      genre: 'Psychology'
    },
    {
      title: 'Leadership',
      author: 'B.V. Pattabhi Ram',
      color: 'from-[#1a1200] to-[#4a3300]',
      cover: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200&h=300',
      genre: 'Self-Help'
    },
    {
      title: 'Zero to One',
      author: 'Peter Thiel',
      color: 'from-[#001520] to-[#003d5c]',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200&h=300',
      genre: 'Business'
    },
    {
      title: 'The Dead Are Alive',
      author: 'Harold Shermann',
      color: 'from-[#1b2a1a] to-[#0d1f0d]',
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200&h=300',
      genre: 'Spirituality'
    },
    {
      title: 'Maha Prasthanam',
      author: 'SriSri',
      color: 'from-[#2e0806] to-[#591410]',
      cover: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=200&h=300',
      genre: 'Telugu Poetics'
    }
  ];

  return (
    <section id="books" className="py-24 px-[5%] bg-[#0a0a0a] relative overflow-hidden">
      {/* Starry Depth Celestial Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(100,150,255,0.08),transparent_65%)] pointer-events-none select-none animate-pulse duration-1000" />

      {/* 3D Flying Ambient Author Quotes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {quotes.map((q, i) => (
          <div
            key={i}
            className="absolute bottom-[-3rem] font-serif text-[0.62rem] md:text-[0.75rem] text-[#FFD580]/15 whitespace-nowrap will-change-transform animate-float-quote"
            style={{
              left: `${q.left}%`,
              animationDelay: `${q.delay}s`,
              animationDuration: `${q.duration}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear'
            }}
          >
            {q.text}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-start text-left">
        {/* Books & Watchlist Grid list */}
        <div className="flex-1 w-full">
          <div className="font-mono text-[0.6rem] text-[#FFD580] tracking-[0.2em] uppercase mb-4 flex items-center gap-4">
            003 — Books &amp; Films
            <span className="h-[1px] bg-[#FFD580]/30 flex-1" />
          </div>

          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-bold mb-12 text-[#FFFAF2]">
            What I read &amp; watch <em className="italic text-[#FFD580]">this year.</em>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {booksList.map((book, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/60 backdrop-blur-sm border border-[#FFD580]/15 rounded-xl overflow-hidden hover:translate-y-[-16px] hover:rotate-y-[-8deg] hover:rotate-x-[3deg] hover:shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(255,213,128,0.12)] transition-all duration-500 ease-out flex flex-col justify-between p-3 min-h-[260px] group"
              >
                {/* Book Cover simulated frame */}
                <div className={`relative aspect-[3/4] bg-gradient-to-br ${book.color} rounded-lg overflow-hidden flex items-center justify-center p-4 border border-white/5`}>
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover rounded opacity-75 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-[#FFD580]/10 text-[#FFD580] rounded font-mono text-[0.45rem] tracking-wider uppercase">
                    {book.genre}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="font-serif text-sm font-bold text-white leading-snug tracking-tight">
                    {book.title}
                  </h4>
                  <span className="block font-mono text-[0.55rem] text-neutral-400 mt-1 uppercase">
                    {book.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Suggestion Panel */}
        <div className="w-full lg:w-[280px] bg-neutral-950/80 backdrop-blur border border-[#FFD580]/20 rounded-2xl p-6 shadow-2xl shrink-0">
          <h3 className="font-serif text-[#FFD580] text-lg font-bold mb-4 flex items-center gap-2">
            <span>✦</span> Suggest me something
          </h3>

          <div className="flex gap-2 mb-4 bg-neutral-900/60 p-1 rounded-lg border border-neutral-800">
            <button
              onClick={() => setTab('book')}
              className={`flex-1 py-1 rounded text-center font-mono text-[0.58rem] tracking-wider uppercase transition-colors ${
                tab === 'book' ? 'bg-[#FFD580] text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              📖 Book
            </button>
            <button
              onClick={() => setTab('movie')}
              className={`flex-1 py-1 rounded text-center font-mono text-[0.58rem] tracking-wider uppercase transition-colors ${
                tab === 'movie' ? 'bg-[#FFD580] text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              🎬 Movie
            </button>
          </div>

          <form onSubmit={handleSubmitSuggestion} className="space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title..."
              className="w-full bg-[#0a0a0a] border border-[#FFD580]/25 rounded-lg px-3 py-2 font-mono text-[0.62rem] text-neutral-200 outline-none focus:border-[#FFD580] transition-colors"
              required
            />
            <input
              type="text"
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              placeholder="Why I'd love it..."
              className="w-full bg-[#0a0a0a] border border-[#FFD580]/25 rounded-lg px-3 py-2 font-mono text-[0.62rem] text-neutral-200 outline-none focus:border-[#FFD580] transition-colors"
              required
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full bg-[#0a0a0a] border border-[#FFD580]/25 rounded-lg px-3 py-2 font-mono text-[0.62rem] text-neutral-200 outline-none focus:border-[#FFD580] transition-colors"
            />
            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2 bg-[#FFD580] text-neutral-950 border-none rounded-lg font-mono text-[0.6rem] font-bold transition-opacity hover:opacity-95 disabled:opacity-50 tracking-wider uppercase"
            >
              {isSending ? 'Sending...' : 'Suggest it →'}
            </button>
          </form>

          {sent && (
            <div className="text-[0.6rem] text-green-400 font-mono mt-3 text-center animate-pulse">
              ✓ Sent! Shanmukh will check it out.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
