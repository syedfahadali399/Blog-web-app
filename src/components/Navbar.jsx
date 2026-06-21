import { Search, Hash, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import Loader from "./Loader";
import { useContext } from "react";
import BlogSaver from "../context/BlogSaver";

function Navbar() {

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { saveBlog, likeBlog } = useContext(BlogSaver);

  useEffect(() => {
    if (!query) {
      setData([]);
      return;
    }
    const fetchData = () => {
      setLoading(true);
      fetch(`https://dev.to/api/articles?tag=${query}&sort_by=published_at`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error + ",Failed to fetch data"));
      setLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to={"/"}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-indigo-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-200">
              <Hash size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              Insight<span className="text-indigo-600">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <NavLink
              to={"/"}
              className={({isActive}) => `${isActive? "text-indigo-600":"hover:text-indigo-600"} transition-colors`}
            >
              Home
            </NavLink>
            <NavLink 
              to={"/saved"}
              className={({isActive}) => `${isActive? 'text-indigo-600' : 'hover:text-indigo-600'} transition-colors flex items-center gap-2`} 
            >
              Saved <span className="bg-slate-100 px-2 py-0.5 rounded-full text-[10px]">{saveBlog.length}</span>
            </NavLink>
            <NavLink
              to={"/liked"}
              className={({isActive}) => `${isActive? 'text-indigo-600' : 'hover:text-indigo-600'} transition-colors flex items-center gap-2`}
            >
              Liked <span className="bg-slate-100 px-2 py-0.5 rounded-full text-[10px]">{likeBlog.length}</span>
            </NavLink>
          </div>

          {/* Desktop Search & User Profile */}
          <div className="hidden md:flex items-center gap-4 relative">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 w-48 focus:w-64 focus:ring-2 focus:ring-indigo-500 transition-all text-sm outline-none"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 overflow-hidden shrink-0">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="User"
              />
            </div>

            {/* Suggestions list (Desktop) */}
            {query && data.length > 0 && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-xl max-h-96 w-80 rounded-xl overflow-y-auto z-50 border border-slate-100">
                {data.map((value) => (
                  <Link
                    to={`/blog/sreach/${value.id}`}
                    key={value.id}
                    className="flex gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-none"
                    onClick={() => setQuery("")}
                  >
                    {loading ? (
                      <Loader />
                    ) : (
                      <img src={value.social_image} className="w-12 h-12 object-cover rounded-lg shrink-0" />
                    )}
                    {loading ? (
                      <Loader />
                    ) : (
                      <p className="text-xs text-slate-700 font-medium line-clamp-2">{value.title}</p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Profile & Hamburger button */}
          <div className="flex md:hidden items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="User"
              />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-100 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300">
            {/* Search Input for Mobile */}
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="bg-slate-100 border-none rounded-xl py-3 pl-10 pr-4 w-full focus:ring-2 focus:ring-indigo-500 transition-all text-sm outline-none"
              />

              {/* Suggestions list (Mobile) */}
              {query && data.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white shadow-xl max-h-64 rounded-xl overflow-y-auto z-50 border border-slate-100">
                  {data.map((value) => (
                    <Link
                      to={`/blog/sreach/${value.id}`}
                      key={value.id}
                      className="flex gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-none"
                      onClick={() => {
                        setQuery("");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {loading ? (
                        <Loader />
                      ) : (
                        <img src={value.social_image} className="w-12 h-12 object-cover rounded-lg shrink-0" />
                      )}
                      {loading ? (
                        <Loader />
                      ) : (
                        <p className="text-xs text-slate-700 font-medium line-clamp-2">{value.title}</p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile links */}
            <div className="flex flex-col gap-1 font-semibold text-slate-500">
              <NavLink
                to={"/"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({isActive}) => `${isActive? "bg-indigo-50 text-indigo-600 px-4 py-2.5 rounded-xl" : "hover:bg-slate-50 px-4 py-2.5 rounded-xl"} transition-colors`}
              >
                Home
              </NavLink>
              <NavLink 
                to={"/saved"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({isActive}) => `${isActive? "bg-indigo-50 text-indigo-600 px-4 py-2.5 rounded-xl flex items-center justify-between" : "hover:bg-slate-50 px-4 py-2.5 rounded-xl flex items-center justify-between"} transition-colors`} 
              >
                <span>Saved</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs font-medium text-slate-600">{saveBlog.length}</span>
              </NavLink>
              <NavLink
                to={"/liked"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({isActive}) => `${isActive? "bg-indigo-50 text-indigo-600 px-4 py-2.5 rounded-xl flex items-center justify-between" : "hover:bg-slate-50 px-4 py-2.5 rounded-xl flex items-center justify-between"} transition-colors`}
              >
                <span>Liked</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs font-medium text-slate-600">{likeBlog.length}</span>
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
