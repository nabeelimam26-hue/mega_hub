import { useState, useEffect, useRef } from "react";
import {
  Search,
  Film,
  Music,
  Gamepad2,
  Book,
  Wrench,
  Brain,
  Home,
  Compass,
  Star,
} from "lucide-react";
import { SpeedInsights } from "@vercel/speed-insights/react";

/* ================= USERS ================= */
const USERS_LIST = [
  { username: "farhan", password: "1234", accessLevel: "Permanent" },
  { username: "guest", password: "1234", accessLevel: "Free" },
];

/* ================= DATA ================= */
const WEBSITES_DATA = [
  {
    category: "AI",
    icon: <Brain size={18} />,
    access: "Free",
    sites: [
      { name: "ChatGPT", url: "https://chat.openai.com" },
      { name: "Claude", url: "https://claude.ai" },
    ],
  },
  {
    category: "Movies/TV",
    icon: <Film size={18} />,
    access: "Paid",
    sites: [{ name: "Netflix", url: "https://netflix.com" }],
  },
  {
    category: "Music",
    icon: <Music size={18} />,
    access: "Free",
    sites: [{ name: "Spotify", url: "https://spotify.com" }],
  },
  {
    category: "Gaming",
    icon: <Gamepad2 size={18} />,
    access: "Paid",
    sites: [{ name: "Steam", url: "https://store.steampowered.com" }],
  },
  {
    category: "Books",
    icon: <Book size={18} />,
    access: "Free",
    sites: [{ name: "Gutenberg", url: "https://gutenberg.org" }],
  },
  {
    category: "Tools",
    icon: <Wrench size={18} />,
    access: "Permanent",
    sites: [{ name: "Canva", url: "https://canva.com" }],
  },
];

/* ================= ACCESS ================= */
const hasAccess = (userLevel, requiredLevel) => {
  const levels = ["Free", "Paid", "Permanent"];
  return levels.indexOf(userLevel) >= levels.indexOf(requiredLevel);
};

export default function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [trending, setTrending] = useState({});
  const touchStartX = useRef(null);

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    const savedUser = localStorage.getItem("mega_user");
    const savedFav = localStorage.getItem("favorites");
    const savedTrend = localStorage.getItem("trending");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedFav) setFavorites(JSON.parse(savedFav));
    if (savedTrend) setTrending(JSON.parse(savedTrend));
  }, []);

  /* ===== SAVE ===== */
  useEffect(() => {
    if (user) localStorage.setItem("mega_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("trending", JSON.stringify(trending));
  }, [trending]);

  /* ===== LOGIN ===== */
  const handleLogin = (u, p) => {
    const found = USERS_LIST.find(
      (x) => x.username === u && x.password === p
    );
    if (found) {
      setUser(found);
      setShowLogin(false);
    } else alert("Invalid");
  };

  const logout = () => {
    localStorage.removeItem("mega_user");
    setUser(null);
  };

  /* ===== SEARCH ===== */
  const filteredData = WEBSITES_DATA.map((cat) => ({
    ...cat,
    sites: cat.sites.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  useEffect(() => {
    if (!search) return setSuggestions([]);
    const all = WEBSITES_DATA.flatMap((c) => c.sites);
    setSuggestions(
      all.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 5)
    );
  }, [search]);

  /* ===== FAVORITES ===== */
  const toggleFavorite = (site) => {
    if (favorites.find((f) => f.name === site.name)) {
      setFavorites(favorites.filter((f) => f.name !== site.name));
    } else {
      setFavorites([...favorites, site]);
    }
  };

  /* ===== TRENDING ===== */
  const handleClick = (site) => {
    setTrending((prev) => ({
      ...prev,
      [site.name]: (prev[site.name] || 0) + 1,
    }));
  };

  /* ===== SWIPE ===== */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    if (e.changedTouches[0].clientX - touchStartX.current > 80)
      setSidebarOpen(true);
  };

  return (
    <div
      className="flex h-screen bg-[#0b0f19] text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* TOP MOBILE */}
      <div className="md:hidden fixed top-0 w-full p-4 flex justify-between bg-[#0f172a]">
        <button onClick={() => setSidebarOpen(true)}>☰</button>
        <h1 className="text-blue-400">Mega_hub</h1>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed md:static h-full w-64 bg-[#0f172a] p-5 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition z-50`}
      >
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <h1 className="text-blue-400 text-xl">Mega_hub</h1>
        <p className="text-xs">Farhan Nabeel</p>

        <button
          onClick={() => setShowLogin(true)}
          className="mt-4 w-full bg-blue-600 p-2 rounded"
        >
          {user ? "Logged In" : "Login"}
        </button>

        {user && (
          <button
            onClick={logout}
            className="mt-2 w-full bg-red-500 p-2 rounded"
          >
            Logout
          </button>
        )}
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4 mt-14 md:mt-0 overflow-y-auto pb-20">
        <h2 className="text-2xl mb-4">
          Welcome {user ? user.username : "Guest"}
        </h2>

        {/* SEARCH */}
        <div className="relative mb-6">
          <div className="flex bg-[#1e293b] p-2 rounded">
            <Search />
            <input
              className="bg-transparent ml-2 outline-none w-full"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {suggestions.length > 0 && (
            <div className="absolute w-full bg-[#1e293b] mt-2 rounded">
              {suggestions.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  className="block p-2 hover:bg-gray-700"
                >
                  {s.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* FAVORITES */}
        {favorites.length > 0 && (
          <div className="mb-6">
            <h2>⭐ Favorites</h2>
            <div className="flex gap-2 overflow-x-auto">
              {favorites.map((f, i) => (
                <a key={i} href={f.url} className="bg-[#1e293b] p-2 rounded">
                  {f.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* TRENDING */}
        <div className="mb-6">
          <h2>🔥 Trending</h2>
          <div className="flex gap-2">
            {Object.keys(trending).map((k) => (
              <div key={k}>{k}</div>
            ))}
          </div>
        </div>

        {/* GRID */}
        {filteredData.map((cat, i) => {
          if (!user && cat.category !== "AI") return null;
          if (user && !hasAccess(user.accessLevel, cat.access)) return null;

          return (
            <div key={i}>
              <h2>{cat.category}</h2>
              <div className="grid grid-cols-2 gap-4">
                {cat.sites.map((site, idx) => (
                  <a
                    key={idx}
                    href={site.url}
                    onClick={() => handleClick(site)}
                    className="bg-[#1e293b] p-4 rounded-xl relative"
                  >
                    {site.name}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(site);
                      }}
                      className="absolute top-1 right-2"
                    >
                      ★
                    </button>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 w-full flex justify-around bg-[#0f172a] p-3 md:hidden">
        <Home />
        <Compass />
        <Search />
        <Star />
      </div>

      {/* LOGIN */}
      {showLogin && (
        <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      )}

      {/* SPEED INSIGHTS */}
      <SpeedInsights />
    </div>
  );
}

function LoginModal({ onLogin, onClose }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
      <div className="bg-[#1e293b] p-6 rounded">
        <input
  placeholder="Username"
  className="w-full mb-3 p-2 bg-gray-700 text-white placeholder-gray-400 rounded outline-none"
  onChange={(e) => setU(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  className="w-full mb-4 p-2 bg-gray-700 text-white placeholder-gray-400 rounded outline-none"
  onChange={(e) => setP(e.target.value)}
/>
        <button
  onClick={() => onLogin(u, p)}
  className="w-full bg-blue-600 p-2 rounded mb-2"
>
  Login
</button>

<button
  onClick={onClose}
  className="w-full text-gray-400"
>
  Cancel
</button>
      </div>
    </div>
  );
}
