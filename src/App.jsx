import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  Search, Star, Home, Compass, MoreVertical, 
  ExternalLink, Zap, Plus, Flame, Pin, Trash2, X, 
  LogOut, Lock, Eye, EyeOff, AlertCircle, Check, ChevronDown,
  Moon, Sun, Download, Upload, BarChart3, Share2, Settings,
  Keyboard, Grid, List, Clock, TrendingUp, Copy, CheckCircle2
} from "lucide-react";

// ==================== DATA STRUCTURES ====================

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
const SITE_DATA = [
  // AI (Free & Trending)
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
  { id: 20, cat: "movies", name: "SpenFlix", url: "https://spenflix.com", clicks: 120 },
  { id: 21, cat: "movies", name: "1Shows", url: "https://1shows.org", clicks: 560 },
  { id: 22, cat: "movies", name: "PopcornMovies", url: "https://popcornmovies.to", clicks: 390 },
  { id: 23, cat: "movies", name: "Cinema.BZ", url: "https://cinema.bz", clicks: 180 },
  { id: 24, cat: "movies", name: "Cinevibe", url: "https://cinevibe.top", clicks: 245 },
  { id: 25, cat: "movies", name: "FilmCave", url: "https://filmcave.co", clicks: 130 },
  { id: 26, cat: "movies", name: "Flixway", url: "https://flixway.to", clicks: 95 },
  { id: 27, cat: "movies", name: "Smashystream", url: "https://smashystream.xyz", clicks: 610 },
  { id: 28, cat: "movies", name: "TVids", url: "https://tvids.net", trending: true, clicks: 780 },
  { id: 29, cat: "movies", name: "NEPU (4K)", url: "https://nepu.to", trending: true, clicks: 1100 },
  { id: 30, cat: "movies", name: "yFlix", url: "https://yflix.to", clicks: 420 },
  { id: 31, cat: "movies", name: "MovieBox", url: "https://moviebox.pro", clicks: 950 },
  { id: 32, cat: "movies", name: "RidoMovies", url: "https://ridomovies.com", clicks: 215 },
  { id: 33, cat: "movies", name: "SFlix", url: "https://sflix.to", trending: true, clicks: 880 },
  { id: 34, cat: "movies", name: "LookMovie", url: "https://lookmovie.foundation", clicks: 540 },
  { id: 35, cat: "movies", name: "Flixer", url: "https://flixer.com", clicks: 330 },
  { id: 36, cat: "movies", name: "FlyX", url: "https://flyx.to", clicks: 190 },
  { id: 37, cat: "movies", name: "Vidbox", url: "https://vidbox.to", clicks: 410 },
  { id: 38, cat: "movies", name: "CinemaOS", url: "https://cinemaos.to", clicks: 270 },

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
  { id: 71, cat: "tools", name: "NexVid", url: "https://nexvid.to", clicks: 210 },
  { id: 72, cat: "tools", name: "Willow", url: "https://willow.to", trending: true, clicks: 580 },
  { id: 73, cat: "tools", name: "Auto Embed", url: "https://autoembed.to", clicks: 150 },
  { id: 74, cat: "tools", name: "TinyWow", url: "https://tinywow.com", clicks: 410 },
  { id: 75, cat: "tools", name: "uBlock Origin", url: "https://ublockorigin.com", trending: true, clicks: 999 },

  // EDUCATION (duplicate removed)
  { id: 401, cat: "edu", name: "Anna’s Archive", url: "https://annas-archive.org", trending: true, clicks: 1600 },
  { id: 402, cat: "edu", name: "Library Genesis", url: "https://libgen.is", trending: true, clicks: 1400 },
  { id: 403, cat: "edu", name: "Z-Library", url: "https://z-lib.gs", clicks: 1100 },
  { id: 404, cat: "edu", name: "Project Gutenberg", url: "https://gutenberg.org", clicks: 520 },
  { id: 405, cat: "edu", name: "Internet Archive Books", url: "https://archive.org/details/books", clicks: 890 },
  { id: 406, cat: "edu", name: "OceanofPDF", url: "https://oceanofpdf.com", clicks: 740 },
  { id: 407, cat: "edu", name: "PDF Drive", url: "https://pdfdrive.com", clicks: 610 },
  { id: 408, cat: "edu", name: "Open Library", url: "https://openlibrary.org", clicks: 430 },
  { id: 410, cat: "edu", name: "MangaFire", url: "https://mangafire.to", clicks: 950 },
  { id: 411, cat: "edu", name: "ReadComicsOnline", url: "https://readcomiconline.li", clicks: 840 },
  { id: 412, cat: "edu", name: "GetComics", url: "https://getcomics.org", clicks: 310 },
  { id: 413, cat: "edu", name: "Wikipedia", url: "https://wikipedia.org", trending: true, clicks: 1800 },
  { id: 414, cat: "edu", name: "Britannica", url: "https://britannica.com", clicks: 215 },
  { id: 415, cat: "edu", name: "Wikihow", url: "https://wikihow.com", clicks: 580 },
  { id: 416, cat: "edu", name: "Khan Academy", url: "https://khanacademy.org", clicks: 670 },
  { id: 417, cat: "edu", name: "Coursera", url: "https://coursera.org", clicks: 410 },
  { id: 418, cat: "edu", name: "freeCodeCamp", url: "https://freecodecamp.org", trending: true, clicks: 920 },
  { id: 419, cat: "edu", name: "W3Schools", url: "https://w3schools.com", clicks: 850 },
  { id: 420, cat: "edu", name: "MDN Web Docs", url: "https://developer.mozilla.org", clicks: 760 },
  { id: 421, cat: "edu", name: "OpenCulture", url: "https://openculture.com", clicks: 190 },
  { id: 422, cat: "edu", name: "Standard Ebooks", url: "https://standardebooks.org", clicks: 150 },
  { id: 423, cat: "edu", name: "Feedbooks", url: "https://feedbooks.com", clicks: 120 },
  { id: 424, cat: "edu", name: "ManyBooks", url: "https://manybooks.net", clicks: 280 },
  { id: 425, cat: "edu", name: "Sci-Hub", url: "https://sci-hub.se", trending: true, clicks: 1100 },
  { id: 426, cat: "edu", name: "ArXiv", url: "https://arxiv.org", clicks: 540 },
  { id: 427, cat: "edu", name: "ResearchGate", url: "https://researchgate.net", clicks: 310 },
  { id: 428, cat: "edu", name: "Goodreads", url: "https://goodreads.com", clicks: 780 },
  { id: 429, cat: "edu", name: "StoryGraph", url: "https://app.thestorygraph.com", clicks: 245 },
  { id: 430, cat: "edu", name: "BookFinder", url: "https://bookfinder.com", clicks: 130 },

  // GAMING
  { id: 301, cat: "gaming", name: "Steam", url: "https://steampowered.com", trending: true, clicks: 1800 },
  { id: 302, cat: "gaming", name: "Epic Games", url: "https://epicgames.com", clicks: 920 },
  { id: 303, cat: "gaming", name: "GOG", url: "https://gog.com", clicks: 430 },
  { id: 304, cat: "gaming", name: "Itch.io", url: "https://itch.io", trending: true, clicks: 880 },
  { id: 305, cat: "gaming", name: "FitGirl Repacks", url: "https://fitgirl-repacks.site", trending: true, clicks: 1400 },
  { id: 306, cat: "gaming", name: "DODI Repacks", url: "https://dodi-repacks.site", clicks: 950 },
  { id: 307, cat: "gaming", name: "SteamRip", url: "https://steamrip.com", clicks: 720 },
  { id: 308, cat: "gaming", name: "CDRomance", url: "https://cdromance.org", trending: true, clicks: 610 },
  { id: 309, cat: "gaming", name: "Vimm's Lair", url: "https://vimm.net", clicks: 1100 },
  { id: 310, cat: "gaming", name: "MyAbandonware", url: "https://myabandonware.com", clicks: 540 },
  { id: 311, cat: "gaming", name: "RomSpure", url: "https://romspure.cc", clicks: 410 },
  { id: 312, cat: "gaming", name: "EmulatorJS", url: "https://emulatorjs.org", clicks: 270 },
  { id: 313, cat: "gaming", name: "Online Sequencer", url: "https://onlinesequencer.net", clicks: 190 },
  { id: 314, cat: "gaming", name: "Neal.fun", url: "https://neal.fun", trending: true, clicks: 1200 },
  { id: 315, cat: "gaming", name: "Board Game Arena", url: "https://boardgamearena.com", clicks: 340 },
  { id: 316, cat: "gaming", name: "Twitch", url: "https://twitch.tv", clicks: 1400 },
  { id: 317, cat: "gaming", name: "Speedrun.com", url: "https://speedrun.com", clicks: 580 },
  { id: 318, cat: "gaming", name: "PCGamingWiki", url: "https://pcgamingwiki.com", clicks: 420 },
  { id: 319, cat: "gaming", name: "HowLongToBeat", url: "https://howlongtobeat.com", clicks: 310 },
  { id: 320, cat: "gaming", name: "Roblox", url: "https://roblox.com", clicks: 1100 },
  { id: 321, cat: "gaming", name: "Geforce Now", url: "https://nvidia.com/geforce-now", clicks: 890 },
  { id: 322, cat: "gaming", name: "Xbox Cloud", url: "https://xbox.com/play", clicks: 670 },
  { id: 323, cat: "gaming", name: "Nexus Mods", url: "https://nexusmods.com", clicks: 1300 },
  { id: 324, cat: "gaming", name: "GameBanana", url: "https://gamebanana.com", clicks: 480 },
  { id: 325, cat: "gaming", name: "BlueStacks", url: "https://bluestacks.com", clicks: 310 },
  { id: 326, cat: "gaming", name: "ScummVM", url: "https://scummvm.org", clicks: 150 },
  { id: 327, cat: "gaming", name: "RetroArch", url: "https://retroarch.com", clicks: 690 },
  { id: 328, cat: "gaming", name: "Flashpoint", url: "https://bluemaxima.org/flashpoint", clicks: 510 },
  { id: 329, cat: "gaming", name: "PokeClicker", url: "https://pokeclicker.com", clicks: 380 },
  { id: 330, cat: "gaming", name: "Poki Games", url: "https://poki.com", clicks: 920 },

  // MUSIC
  { id: 201, cat: "music", name: "Spotify", url: "https://open.spotify.com", trending: true, clicks: 1500 },
  { id: 202, cat: "music", name: "YouTube Music", url: "https://music.youtube.com", clicks: 920 },
  { id: 203, cat: "music", name: "SoundCloud", url: "https://soundcloud.com", clicks: 840 },
  { id: 204, cat: "music", name: "Deezer", url: "https://deezer.com", clicks: 310 },
  { id: 205, cat: "music", name: "Tidal", url: "https://tidal.com", clicks: 180 },
  { id: 206, cat: "music", name: "Bandcamp", url: "https://bandcamp.com", trending: true, clicks: 560 },
  { id: 207, cat: "music", name: "Free Music Archive", url: "https://freemusicarchive.org", clicks: 210 },
  { id: 208, cat: "music", name: "JioSaavn", url: "https://jiosaavn.com", clicks: 470 },
  { id: 209, cat: "music", name: "Drive n Listen", url: "https://drivenlisten.com", trending: true, clicks: 890 },
  { id: 210, cat: "music", name: "Radio Garden", url: "https://radio.garden", clicks: 640 },
  { id: 211, cat: "music", name: "Lofi Girl", url: "https://lofigirl.com", clicks: 750 },
  { id: 212, cat: "music", name: "Generative.fm", url: "https://generative.fm", clicks: 120 },
  { id: 213, cat: "music", name: "Moodist", url: "https://moodist.app", clicks: 340 },
  { id: 214, cat: "music", name: "iMissMyCafe", url: "https://imissmycafe.com", clicks: 220 },
  { id: 215, cat: "music", name: "Listen Notes", url: "https://listennotes.com", clicks: 190 },
  { id: 216, cat: "music", name: "Podbay", url: "https://podbay.fm", clicks: 150 },
  { id: 217, cat: "music", name: "Player FM", url: "https://player.fm", clicks: 280 },
  { id: 218, cat: "music", name: "Relisten", url: "https://relisten.net", clicks: 310 },
  { id: 219, cat: "music", name: "Samplette", url: "https://samplette.io", trending: true, clicks: 440 },
  { id: 220, cat: "music", name: "Freesound", url: "https://freesound.org", clicks: 520 },
  { id: 221, cat: "music", name: "Baud", url: "https://baud.station.pw", clicks: 130 },
  { id: 222, cat: "music", name: "Muffon", url: "https://muffon.xyz", clicks: 95 },
  { id: 223, cat: "music", name: "Nuclear", url: "https://nuclear.js.org", clicks: 180 },
  { id: 224, cat: "music", name: "TuneIn", url: "https://tunein.com", clicks: 610 },
  { id: 225, cat: "music", name: "Internet Archive Audio", url: "https://archive.org/details/audio", clicks: 780 },
  { id: 226, cat: "music", name: "The 120 Minutes Archive", url: "https://120minutes.org", clicks: 110 },
  { id: 227, cat: "music", name: "Anixtv Music", url: "https://music.anixtv.com", clicks: 245 },
  { id: 228, cat: "music", name: "SoundClick", url: "https://soundclick.com", clicks: 130 },
  { id: 229, cat: "music", name: "Audiomack", url: "https://audiomack.com", clicks: 540 },
  { id: 230, cat: "music", name: "Mixcloud", url: "https://mixcloud.com", clicks: 330 },
];

