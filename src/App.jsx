import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ExternalLink, Plus, Star, Copy, Check, Trash2, 
  Moon, Sun, ArrowRight
} from "lucide-react";

// ==================== ORIGINAL DATABASE RESTORED ====================

const USERS_LIST = [
  { id: 1, username: "farhan", password: "12345", accessLevel: "Permanent", name: "Farhan Nabeel" },
  { id: 2, username: "azlan", password: "12345", accessLevel: "Paid", name: "Azlan" },
  { id: 3, username: "danial", password: "12345", accessLevel: "Free", name: "Danial" },
  { id: 4, username: "demo", password: "demo", accessLevel: "Free", name: "Demo User" }
];

const CATEGORIES = [
  { id: "ai", name: "🧠 AI & Intelligence", color: "from-blue-500 to-cyan-400", free: true },
  { id: "media", name: "🎨 Creative & Video", color: "from-purple-500 to-pink-500", free: false },
  { id: "movies", name: "🍿 Entertainment", color: "from-red-500 to-orange-500", free: false },
  { id: "anime", name: "🌸 Anime World", color: "from-pink-400 to-rose-400", free: false },
  { id: "tools", name: "🛠️ Power Tools", color: "from-emerald-500 to-teal-500", free: true },
  { id: "edu", name: "📚 Knowledge", color: "from-amber-500 to-yellow-500", free: true },
  { id: "gaming", name: "🎮 Gaming", color: "from-violet-500 to-fuchsia-500", free: false },
  { id: "music", name: "🎵 Music & Audio", color: "from-green-500 to-emerald-500", free: false }
];

