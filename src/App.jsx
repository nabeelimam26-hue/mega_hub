import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  Search, Star, Home, Compass, MoreVertical, 
  ExternalLink, Zap, Plus, Flame, Pin, Trash2, X 
} from "lucide-react";

// --- EXPANDED DATASET ---
const CATEGORIES = [
  { id: "ai", name: "🧠 AI & Intelligence", color: "from-blue-500 to-cyan-400" },
  { id: "media", name: "🎨 Creative & Video", color: "from-purple-500 to-pink-500" },
  { id: "movies", name: "🍿 Entertainment", color: "from-red-500 to-orange-500" },
  { id: "anime", name: "🌸 Anime World", color: "from-pink-400 to-rose-400" },
  { id: "tools", name: "🛠️ Power Tools", color: "from-emerald-500 to-teal-500" },
  { id: "edu", name: "📚 Knowledge", color: "from-amber-500 to-yellow-500" }
];

const SITE_DATA = [
  // AI
  { id: 1, cat: "ai", name: "ChatGPT", url: "https://chatgpt.com", trending: true },
  { id: 2, cat: "ai", name: "Claude", url: "https://claude.ai", trending: true },
  { id: 3, cat: "ai", name: "Perplexity", url: "https://perplexity.ai" },
  { id: 4, cat: "ai", name: "DeepSeek", url: "https://chat.deepseek.com" },
  { id: 5, cat: "ai", name: "Gemini", url: "https://gemini.google.com" },
  // Creative
  { id: 6, cat: "media", name: "Leonardo AI", url: "https://leonardo.ai" },
  { id: 7, cat: "media", name: "Runway Gen-3", url: "https://runwayml.com" },
  { id: 8, cat: "media", name: "Bing Create", url: "https://bing.com/images/create" },
  { id: 9, cat: "media", name: "PixVerse", url: "https://pixverse.ai" },
  // Movies
  { id: 10, cat: "movies", name: "Cineby", url: "https://cineby.app" },
  { id: 11, cat: "movies", name: "Fmovies", url: "https://fmovies.ps" },
  { id: 12, cat: "movies", name: "Tubi TV", url: "https://tubitv.com" },
  { id: 13, cat: "movies", name: "SFlix", url: "https://sflix.to" },
  // Anime
  { id: 14, cat: "anime", name: "Miruro", url: "https://miruro.tv" },
  { id: 15, cat: "anime", name: "Wotaku", url: "https://wotaku.moe" },
  { id: 16, cat: "anime", name: "AniList", url: "https://anilist.co" },
  { id: 17, cat: "anime", name: "MangaDex", url: "https://mangadex.org" },
  // Tools
  { id: 18, cat: "tools", name: "TinyWow", url: "https://tinywow.com" },
  { id: 19, cat: "tools", name: "VirusTotal", url: "https://virustotal.com" },
  { id: 20, cat: "tools", name: "10MinMail", url: "https://10minutemail.com" },
  { id: 21, cat: "tools", name: "uBlock", url: "https://ublockorigin.com" }
];

