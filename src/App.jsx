// 🚀 MEGA HUB - SUPREME GOD LEVEL MOBILE APP

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Star, Home, Compass } from "lucide-react";

const DATA = [
  { category: "AI", sites: [
    { name: "ChatGPT", url: "https://chatgpt.com" },
    { name: "Claude", url: "https://claude.ai" },
    { name: "Gemini", url: "https://gemini.google.com" }
  ]},
  { category: "Movies", sites: [
    { name: "Tubi", url: "https://tubitv.com" },
    { name: "Plex", url: "https://plex.tv" }
  ]}
];

export default function App() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");
  const [fav, setFav] = useState([]);
  const [recent, setRecent] = useState([]);
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    const f = JSON.parse(localStorage.getItem("fav") || "[]");
    const r = JSON.parse(localStorage.getItem("recent") || "[]");
    setFav(f);
    setRecent(r);
  }, []);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(recent));
  }, [recent]);

  // 🤖 AI suggestion
  useEffect(() => {
    if (recent.find(r => r.name === "ChatGPT")) {
      setSuggestion({ name: "Claude", url: "https://claude.ai" });
    }
  }, [recent]);

  const toggleFav = (site) => {
    if (fav.find(f => f.name === site.name)) {
      setFav(fav.filter(f => f.name !== site.name));
    } else {
      setFav([...fav, site]);
    }
  };

  const click = (site) => {
    const updated = [site, ...recent.filter(r => r.name !== site.name)].slice(0,5);
    setRecent(updated);
  };

  const filtered = DATA.map(c => ({
    ...c,
    sites: c.sites.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
  }));

  return (
    <div className="min-h-screen bg-black text-white pb-24">

      {/* HEADER */}
      <div className="p-4 sticky top-0 bg-black/80 backdrop-blur border-b border-gray-800 z-50">
        <h1 className="text-yellow-400 font-bold text-lg">⚡ Mega Hub</h1>

        <div className="mt-3 flex items-center bg-[#1e293b] p-2 rounded-xl">
          <Search size={18} />
          <input
            className="bg-transparent ml-2 w-full outline-none text-sm"
            placeholder="Search..."
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* AI SUGGESTION */}
      {suggestion && (
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          className="m-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          🤖 Try {suggestion.name}
        </motion.div>
      )}

      {/* RECENT */}
      {recent.length>0 && (
        <div className="px-3">
          <h2 className="text-sm text-gray-400 mb-2">Recent</h2>
          <div className="flex gap-2 overflow-x-auto">
            {recent.map((r,i)=>(
              <motion.a whileTap={{scale:0.9}} key={i} href={r.url}
                className="bg-[#1e293b] px-3 py-2 rounded-lg text-sm">
                {r.name}
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORY SWIPE */}
      <div className="flex gap-2 px-3 overflow-x-auto mt-3">
        {["All", ...DATA.map(c=>c.category)].map((c,i)=>(
          <button key={i} onClick={()=>setActive(c)}
            className={`px-3 py-1 rounded-full text-sm ${active===c?"bg-yellow-400 text-black":"bg-[#1e293b]"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-3 p-3">
        {filtered.map(cat => {
          if(active!=="All" && cat.category!==active) return null;

          return cat.sites.map((site,i)=>(
            <motion.a
              whileHover={{scale:1.05}}
              whileTap={{scale:0.95}}
              key={i}
              href={site.url}
              onClick={()=>click(site)}
              onContextMenu={(e)=>{
                e.preventDefault();
                alert("Long press actions coming soon ⚡");
              }}
              className="bg-[#1e293b] p-3 rounded-xl border border-gray-800">

              <div className="flex items-center gap-2">
                <img src={`https://www.google.com/s2/favicons?domain=${site.url}`} className="w-5 h-5"/>
                <span className="text-sm">{site.name}</span>
              </div>

              <button onClick={(e)=>{e.preventDefault();toggleFav(site)}} className="mt-2">
                <Star size={16} className={fav.find(f=>f.name===site.name)?"text-yellow-400":""}/>
              </button>
            </motion.a>
          ))
        })}
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 w-full bg-[#0f172a]/80 backdrop-blur border-t border-gray-800 flex justify-around p-3">
        <Home size={20} className="text-yellow-400"/>
        <Compass size={20} className="text-gray-400"/>
        <Star size={20} className="text-gray-400"/>
      </div>

    </div>
  );
}