const INITIAL_SITES = [
  // AI
  { id: 101, cat: "ai", name: "ChatGPT", url: "https://chatgpt.com", trending: true, clicks: 1240 },
  { id: 102, cat: "ai", name: "Claude AI", url: "https://claude.ai", trending: true, clicks: 980 },
  { id: 103, cat: "ai", name: "Perplexity", url: "https://perplexity.ai", trending: true, clicks: 850 },
  { id: 104, cat: "ai", name: "DeepSeek", url: "https://chat.deepseek.com", clicks: 720 },
  { id: 105, cat: "ai", name: "NotebookLM", url: "https://notebooklm.google.com", trending: true, clicks: 540 },
  { id: 106, cat: "ai", name: "Arena (LMSYS)", url: "https://chat.lmsys.org", clicks: 610 },
  { id: 107, cat: "ai", name: "Mistral AI", url: "https://chat.mistral.ai", clicks: 320 },
  { id: 108, cat: "ai", name: "Bing Create", url: "https://bing.com/images/create", clicks: 450 },
  { id: 109, cat: "ai", name: "Leonardo AI", url: "https://leonardo.ai", clicks: 215 },
  { id: 110, cat: "ai", name: "Civitai", url: "https://civitai.com", clicks: 890 },
  { id: 111, cat: "ai", name: "SillyTavern", url: "https://github.com/SillyTavern/SillyTavern", clicks: 430 },
  { id: 112, cat: "ai", name: "FlowGPT", url: "https://flowgpt.com", clicks: 520 },
  { id: 113, cat: "ai", name: "Jan.ai", url: "https://jan.ai", clicks: 190 },
  { id: 114, cat: "ai", name: "LM Studio", url: "https://lmstudio.ai", clicks: 280 },
  { id: 115, cat: "ai", name: "Phind", url: "https://phind.com", clicks: 310 },
  { id: 116, cat: "ai", name: "Blackbox AI", url: "https://blackbox.ai", clicks: 150 },
  { id: 117, cat: "ai", name: "Remove.bg", url: "https://remove.bg", clicks: 670 },
  { id: 118, cat: "ai", name: "Vectorizer.ai", url: "https://vectorizer.ai", clicks: 140 },
  { id: 119, cat: "ai", name: "ElevenLabs", url: "https://elevenlabs.io", trending: true, clicks: 880 },
  { id: 120, cat: "ai", name: "Gamma App", url: "https://gamma.app", clicks: 410 },
  { id: 121, cat: "ai", name: "Vercel V0", url: "https://v0.dev", clicks: 390 },
  { id: 122, cat: "ai", name: "Hugging Face", url: "https://huggingface.co", clicks: 950 },
  { id: 123, cat: "ai", name: "Groq", url: "https://groq.com", clicks: 560 },
  { id: 124, cat: "ai", name: "Tome", url: "https://tome.app", clicks: 120 },
  { id: 125, cat: "ai", name: "Sun AI", url: "https://suno.com", trending: true, clicks: 710 },
  { id: 126, cat: "ai", name: "Udio", url: "https://udio.com", clicks: 440 },
  { id: 127, cat: "ai", name: "Krea AI", url: "https://krea.ai", clicks: 310 },
  { id: 128, cat: "ai", name: "Runway", url: "https://runwayml.com", clicks: 540 },
  { id: 129, cat: "ai", name: "Luma Labs", url: "https://lumalabs.ai", clicks: 430 },
  { id: 130, cat: "ai", name: "Midjourney", url: "https://midjourney.com", clicks: 1100 },

  // MOVIES & TV
  { id: 10, cat: "movies", name: "Cineby", url: "https://cineby.app", trending: true, clicks: 890 },
  { id: 11, cat: "movies", name: "Fmovies+", url: "https://fmovies.ps", clicks: 750 },
  { id: 12, cat: "movies", name: "XPrime", url: "https://xprime.pro", clicks: 430 },
  { id: 13, cat: "movies", name: "Rive", url: "https://rive.to", clicks: 320 },
  { id: 14, cat: "movies", name: "CorsFlix", url: "https://corsflix.com", clicks: 210 },
  { id: 15, cat: "movies", name: "Aether", url: "https://aether.sx", clicks: 190 },
  { id: 16, cat: "movies", name: "67Movies", url: "https://67movies.com", clicks: 150 },
  { id: 17, cat: "movies", name: "FlickyStream", url: "https://flickystream.com", clicks: 280 },
  { id: 18, cat: "movies", name: "Cinegram", url: "https://cinegram.org", clicks: 310 },
  { id: 19, cat: "movies", name: "ShuttleTV", url: "https://shuttletv.to", clicks: 440 },
  { id: 28, cat: "movies", name: "TVids", url: "https://tvids.net", trending: true, clicks: 780 },
  { id: 29, cat: "movies", name: "NEPU (4K)", url: "https://nepu.to", trending: true, clicks: 1100 },
  { id: 31, cat: "movies", name: "MovieBox", url: "https://moviebox.pro", clicks: 950 },
  { id: 33, cat: "movies", name: "SFlix", url: "https://sflix.to", trending: true, clicks: 880 },
  { id: 34, cat: "movies", name: "LookMovie", url: "https://lookmovie.foundation", clicks: 540 },

  // ANIME
  { id: 50, cat: "anime", name: "Miruro", url: "https://miruro.tv", trending: true, clicks: 920 },
  { id: 51, cat: "anime", name: "Wotaku", url: "https://wotaku.moe", clicks: 450 },
  { id: 52, cat: "anime", name: "AniList", url: "https://anilist.co", clicks: 310 },
  { id: 53, cat: "anime", name: "MangaDex", url: "https://mangadex.org", clicks: 680 },
  { id: 54, cat: "anime", name: "Crunchyroll", url: "https://crunchyroll.com", clicks: 1400 },
  { id: 55, cat: "anime", name: "Hianime", url: "https://hianime.to", trending: true, clicks: 1150 },
  { id: 56, cat: "anime", name: "9Anime", url: "https://9animetv.to", clicks: 890 },

  // TOOLS
  { id: 70, cat: "tools", name: "HydraHD", url: "https://hydrahd.com", clicks: 340 },
  { id: 72, cat: "tools", name: "Willow", url: "https://willow.to", trending: true, clicks: 580 },
  { id: 74, cat: "tools", name: "TinyWow", url: "https://tinywow.com", clicks: 410 },
  { id: 75, cat: "tools", name: "uBlock Origin", url: "https://ublockorigin.com", trending: true, clicks: 999 },

  // EDUCATION
  { id: 401, cat: "edu", name: "Anna’s Archive", url: "https://annas-archive.org", trending: true, clicks: 1600 },
  { id: 402, cat: "edu", name: "Library Genesis", url: "https://libgen.is", trending: true, clicks: 1400 },
  { id: 403, cat: "edu", name: "Z-Library", url: "https://z-lib.gs", clicks: 1100 },
  { id: 404, cat: "edu", name: "Project Gutenberg", url: "https://gutenberg.org", clicks: 520 },
  { id: 406, cat: "edu", name: "OceanofPDF", url: "https://oceanofpdf.com", clicks: 740 },
  { id: 410, cat: "edu", name: "MangaFire", url: "https://mangafire.to", clicks: 950 },
  { id: 413, cat: "edu", name: "Wikipedia", url: "https://wikipedia.org", trending: true, clicks: 1800 },
  { id: 418, cat: "edu", name: "freeCodeCamp", url: "https://freecodecamp.org", trending: true, clicks: 920 },
  { id: 420, cat: "edu", name: "MDN Web Docs", url: "https://developer.mozilla.org", clicks: 760 },
  { id: 425, cat: "edu", name: "Sci-Hub", url: "https://sci-hub.se", trending: true, clicks: 1100 },

  // GAMING
  { id: 301, cat: "gaming", name: "Steam", url: "https://steampowered.com", trending: true, clicks: 1800 },
  { id: 302, cat: "gaming", name: "Epic Games", url: "https://epicgames.com", clicks: 920 },
  { id: 304, cat: "gaming", name: "Itch.io", url: "https://itch.io", trending: true, clicks: 880 },
  { id: 305, cat: "gaming", name: "FitGirl Repacks", url: "https://fitgirl-repacks.site", trending: true, clicks: 1400 },
  { id: 306, cat: "gaming", name: "DODI Repacks", url: "https://dodi-repacks.site", clicks: 950 },
  { id: 308, cat: "gaming", name: "CDRomance", url: "https://cdromance.org", trending: true, clicks: 610 },
  { id: 309, cat: "gaming", name: "Vimm's Lair", url: "https://vimm.net", clicks: 1100 },
  { id: 314, cat: "gaming", name: "Neal.fun", url: "https://neal.fun", trending: true, clicks: 1200 },
  { id: 320, cat: "gaming", name: "Roblox", url: "https://roblox.com", clicks: 1100 },
  { id: 323, cat: "gaming", name: "Nexus Mods", url: "https://nexusmods.com", clicks: 1300 },

  // MUSIC
  { id: 201, cat: "music", name: "Spotify", url: "https://open.spotify.com", trending: true, clicks: 1500 },
  { id: 202, cat: "music", name: "YouTube Music", url: "https://music.youtube.com", clicks: 920 },
  { id: 203, cat: "music", name: "SoundCloud", url: "https://soundcloud.com", clicks: 840 },
  { id: 206, cat: "music", name: "Bandcamp", url: "https://bandcamp.com", trending: true, clicks: 560 },
  { id: 209, cat: "music", name: "Drive n Listen", url: "https://drivenlisten.com", trending: true, clicks: 890 },
  { id: 211, cat: "music", name: "Lofi Girl", url: "https://lofigirl.com", clicks: 750 },
  { id: 219, cat: "music", name: "Samplette", url: "https://samplette.io", trending: true, clicks: 440 },
];

