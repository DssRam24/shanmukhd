import { useEffect, useState, FormEvent } from 'react';
import { fetchNotes, addNote } from '../services/firebase';

interface NoteItem {
  text: string;
  name: string;
  ts: number;
}

export default function FeedbackNotes() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const loadNotesFromDb = async () => {
    setLoading(true);
    try {
      const response = await fetchNotes();
      if (response && response.length > 0) {
        setNotes(response);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch live notes when panel opens or on mount
  useEffect(() => {
    if (isOpen) {
      loadNotesFromDb();
    }
  }, [isOpen]);

  // Mock initial visitor notes in case firestore isn't provisioned or empty
  useEffect(() => {
    setNotes([
      { text: 'This portfolio is wild! The draggable photo and the Windows 95 file explorer are clean 🔥', name: 'Developer Friend', ts: Date.now() - 100000 },
      { text: 'Hello Ram! Love your style and attention to detail. Let\'s collaborate!', name: 'Design Lead', ts: Date.now() - 500000 },
      { text: 'Maha Prasthanam is a masterpiece. Good choice!', name: 'Telugu Reader', ts: Date.now() - 1500000 }
    ]);
  }, []);

  const handleAddNote = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSending(true);
    const newNote = {
      text: text.trim(),
      name: name.trim() ? name.trim() : 'anonymous weirdo',
      ts: Date.now()
    };

    try {
      await addNote(newNote.text, newNote.name);
      // Prepend locally for immediate feel
      setNotes((prev) => [newNote, ...prev]);
      setText('');
      setName('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const stickyColors = [
    'bg-[#FFE88A] text-neutral-800', // Yellow
    'bg-[#FFB3D1] text-neutral-800', // Pink
    'bg-[#B3E8FF] text-neutral-800', // Blue
    'bg-[#B8FFD4] text-neutral-800', // Green
    'bg-[#FFD4B8] text-neutral-800'  // Peach
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[500] bg-neutral-950 text-[#FF6B1A] border-2 border-[#FF6B1A] w-12 h-12 rounded-lg flex items-center justify-center hover:scale-110 hover:rotate-6 hover:shadow-[6px_6px_0_#FF6B1A] shadow-[4px_4px_0_#FF6B1A] transition-all duration-300 pointer-events-auto cursor-pointer"
        aria-label="Toggle visitor notes"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
        </svg>
      </button>

      {/* Slide-out Visitor Notes Panel */}
      <div
        className={`fixed bottom-24 right-8 z-[499] w-[min(320px,90vw)] bg-[#0a0a0a] border-2 border-[#FF6B1A] p-6 rounded-2xl shadow-[6px_6px_0_#FF6B1A] max-h-[75vh] overflow-y-auto transition-all duration-300 origin-bottom-right pointer-events-auto ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-0 translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <h4 className="font-serif text-[#FF6B1A] text-lg font-bold mb-4">
          ✦ Leave a Note
        </h4>

        {/* Input Form */}
        <form onSubmit={handleAddNote} className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Say something nice..."
            rows={3}
            className="w-full bg-[#111] border border-[#FF6B1A]/40 rounded-xl p-3 font-serif text-[1rem] text-[#FFD580] outline-none focus:border-[#FF6B1A] transition-colors resize-none"
            required
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (or 'anonymous weirdo')"
            className="w-full bg-[#0a0a0a] border border-[#FF6B1A]/35 rounded-lg px-3 py-2 font-mono text-[0.68rem] text-neutral-300 outline-none focus:border-[#FF6B1A] transition-colors"
          />
          <button
            type="submit"
            disabled={isSending}
            className="w-full py-2 bg-[#FF6B1A] text-neutral-950 font-bold border-none rounded-lg font-mono text-[0.55rem] tracking-widest uppercase transition-all shadow-[3px_3px_0_#e55c10] active:translate-y-[2px]"
          >
            {isSending ? 'PINNING...' : 'PIN IT'}
          </button>
        </form>

        {/* Feed List header */}
        <div className="font-mono text-[0.52rem] text-neutral-500 uppercase tracking-widest mt-6 mb-3">
          Visitor Notes
        </div>

        {/* List of custom papers */}
        <div className="space-y-4">
          {notes.map((note, index) => {
            const colorClass = stickyColors[index % stickyColors.length];
            const randomRotation = ((index * 7) % 6) - 3; // safe deterministic tilt without triggering re-render flickering
            return (
              <div
                key={index}
                className={`p-4 rounded shadow-lg transition-transform hover:scale-105 ${colorClass}`}
                style={{
                  transform: `rotate(${randomRotation}deg)`
                }}
              >
                <p className="font-serif text-[0.95rem] leading-snug">{note.text}</p>
                <span className="block font-mono text-[0.6rem] opacity-60 mt-2 text-right">
                  — {note.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
