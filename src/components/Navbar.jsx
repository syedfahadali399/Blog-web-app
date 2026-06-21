import { Search, Hash } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import Loader from "./Loader";
import { useContext } from "react";
import BlogSaver from "../context/BlogSaver";

function Navbar() {

  const [query, setQuery] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { saveBlog, likeBlog } = useContext(BlogSaver)

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
        <div className="max-w-7xl mx-auto flex items-start justify-between h-9">
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

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500 mt-2">
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

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center">
              <div className="relative hidden sm:block">
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
              <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="User"
                />
              </div>
            </div>
            <div
              className={`bg-white shadow-lg max-h-96 w-full mt-4 rounded-xl overflow-y-auto ${data.length == 0 ? "hidden" : "block"} `}
            >
              {data.map((value) => (
                <Link
                  to={`/blog/sreach/${value.id}`}
                  key={value.id}
                  className="flex gap-3 p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    <img src={value.social_image} className="w-15" />
                  )}
                  {loading ? (
                    <Loader />
                  ) : (
                    <p className="text-base text-black w-55">{value.title}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