// KEYBOARD SHORTCUTS
const SHORTCUTS = [
  { key: "?", action: "Show shortcuts", description: "Display this menu" },
  { key: "Cmd/Ctrl + K", action: "Focus search", description: "Jump to search" },
  { key: "Cmd/Ctrl + /", action: "Toggle theme", description: "Dark/Light mode" },
  { key: "Cmd/Ctrl + E", action: "Export", description: "Export all data" },
  { key: "Cmd/Ctrl + L", action: "Logout", description: "Sign out" },
  { key: "Escape", action: "Clear search", description: "Reset search" }
];

// ==================== MAIN COMPONENT ====================

export default function MegaHub() {
  // AUTH STATE
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // UI STATE
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [recent, setRecent] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [customSites, setCustomSites] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [copiedSite, setCopiedSite] = useState(null);

  // ADD SITE FORM STATE
  const [newSite, setNewSite] = useState({ name: "", url: "", category: "ai" });

  // LOAD DATA
  useEffect(() => {
  // restore login
  const savedUser = JSON.parse(localStorage.getItem("mh_user"));
  if (savedUser) {
    setUser(savedUser);
    setShowLoginModal(false);
  }

  // existing stuff
  const favs = JSON.parse(localStorage.getItem("mh_favs") || "[]");
  const recs = JSON.parse(localStorage.getItem("mh_recs") || "[]");
  const custom = JSON.parse(localStorage.getItem("mh_custom") || "[]");
  const savedDarkMode = JSON.parse(localStorage.getItem("mh_darkMode") || "true");

  setFavorites(favs);
  setRecent(recs);
  setCustomSites(custom);
  setDarkMode(savedDarkMode);
  }, []);

  // KEYBOARD SHORTCUTS
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K - Focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('input[placeholder*="Search"]')?.focus();
      }

      // Cmd/Ctrl + / - Toggle theme
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setDarkMode(!darkMode);
      }

      // Cmd/Ctrl + E - Export
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        handleExport();
      }

      // Cmd/Ctrl + L - Logout
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        handleLogout();
      }

      // ? - Show shortcuts
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        setShowShortcutsModal(!showShortcutsModal);
      }

      // Escape - Clear search
      if (e.key === 'Escape') {
        setSearch("");
        setShowShortcutsModal(false);
        setShowStatsModal(false);
        setShowSettings(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [darkMode, showShortcutsModal]);

  // ==================== AUTH HANDLERS ====================

  const handleLogin = (e) => {
  e.preventDefault();
  const foundUser = USERS_LIST.find(
    u => u.username === loginUsername && u.password === loginPassword
  );

  if (foundUser) {
    setUser(foundUser);
    setShowLoginModal(false);
    setLoginError("");

    // ✅ ADD THIS LINE
    localStorage.setItem("mh_user", JSON.stringify(foundUser));

    setLoginUsername("");
    setLoginPassword("");
  } else {
    setLoginError("Invalid username or password");
  }
};

  const handleLogout = () => {
  setUser(null);
  setShowLoginModal(true);
  setSearch("");
  setActiveTab("all");

  // ✅ ADD THIS
  localStorage.removeItem("mh_user");
};

  // ==================== SITE HANDLERS ====================

  const handleAction = (site) => {
    const updated = [site, ...recent.filter(s => s.id !== site.id)].slice(0, 8);
    setRecent(updated);
    localStorage.setItem("mh_recs", JSON.stringify(updated));
    
    // Update click count
    const allSites = [...SITE_DATA, ...customSites];
    const siteIndex = allSites.findIndex(s => s.id === site.id);
    if (siteIndex !== -1) {
      allSites[siteIndex].clicks = (allSites[siteIndex].clicks || 0) + 1;
    }
    
    window.open(site.url, "_blank");
  };

  const toggleFavorite = (e, site) => {
    e.stopPropagation();
    const isFav = favorites.find(f => f.id === site.id);
    const updated = isFav ? favorites.filter(f => f.id !== site.id) : [...favorites, site];
    setFavorites(updated);
    localStorage.setItem("mh_favs", JSON.stringify(updated));
  };

  const handleAddSite = (e) => {
    e.preventDefault();
    if (!newSite.name || !newSite.url) return;

    const site = {
      id: Math.max(...SITE_DATA.map(s => s.id), ...customSites.map(s => s.id)) + 1,
      cat: newSite.category,
      name: newSite.name,
      url: newSite.url,
      clicks: 0,
      custom: true
    };

    const updated = [...customSites, site];
    setCustomSites(updated);
    localStorage.setItem("mh_custom", JSON.stringify(updated));
    setNewSite({ name: "", url: "", category: "ai" });
    setShowAddDrawer(false);
  };

  const handleDeleteSite = (siteId) => {
    const updated = customSites.filter(s => s.id !== siteId);
    setCustomSites(updated);
    localStorage.setItem("mh_custom", JSON.stringify(updated));
  };

  // ==================== EXPORT/IMPORT ====================

  const handleExport = () => {
    const data = {
      favorites,
      recent,
      customSites,
      exportDate: new Date().toISOString(),
      version: "2.0"
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mega-hub-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result);
        setFavorites(data.favorites || []);
        setRecent(data.recent || []);
        setCustomSites(data.customSites || []);
        localStorage.setItem("mh_favs", JSON.stringify(data.favorites || []));
        localStorage.setItem("mh_recs", JSON.stringify(data.recent || []));
        localStorage.setItem("mh_custom", JSON.stringify(data.customSites || []));
      } catch (err) {
        alert("Invalid backup file");
      }
    };
    reader.readAsText(file);
  };

  const handleCopySiteUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedSite(url);
    setTimeout(() => setCopiedSite(null), 2000);
  };

  // ==================== FILTERING LOGIC ====================

  const getAccessibleSites = () => {
    const allSites = [...SITE_DATA, ...customSites];
    if (!user) return [];
    
    if (user.accessLevel === "Permanent") return allSites;
    if (user.accessLevel === "Paid") return allSites;
    if (user.accessLevel === "Free") {
      return allSites.filter(s => {
        const cat = CATEGORIES.find(c => c.id === s.cat);
        return cat?.free === true;
      });
    }
    return [];
  };

  const accessibleSites = getAccessibleSites();

  const filteredSites = useMemo(() => {
    return accessibleSites.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === "all" || s.cat === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab, accessibleSites]);

  // MOST VISITED
  const mostVisited = useMemo(() => {
    return [...accessibleSites]
      .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
      .slice(0, 4);
  }, [accessibleSites]);

  // STATISTICS
  const stats = useMemo(() => {
    return {
      totalSites: accessibleSites.length,
      favoriteSites: favorites.length,
      recentSites: recent.length,
      customSites: customSites.length,
      totalClicks: accessibleSites.reduce((sum, s) => sum + (s.clicks || 0), 0),
      mostVisitedSite: mostVisited[0] || null
    };
  }, [accessibleSites, favorites, recent, customSites, mostVisited]);

  // TIME-BASED GREETING
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  // ACCESS LEVEL BADGE
  const getAccessBadge = () => {
    const colors = {
      Free: "bg-slate-700 text-slate-200",
      Paid: "bg-amber-500/20 text-amber-300",
      Permanent: "bg-emerald-500/20 text-emerald-300"
    };
    return colors[user?.accessLevel] || colors.Free;
  };

  const bgClass = darkMode ? "bg-slate-950" : "bg-slate-50";
  const textClass = darkMode ? "text-slate-200" : "text-slate-800";
  const cardClass = darkMode ? "bg-slate-900" : "bg-white";
  const borderClass = darkMode ? "border-white/5" : "border-slate-200";

  // ==================== RENDER LOGIN MODAL ====================

  if (!user || showLoginModal) {
    return (
      <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          {/* LOGO */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/30"
            >
              <span className="text-2xl font-black text-slate-950">M</span>
            </motion.div>
            <h1 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-950'} mb-1`}>MEGA HUB</h1>
            <p className={`text-sm ${darkMode ? 'text-slate-500' : 'text-slate-600'} uppercase tracking-widest`}>Portal v2.0</p>
          </div>

          {/* LOGIN FORM */}
          <motion.form
            onSubmit={handleLogin}
            className={`${cardClass} backdrop-blur-2xl border ${borderClass} rounded-3xl p-8 space-y-5 shadow-2xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* USERNAME */}
            <div>
              <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-widest mb-2 block`}>Username</label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="farhan"
                className={`w-full ${darkMode ? 'bg-slate-800 border-white/10 placeholder:text-slate-600' : 'bg-slate-100 border-slate-300 placeholder:text-slate-500'} border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-400/50 focus:ring-4 focus:ring-amber-400/10 transition-all`}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-widest mb-2 block`}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••"
                  className={`w-full ${darkMode ? 'bg-slate-800 border-white/10 placeholder:text-slate-600' : 'bg-slate-100 border-slate-300 placeholder:text-slate-500'} border rounded-xl py-3 px-4 pr-12 text-white focus:outline-none focus:border-amber-400/50 focus:ring-4 focus:ring-amber-400/10 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2"
              >
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{loginError}</p>
              </motion.div>
            )}

            {/* LOGIN BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold py-3.5 rounded-xl transition-all hover:shadow-xl hover:shadow-amber-500/40"
            >
              Login
            </motion.button>

            {/* DEMO CREDENTIALS */}
            <div className={`${darkMode ? 'bg-slate-800/50' : 'bg-slate-200/50'} rounded-lg p-4 border ${borderClass}`}>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-2 font-bold`}>DEMO CREDENTIALS:</p>
              <div className={`space-y-1 text-xs ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                <p><span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>farhan</span> / 12345 (Permanent)</p>
                <p><span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>azlan</span> / 12345 (Paid)</p>
                <p><span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>demo</span> / demo (Free)</p>
              </div>
            </div>

            {/* KEYBOARD HINT */}
            <p className={`text-xs text-center ${darkMode ? 'text-slate-600' : 'text-slate-500'}`}>Press <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-300">?</kbd> for keyboard shortcuts</p>
          </motion.form>
        </motion.div>
      </div>
    );
  }

  // ==================== MAIN UI ====================

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} font-sans selection:bg-amber-500/30 pb-28`}>
      
      {/* --- PREMIUM GLASS HEADER --- */}
      <header className={`sticky top-0 z-40 backdrop-blur-2xl ${darkMode ? 'bg-slate-950/80' : 'bg-white/80'} border-b ${borderClass} px-6 py-4`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-600'} font-bold uppercase tracking-widest mb-1`}>
              {getGreeting()}, {user.name}
            </p>
            <h1 className={`text-2xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-slate-950'} flex items-center gap-2`}>
              <span className="bg-amber-400 text-black px-1.5 rounded-md">M</span>
              MEGA HUB
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-xs font-bold px-3 py-1.5 rounded-full ${getAccessBadge()}`}>
              {user.accessLevel}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'} border ${borderClass} rounded-full transition-all`}
              title="Toggle theme"
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-amber-600" />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSettings(true)}
              className={`p-2 ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'} border ${borderClass} rounded-full transition-all`}
              title="Settings"
            >
              <Settings size={18} className={darkMode ? "text-slate-400" : "text-slate-600"} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className={`p-2 ${darkMode ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30' : 'bg-red-100 hover:bg-red-200 border-red-300'} border rounded-full transition-all`}
              title="Logout"
            >
              <LogOut size={18} className={darkMode ? "text-red-400" : "text-red-600"} />
            </motion.button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : 'scale-100'}`}>
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500' : 'text-slate-600'}`} size={18} />
          <input 
            type="text"
            placeholder="Search AI, Movies, Tools... (Cmd/Ctrl + K)"
            className={`w-full ${darkMode ? 'bg-slate-900 border-white/10 placeholder:text-slate-600' : 'bg-slate-100 border-slate-300 placeholder:text-slate-500'} border rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-400/50 focus:ring-4 focus:ring-amber-400/10 transition-all`}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <main className="px-6 py-4 space-y-8">
        
        {/* --- STATS SECTION --- */}
        {!search && activeTab === "all" && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard label="Total Sites" value={stats.totalSites} icon={<Grid size={16} />} />
              <StatCard label="Favorites" value={stats.favoriteSites} icon={<Star size={16} />} />
              <StatCard label="Total Clicks" value={stats.totalClicks} icon={<TrendingUp size={16} />} />
              <StatCard label="Custom Sites" value={stats.customSites} icon={<Plus size={16} />} />
            </div>
          </motion.section>
        )}

        {/* --- MOST VISITED SECTION --- */}
        {!search && activeTab === "all" && mostVisited.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-600'} flex items-center gap-2`}>
                <Zap size={14} className="text-yellow-400" /> Most Visited
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mostVisited.map(site => (
                <QuickCard key={site.id} site={site} onClick={() => handleAction(site)} darkMode={darkMode} />
              ))}
            </div>
          </motion.section>
        )}

        {/* --- TRENDING SECTION --- */}
        {!search && activeTab === "all" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-600'} flex items-center gap-2`}>
                <Flame size={14} className="text-orange-500" /> Trending Now
              </h2>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {accessibleSites.filter(s => s.trending).map(site => (
                <TrendingCard key={site.id} site={site} onClick={() => handleAction(site)} darkMode={darkMode} />
              ))}
            </div>
          </section>
        )}

        {/* --- CATEGORY SELECTOR --- */}
        <nav className="flex gap-2 overflow-x-auto no-scrollbar py-2 -mx-6 px-6">
          <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} label="All" icon="🏠" darkMode={darkMode} />
          {CATEGORIES.map(cat => {
            const isAccessible = user.accessLevel === "Permanent" || user.accessLevel === "Paid" || cat.free;
            return isAccessible ? (
              <TabButton 
                key={cat.id} 
                active={activeTab === cat.id} 
                onClick={() => setActiveTab(cat.id)} 
                label={cat.name.split(' ')[1]} 
                icon={cat.name.split(' ')[0]}
                darkMode={darkMode}
              />
            ) : (
              <motion.div
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap text-xs font-bold ${darkMode ? 'bg-slate-900 text-slate-600 border-white/5' : 'bg-slate-200 text-slate-500 border-slate-300'} border opacity-50 cursor-not-allowed`}
              >
                <span>{cat.name.split(' ')[0]}</span>
                <Lock size={12} />
              </motion.div>
            );
          })}
        </nav>

        {/* --- MAIN GRID/LIST --- */}
        {filteredSites.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-2 gap-4" : "space-y-3"}>
            <AnimatePresence mode="popLayout">
              {filteredSites.map((site) => (
                <SiteCard 
                  key={site.id} 
                  site={site} 
                  isFav={favorites.some(f => f.id === site.id)}
                  onToggleFav={(e) => toggleFavorite(e, site)}
                  onClick={() => handleAction(site)}
                  onDelete={() => handleDeleteSite(site.id)}
                  onCopyUrl={() => handleCopySiteUrl(site.url)}
                  isCopied={copiedSite === site.url}
                  isCustom={site.custom}
                  darkMode={darkMode}
                  viewMode={viewMode}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Lock size={48} className={`mx-auto ${darkMode ? 'text-slate-600' : 'text-slate-400'} mb-4 opacity-50`} />
            <p className={`${darkMode ? 'text-slate-500' : 'text-slate-600'} text-sm`}>Upgrade to {user.accessLevel === "Free" ? "Paid" : "Permanent"} to access more sites</p>
          </motion.div>
        )}
      </main>

      {/* --- BOTTOM NAV --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
        <div className={`${darkMode ? 'bg-slate-900/90' : 'bg-white/90'} backdrop-blur-2xl border ${borderClass} rounded-3xl p-2 flex justify-around items-center shadow-2xl`}>
          <NavIcon icon={<Home size={22} />} active onClick={() => setActiveTab('all')} darkMode={darkMode} />
          <NavIcon icon={<Star size={22} />} onClick={() => handleExport()} darkMode={darkMode} label="Export" />
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setShowAddDrawer(true)}
            className="h-12 w-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-lg shadow-amber-400/40 active:scale-90 transition-transform"
          >
            <Plus size={28} />
          </motion.button>
          <NavIcon icon={<BarChart3 size={22} />} onClick={() => setShowStatsModal(true)} darkMode={darkMode} label="Stats" />
          <NavIcon icon={<Keyboard size={22} />} onClick={() => setShowShortcutsModal(true)} darkMode={darkMode} label="Help" />
        </div>
      </div>

      {/* --- ADD SITE DRAWER --- */}
      <AnimatePresence>
        {showAddDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddDrawer(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className={`fixed bottom-0 left-0 right-0 z-50 ${darkMode ? 'bg-gradient-to-t from-slate-900 to-slate-900/50' : 'bg-gradient-to-t from-white to-slate-50'} border-t ${borderClass} rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>Add New Site</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddDrawer(false)}
                  className={`p-2 ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-200'} rounded-lg`}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <form onSubmit={handleAddSite} className="space-y-4">
                <div>
                  <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-widest mb-2 block`}>Site Name</label>
                  <input
                    type="text"
                    value={newSite.name}
                    onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                    placeholder="e.g., My Awesome Site"
                    className={`w-full ${darkMode ? 'bg-slate-800 border-white/10 placeholder:text-slate-600' : 'bg-slate-100 border-slate-300 placeholder:text-slate-500'} border rounded-xl py-3 px-4 focus:outline-none focus:border-amber-400/50 focus:ring-4 focus:ring-amber-400/10 transition-all`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-widest mb-2 block`}>URL</label>
                  <input
                    type="url"
                    value={newSite.url}
                    onChange={(e) => setNewSite({ ...newSite, url: e.target.value })}
                    placeholder="https://example.com"
                    className={`w-full ${darkMode ? 'bg-slate-800 border-white/10 placeholder:text-slate-600' : 'bg-slate-100 border-slate-300 placeholder:text-slate-500'} border rounded-xl py-3 px-4 focus:outline-none focus:border-amber-400/50 focus:ring-4 focus:ring-amber-400/10 transition-all`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-widest mb-2 block`}>Category</label>
                  <select
                    value={newSite.category}
                    onChange={(e) => setNewSite({ ...newSite, category: e.target.value })}
                    className={`w-full ${darkMode ? 'bg-slate-800 border-white/10' : 'bg-slate-100 border-slate-300'} border rounded-xl py-3 px-4 focus:outline-none focus:border-amber-400/50 focus:ring-4 focus:ring-amber-400/10 transition-all`}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold py-3.5 rounded-xl transition-all hover:shadow-xl hover:shadow-amber-500/40 mt-6"
                >
                  Add Site
                </motion.button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- STATS MODAL --- */}
      <AnimatePresence>
        {showStatsModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStatsModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${borderClass} rounded-2xl p-8 max-w-sm w-[90%] shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>Statistics</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowStatsModal(false)}
                  className={`p-2 ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-200'} rounded-lg`}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="space-y-4">
                <StatRow label="Total Sites" value={stats.totalSites} />
                <StatRow label="Favorites" value={stats.favoriteSites} />
                <StatRow label="Total Clicks" value={stats.totalClicks} />
                <StatRow label="Custom Sites" value={stats.customSites} />
                <StatRow label="Most Visited" value={stats.mostVisitedSite?.name || "None"} />
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExport}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 py-2 rounded-lg transition-all"
                >
                  <Download size={16} /> Export Data
                </motion.button>

                <label className="w-full flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 py-2 rounded-lg transition-all cursor-pointer">
                  <Upload size={16} /> Import Data
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                </label>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- SHORTCUTS MODAL --- */}
      <AnimatePresence>
        {showShortcutsModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShortcutsModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${borderClass} rounded-2xl p-8 max-w-sm w-[90%] shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-950'} flex items-center gap-2`}>
                  <Keyboard size={24} /> Shortcuts
                </h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowShortcutsModal(false)}
                  className={`p-2 ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-200'} rounded-lg`}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {SHORTCUTS.map((shortcut, idx) => (
                  <div key={idx} className={`flex items-start justify-between p-3 ${darkMode ? 'bg-slate-800/50' : 'bg-slate-100'} rounded-lg`}>
                    <div>
                      <p className={`text-sm font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{shortcut.action}</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>{shortcut.description}</p>
                    </div>
                    <kbd className={`px-2 py-1 ${darkMode ? 'bg-slate-900 text-slate-300' : 'bg-slate-300 text-slate-800'} rounded text-xs font-mono whitespace-nowrap`}>
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== SUB-COMPONENTS ====================

function TabButton({ active, onClick, label, icon, darkMode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap text-xs font-bold transition-all border ${
        active 
          ? "bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20" 
          : darkMode ? "bg-slate-900 text-slate-400 border-white/5 hover:border-white/20" : "bg-slate-200 text-slate-600 border-slate-300 hover:border-slate-400"
      }`}
    >
      <span>{icon}</span> {label}
    </motion.button>
  );
}

function SiteCard({ site, isFav, onToggleFav, onClick, onDelete, onCopyUrl, isCopied, isCustom, darkMode, viewMode }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`group relative ${darkMode ? 'bg-slate-900 border-white/5 hover:border-amber-400/50' : 'bg-slate-100 border-slate-300 hover:border-amber-400/50'} border rounded-3xl p-4 ${viewMode === "grid" ? "h-32 flex flex-col justify-between" : "flex items-center justify-between"} transition-colors cursor-pointer`}
    >
      <div className="flex justify-between items-start w-full">
        <div className={`w-10 h-10 ${darkMode ? 'bg-slate-800' : 'bg-slate-200'} rounded-xl flex items-center justify-center border ${darkMode ? 'border-white/5' : 'border-slate-300'} ${darkMode ? 'group-hover:bg-slate-700' : 'group-hover:bg-slate-300'} transition-colors overflow-hidden`}>
          {!imageError ? (
            <img 
              src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=64`}
              onError={() => setImageError(true)}
              className="w-6 h-6" 
              alt=""
            />
          ) : (
            <span className="text-xs font-bold text-amber-400">{site.name[0]}</span>
          )}
        </div>
        <div className="flex gap-1">
          <motion.button onClick={onCopyUrl} className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {isCopied ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} className={darkMode ? "text-slate-600" : "text-slate-500"} />}
          </motion.button>
          <motion.button onClick={onToggleFav} className="p-1">
            <Star size={16} fill={isFav ? "#FACC15" : "none"} className={isFav ? "text-amber-400" : darkMode ? "text-slate-600" : "text-slate-500"} />
          </motion.button>
          {isCustom && <motion.button onClick={onDelete} className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Trash2 size={16} className={darkMode ? "text-red-600" : "text-red-500"} />
          </motion.button>}
        </div>
      </div>
      <div>
        <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-950'} truncate`}>{site.name}</h3>
        <p className={`text-[10px] ${darkMode ? 'text-slate-500' : 'text-slate-600'} truncate mt-0.5`}>{site.url.replace('https://', '').replace('www.', '')}</p>
      </div>
    </motion.div>
  );
}

function QuickCard({ site, onClick, darkMode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`w-full ${darkMode ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border-emerald-500/30 hover:border-emerald-400/50' : 'bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-300 hover:border-emerald-400'} p-4 rounded-2xl border text-left transition-all`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className={`text-xs font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'} uppercase tracking-widest mb-1`}>Most Visited</div>
          <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>{site.name}</div>
        </div>
        <Zap size={16} className={darkMode ? "text-emerald-400" : "text-emerald-600"} />
      </div>
    </motion.button>
  );
}

function TrendingCard({ site, onClick, darkMode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`min-w-[140px] ${darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-white/5 hover:border-amber-400/50' : 'bg-gradient-to-br from-slate-200 to-slate-300 border-slate-400 hover:border-amber-400'} p-4 rounded-2xl border text-left transition-all`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>{site.name}</div>
        <Flame size={14} className="text-orange-500" />
      </div>
      <div className={`text-[10px] font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>TRENDING →</div>
    </motion.button>
  );
}

function NavIcon({ icon, active = false, label, onClick, darkMode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className={`p-3 rounded-xl transition-colors ${active ? "text-amber-400 bg-amber-400/10" : darkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-600 hover:text-slate-800"}`}
      title={label}
    >
      {icon}
    </motion.button>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between hover:border-amber-400/50 transition-all"
    >
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black text-white">{value}</p>
      </div>
      <div className="text-amber-400 opacity-50">{icon}</div>
    </motion.div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-bold">{value}</span>
    </div>
  );
}