// ==================== MAIN COMPONENT ====================

export default function MegaHub() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  
  // Functional State
  const [sites, setSites] = useState(INITIAL_SITES);
  const [favorites, setFavorites] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mh_user_data");
    if (saved) setUser(JSON.parse(saved));
    const savedFavs = localStorage.getItem("mh_favs");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    
    // Only load custom sites from storage, keep original DB intact
    const savedCustomSites = localStorage.getItem("mh_custom_sites");
    if (savedCustomSites) {
      setSites([...INITIAL_SITES, ...JSON.parse(savedCustomSites)]);
    } else {
      setSites(INITIAL_SITES);
    }
  }, []);

  // Save changes to local storage
  useEffect(() => { localStorage.setItem("mh_favs", JSON.stringify(favorites)); }, [favorites]);
  
  // Only save newly added custom sites, not the hardcoded ones
  useEffect(() => { 
    const customOnly = sites.filter(s => s.isCustom);
    localStorage.setItem("mh_custom_sites", JSON.stringify(customOnly)); 
  }, [sites]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const deleteSite = (e, id) => {
    e.stopPropagation();
    setSites(prev => prev.filter(s => s.id !== id));
    setFavorites(prev => prev.filter(f => f !== id));
  };

  const filteredSites = useMemo(() => {
    let filtered = activeTab === "favs" 
      ? sites.filter(s => favorites.includes(s.id))
      : activeTab === "all" 
        ? sites 
        : sites.filter(s => s.cat === activeTab);
        
    if (search) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
    }
    return filtered;
  }, [search, activeTab, sites, favorites]);

  if (!user) return <Login onLogin={(u) => { setUser(u); localStorage.setItem("mh_user_data", JSON.stringify(u)); }} />;

  // Theme styling logic
  const bgClass = darkMode 
    ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-slate-200" 
    : "bg-slate-50 text-slate-900";

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${bgClass}`}>
      
      {/* HEADER (Glassmorphic) */}
      {/* HEADER (Glassmorphic) */}
<header className={`px-6 py-5 border-b sticky top-0 z-40 backdrop-blur-xl ${darkMode ? 'border-white/10 bg-black/20' : 'border-slate-200 bg-white/50'}`}>
  <div className="max-w-6xl mx-auto flex justify-between items-center">
    <div className="flex items-center gap-3">
      {/* The MH Logo Square */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-lg ${darkMode ? 'bg-white/10 text-white shadow-white/5' : 'bg-slate-900 text-white shadow-slate-900/20'}`}>
        MH
      </div>
      
      <div>
        <h1 className="font-bold tracking-tight leading-tight">MegaHub</h1>
        <div className="flex items-center gap-1.5">
          {/* Your Shining Name */}
          <span className="name-shine text-[10px] uppercase tracking-widest">
            {user.name}
          </span>
          <span className="text-slate-600 text-[10px]">•</span>
          {/* Permanent Access Text */}
          <p className={`text-[10px] uppercase tracking-widest font-bold ${darkMode ? 'text-amber-400/80' : 'text-amber-600'}`}>
            {user.accessLevel} Access
          </p>
        </div>
      </div>
    </div>
    
    {/* Rest of the header (Theme toggle & Add button) remains the same */}
    <div className="flex items-center gap-4">
      <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full transition-all">
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl font-medium bg-white/10 text-white border border-white/10">
        <Plus size={16} /> Add Site
      </button>
    </div>
  </div>