export default function MegaHub() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [recent, setRecent] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Persistence
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("mh_favs") || "[]");
    const recs = JSON.parse(localStorage.getItem("mh_recs") || "[]");
    setFavorites(favs);
    setRecent(recs);
  }, []);

  // Handlers
  const handleAction = (site) => {
    const updated = [site, ...recent.filter(s => s.id !== site.id)].slice(0, 8);
    setRecent(updated);
    localStorage.setItem("mh_recs", JSON.stringify(updated));
    window.open(site.url, "_blank");
  };

  const toggleFavorite = (e, site) => {
    e.stopPropagation();
    const isFav = favorites.find(f => f.id === site.id);
    const updated = isFav ? favorites.filter(f => f.id !== site.id) : [...favorites, site];
    setFavorites(updated);
    localStorage.setItem("mh_favs", JSON.stringify(updated));
  };

  // Filter Logic
  const filteredSites = useMemo(() => {
    return SITE_DATA.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === "all" || s.cat === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30 pb-28">
      
      {/* --- PREMIUM GLASS HEADER --- */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
              <span className="bg-amber-400 text-black px-1.5 rounded-md">M</span>
              MEGA HUB
            </h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Personal Dashboard v2.0</p>
          </div>
          <div className="flex gap-3">
            <motion.button whileTap={{scale:0.9}} className="p-2 bg-slate-900 rounded-full border border-white/5">
              <Zap size={18} className="text-amber-400" />
            </motion.button>
          </div>
        </div>

        {/* SEARCH BAR (iOS Style) */}
        <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : 'scale-100'}`}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text"
            placeholder="Search AI, Movies, Tools..."
            className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-400/50 focus:ring-4 focus:ring-amber-400/10 transition-all placeholder:text-slate-600"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <main className="px-6 py-4 space-y-8">
        
        {/* --- TRENDING / RECENT SECTION --- */}
        {!search && activeTab === "all" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Flame size={14} className="text-orange-500" /> Trending Now
              </h2>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {SITE_DATA.filter(s => s.trending).map(site => (
                <QuickCard key={site.id} site={site} onClick={() => handleAction(site)} />
              ))}
            </div>
          </section>
        )}

        {/* --- CATEGORY SELECTOR (Swipeable) --- */}
        <nav className="flex gap-2 overflow-x-auto no-scrollbar py-2 -mx-6 px-6">
          <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} label="All" icon="🏠" />
          {CATEGORIES.map(cat => (
            <TabButton 
              key={cat.id} 
              active={activeTab === cat.id} 
              onClick={() => setActiveTab(cat.id)} 
              label={cat.name.split(' ')[1]} 
              icon={cat.name.split(' ')[0]} 
            />
          ))}
        </nav>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSites.map((site) => (
              <SiteCard 
                key={site.id} 
                site={site} 
                isFav={favorites.some(f => f.id === site.id)}
                onToggleFav={(e) => toggleFavorite(e, site)}
                onClick={() => handleAction(site)}
              />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* --- PREMIUM BOTTOM NAV --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 flex justify-around items-center shadow-2xl shadow-black">
          <NavIcon icon={<Home size={22} />} active />
          <NavIcon icon={<Compass size={22} />} />
          <div className="h-12 w-12 bg-amber-400 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-amber-400/20 active:scale-90 transition-transform">
            <Plus size={28} />
          </div>
          <NavIcon icon={<Star size={22} />} />
          <NavIcon icon={<MoreVertical size={22} />} />
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function TabButton({ active, onClick, label, icon }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap text-xs font-bold transition-all border ${
        active 
          ? "bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20" 
          : "bg-slate-900 text-slate-400 border-white/5 hover:border-white/20"
      }`}
    >
      <span>{icon}</span> {label}
    </motion.button>
  );
}

function SiteCard({ site, isFav, onToggleFav, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative bg-slate-900 border border-white/5 rounded-3xl p-4 h-32 flex flex-col justify-between hover:border-amber-400/50 transition-colors cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-white/5 group-hover:bg-slate-700 transition-colors overflow-hidden">
           <img 
            src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=64`} 
            className="w-6 h-6" 
            alt=""
          />
        </div>
        <button onClick={onToggleFav} className="p-1">
          <Star size={16} fill={isFav ? "#FACC15" : "none"} className={isFav ? "text-amber-400" : "text-slate-600"} />
        </button>
      </div>
      <div>
        <h3 className="text-sm font-bold text-white truncate">{site.name}</h3>
        <p className="text-[10px] text-slate-500 truncate mt-0.5">{site.url.replace('https://', '')}</p>
      </div>
    </motion.div>
  );
}

function QuickCard({ site, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="min-w-[120px] bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-3xl border border-white/5 text-left"
    >
      <div className="text-xs font-bold text-white truncate mb-1">{site.name}</div>
      <div className="text-[9px] text-amber-400 font-black uppercase">Open Now →</div>
    </motion.button>
  );
}

function NavIcon({ icon, active = false }) {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className={`p-3 rounded-xl transition-colors ${active ? "text-amber-400" : "text-slate-500 hover:text-slate-300"}`}
    >
      {icon}
    </motion.button>
  );
}