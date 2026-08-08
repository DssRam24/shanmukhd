import { useState, FormEvent } from 'react';
import { fetchSuggestions, fetchSubmissions } from '../services/firebase';
import { Suggestion, Submission } from '../types';

export default function AdminPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'sug' | 'pl' | 'fit' | 'qt'>('sug');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  // Door click handler - click 5 times to open login
  const handleDoorClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount >= 5) {
      setClickCount(0);
      setIsOpen(true);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    // base64 decoded credentials check: dssram24 and Chanti123*
    if (username.trim() === 'dssram24' && password === 'Chanti123*') {
      setIsLogged(true);
      setError(false);
      loadDashboardData('sug');
    } else {
      setError(true);
      setPassword('');
    }
  };

  const loadDashboardData = async (tabKey: 'sug' | 'pl' | 'fit' | 'qt') => {
    setLoading(true);
    try {
      if (tabKey === 'sug') {
        const data = await fetchSuggestions();
        setSuggestions(data);
      } else {
        const data = await fetchSubmissions();
        // filter submissions by category/type mapping
        if (tabKey === 'pl') {
          setSubmissions(data.filter((s) => s.type === 'playlist'));
        } else if (tabKey === 'fit') {
          setSubmissions(data.filter((s) => s.type === 'fitness'));
        } else if (tabKey === 'qt') {
          setSubmissions(data.filter((s) => s.type === 'quote'));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tabKey: 'sug' | 'pl' | 'fit' | 'qt') => {
    setActiveTab(tabKey);
    loadDashboardData(tabKey);
  };

  const closePortal = () => {
    setIsOpen(false);
    setIsLogged(false);
    setUsername('');
    setPassword('');
    setError(false);
  };

  return (
    <>
      {/* Absolute fixed 3D retro door at viewport bottom-left */}
      <div
        onClick={handleDoorClick}
        title="Secret Door"
        className="fixed bottom-4 left-4 z-[9990] w-6 h-10 cursor-pointer opacity-30 hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(255,107,26,0.6)] transition-all select-none"
      >
        <svg viewBox="0 0 58 100" className="w-full h-full block">
          <polygon points="8,4 58,0 58,100 8,100" fill="rgba(40,15,0,0.55)" />
          <polygon points="0,6 50,2 50,98 0,98" fill="rgba(120,55,15,0.82)" />
          <line x1="4" y1="10" x2="46" y2="7" stroke="rgba(90,35,5,0.4)" strokeWidth="1" />
          <line x1="4" y1="30" x2="46" y2="27" stroke="rgba(90,35,5,0.35)" strokeWidth="1" />
          <polygon points="8,12 42,9.5 42,42 8,44" fill="rgba(100,42,8,0.6)" stroke="rgba(60,20,2,0.5)" strokeWidth="1" />
          <ellipse cx="38" cy="52" rx="4" ry="3.5" fill="rgba(255,200,80,0.9)" stroke="rgba(200,140,30,0.8)" strokeWidth="1" />
        </svg>
      </div>

      {/* Admin Panel overlay dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-[99990] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-950 border-2 border-[#FF6B1A] p-8 rounded-2xl w-full max-w-sm shadow-[6px_6px_0_#FF6B1A] relative">
            <button
              onClick={closePortal}
              className="absolute top-3 right-4 font-mono text-lg text-neutral-600 hover:text-[#FF6B1A] transition-colors"
            >
              ✕
            </button>

            {!isLogged ? (
              // Login view
              <div>
                <h4 className="font-mono text-[0.75rem] text-[#FF6B1A] mb-6 tracking-wider font-extrabold uppercase select-none">
                  // Admin Authentication
                </h4>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    className="w-full bg-neutral-900 border border-[#FF6B1A]/40 rounded-lg px-4 py-2 font-mono text-xs text-neutral-200 outline-none focus:border-[#FF6B1A]"
                    required
                    autoComplete="off"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="w-full bg-neutral-900 border border-[#FF6B1A]/40 rounded-lg px-4 py-2 font-mono text-xs text-neutral-200 outline-none focus:border-[#FF6B1A]"
                    required
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#FF6B1A] text-neutral-950 font-bold rounded-lg font-mono text-[0.62rem] tracking-widest uppercase hover:translate-y-[-1px] shadow-[3px_3px_0_#e55c10] active:translate-y-0"
                  >
                    AUTHENTICATE
                  </button>
                </form>
                {error && (
                  <div className="font-mono text-[0.62rem] text-red-500 mt-3 animate-pulse">
                    Access denied. Invalid credentials.
                  </div>
                )}
              </div>
            ) : (
              // Dashboard inbox panel
              <div className="text-left">
                <h4 className="font-mono text-[0.75rem] text-[#FF6B1A] mb-4 tracking-wider font-extrabold uppercase">
                  // INBOX SYSTEM
                </h4>

                {/* Categories Switch tabs */}
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {(['sug', 'pl', 'fit', 'qt'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => handleTabChange(t)}
                      className={`px-2 py-1 rounded font-mono text-[0.52rem] uppercase tracking-wider ${
                        activeTab === t ? 'bg-[#FFD580] text-neutral-950 font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {t === 'sug' ? 'Suggestions' : t === 'pl' ? 'Playlists' : t === 'fit' ? 'Routines' : 'Quotes'}
                    </button>
                  ))}
                </div>

                {/* Records list panel container */}
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                  {loading ? (
                    <div className="font-mono text-[0.6rem] text-neutral-500 animate-pulse py-4">
                      Loading stream...
                    </div>
                  ) : activeTab === 'sug' ? (
                    // Suggestions items
                    suggestions.length > 0 ? (
                      suggestions.map((s, idx) => (
                        <div key={idx} className="border-l-2 border-[#FFD580] pl-3 py-2 bg-neutral-900/40 rounded-r-lg">
                          <span className="font-mono text-[0.45rem] text-[#FFD580] uppercase tracking-widest block">
                            {s.type === 'book' ? '📖 Book' : '🎬 Movie'}
                          </span>
                          <span className="font-serif text-xs font-bold text-white block mt-1">{s.title}</span>
                          <span className="font-mono text-[0.55rem] text-neutral-400 leading-snug block mt-0.5">{s.why}</span>
                          <span className="font-mono text-[0.45rem] text-neutral-600 block mt-1">— suggested by {s.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="font-serif text-neutral-600 text-center py-6 text-sm italic">Suggestions folder is empty.</div>
                    )
                  ) : (
                    // Submissions items (playlists, fitness, quotes)
                    submissions.length > 0 ? (
                      submissions.map((s, idx) => (
                        <div key={idx} className="border-l-2 border-[#FF6B1A] pl-3 py-2 bg-neutral-900/40 rounded-r-lg">
                          <span className="font-mono text-[0.45rem] text-[#FF6B1A] uppercase tracking-widest block">
                            {s.type === 'playlist' ? '🎧 Playlist' : s.type === 'fitness' ? '💪 Routine' : '💬 Quote'}
                          </span>
                          <span className="font-serif text-xs font-semibold text-white block mt-1">{s.value}</span>
                          <span className="font-mono text-[0.45rem] text-neutral-600 block mt-1">— shared by {s.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="font-serif text-neutral-600 text-center py-6 text-sm italic">Folder is empty.</div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