</header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* SEARCH (Glassmorphic) */}
        <div className="relative mb-8 group">
          <Search size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-slate-500 group-focus-within:text-white' : 'text-slate-400 group-focus-within:text-slate-900'}`} />
          <input 
            type="text" 
            placeholder="Search your workspace..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 transition-all backdrop-blur-md ${
              darkMode 
                ? 'bg-white/5 border border-white/10 focus:border-white/30 focus:ring-white/5 placeholder:text-slate-500 text-white' 
                : 'bg-white border border-slate-300 focus:border-slate-400 focus:ring-slate-100 placeholder:text-slate-400 text-slate-900 shadow-sm'
            }`}
          />
        </div>

        {/* TABS */}
        <div className={`flex gap-6 mb-8 border-b overflow-x-auto no-scrollbar ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
          {[
            { id: "all", name: "All Sites" },
            { id: "favs", name: "Favorites" },
            ...CATEGORIES
          ].map(tab => {
            // Check category access
            const isAccessible = tab.id === "all" || tab.id === "favs" || user.accessLevel !== "Free" || CATEGORIES.find(c => c.id === tab.id)?.free;
            if (!isAccessible) return null;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap relative ${
                  activeTab === tab.id 
                    ? darkMode ? 'text-white' : 'text-slate-900' 
                    : darkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.name.split(' ').pop()} {/* Show only the text part of the category for cleaner look */}
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTab" className={`absolute bottom-0 left-0 right-0 h-[2px] ${darkMode ? 'bg-white' : 'bg-slate-900'}`} />
                )}
              </button>
            )
          })}
        </div>

        {/* GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSites.map(site => (
              <SiteCard 
                key={site.id} 
                site={site} 
                isFav={favorites.includes(site.id)}
                onToggleFav={(e) => toggleFavorite(e, site.id)}
                onDelete={(e) => deleteSite(e, site.id)}
                darkMode={darkMode}
              />
            ))}
          </AnimatePresence>
          
          {filteredSites.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-16 text-center">
              <p className={`text-sm ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>No sites found in this view.</p>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {showAddModal && <AddModal darkMode={darkMode} onClose={() => setShowAddModal(false)} onAdd={(newSite) => setSites([...sites, newSite])} />}
      </AnimatePresence>
    </div>
  );
}

// --- SUB COMPONENTS ---

function SiteCard({ site, isFav, onToggleFav, onDelete, darkMode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(site.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openLink = () => window.open(site.url, "_blank");

  // Glassmorphism classes
  const cardStyle = darkMode 
    ? "bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:bg-white/[0.08] hover:border-white/20" 
    : "bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={openLink}
      className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-36 ${cardStyle}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'}`}>
            <img src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=64`} className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
          </div>
          <div>
            <h3 className={`text-sm font-bold truncate w-36 ${darkMode ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-900'} transition-colors`}>{site.name}</h3>
            <p className={`text-xs truncate w-36 mt-0.5 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{site.url.replace('https://', '').replace('www.', '')}</p>
          </div>
        </div>
        <ExternalLink size={14} className={`${darkMode ? 'text-slate-600' : 'text-slate-400'} opacity-0 group-hover:opacity-100 transition-opacity`} />
      </div>

      {/* ACTION BUTTONS (Functional & Useful) */}
      <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onToggleFav} className={`p-2 rounded-lg transition-all ${isFav ? 'text-amber-400 bg-amber-400/10' : darkMode ? 'text-slate-500 hover:bg-white/10 hover:text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'}`}>
          <Star size={14} className={isFav ? 'fill-current' : ''} />
        </button>
        <button onClick={handleCopy} className={`p-2 rounded-lg transition-all ${darkMode ? 'text-slate-500 hover:bg-white/10 hover:text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'}`}>
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
        <div className="flex-grow" />
        {site.isCustom && (
          <button onClick={onDelete} className={`p-2 rounded-lg transition-all ${darkMode ? 'text-slate-500 hover:bg-red-500/10 hover:text-red-400' : 'text-slate-400 hover:bg-red-50 hover:text-red-500'}`}>
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

function AddModal({ onClose, onAdd, darkMode }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [cat, setCat] = useState("tools");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !url) return;
    onAdd({ id: Date.now(), name, url: url.startsWith('http') ? url : `https://${url}`, cat, isCustom: true });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} 
        className={`p-6 rounded-3xl w-full max-w-sm shadow-2xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Add New Site</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input autoFocus type="text" placeholder="Site Name" value={name} onChange={e => setName(e.target.value)} 
            className={`w-full rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white focus:ring-white/20 border' : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-slate-200 border'}`} />
          <input type="text" placeholder="URL (e.g., github.com)" value={url} onChange={e => setUrl(e.target.value)} 
            className={`w-full rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white focus:ring-white/20 border' : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-slate-200 border'}`} />
          
          <select value={cat} onChange={e => setCat(e.target.value)}
            className={`w-full rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 transition-all appearance-none ${darkMode ? 'bg-[#1a1f2e] border-white/10 text-white focus:ring-white/20 border' : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-slate-200 border'}`}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className={`flex-1 py-3 text-sm font-medium rounded-xl transition-colors ${darkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>Cancel</button>
            <button type="submit" className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all shadow-lg ${darkMode ? 'bg-white hover:bg-slate-200 text-slate-900' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}>Save Site</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    const foundUser = USERS_LIST.find(u => u.username === username && u.password === password);
    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black flex items-center justify-center p-6 text-slate-200 font-sans selection:bg-white/20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 border border-white/10 shadow-lg shadow-white/5">MH</div>
          <h1 className="text-2xl font-bold tracking-tight text-white">MegaHub Portal</h1>
          <p className="text-sm text-slate-400 mt-1">Sign in to your workspace</p>
        </div>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={e => {setUsername(e.target.value); setError(false);}}
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-white/30 text-white transition-colors placeholder:text-slate-500" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={e => {setPassword(e.target.value); setError(false);}}
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-white/30 text-white transition-colors placeholder:text-slate-500" 
          />
          
          {error && <p className="text-xs text-red-400 text-center">Invalid credentials. Try again.</p>}

          <button type="submit" className="w-full flex justify-center items-center gap-2 bg-white text-black font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-colors mt-2">
            Access Hub <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
           <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Authorized Personnel Only</p>
        </div>
      </motion.div>
    </div>
  );
}