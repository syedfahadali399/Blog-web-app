import { useState, useEffect } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router";
import Loader from "./Loader";
import { useContext } from "react";
import BlogSaver from "../context/BlogSaver";
import { toast } from "react-toastify";

function MainSection() {

  const categories = [
    "All",
    "Design",
    "Development",
    "Accessbility",
    "Productivity",
    "Tech",
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(categories[0]);
  const { likeBlog, setLikeBlog } = useContext(BlogSaver)

  useEffect(() => {
    const fetchData = () => {

      setLoading(true);
      if(tab === "All") {
        fetch(`https://dev.to/api/articles/latest`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => setError(`${error}, Failed to Fetch Data`));

      } else {
        fetch(`https://dev.to/api/articles?tag=${tab.toLowerCase()}&sort_by=published_at`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => setError(`${error}, Failed to Fetch Data`));
      }
      setLoading(false);
    };

    fetchData();
  }, [tab]);

  const saveLikeBlog = (newBlog) => {
  
    const findBlog = likeBlog.find((blog) => blog.id == newBlog.id)
    if(findBlog) {
        toast.error("Blog is already liked")
    } else {
        setLikeBlog(prev => [...prev, newBlog])
        toast.success("Sucessfully like Blog")
    }
   }

  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 items-center mt-12 w-full">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar w-full justify-start md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setTab(cat)}
                className={`px-5 py-2.5 rounded-full cursor-pointer text-sm font-bold whitespace-nowrap transition-all border ${
                  tab === cat
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                    : "bg-white border-slate-200 text-slate-500 hover:border-indigo-400 hover:text-indigo-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full mt-6">
            {data.map((value, index) => {
              return loading ? (
                <Loader />
              ) : (
                <div
                  key={index}
                  className="flex flex-col gap-5 items-stretch border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link
                    to={`/blog/${value.id}`}
                    className="overflow-hidden hover:cursor-pointer block aspect-video w-full shrink-0"
                  >
                    <img
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                      src={value.social_image}
                      alt=""
                    />
                  </Link>
                  <div className="flex flex-col gap-4 items-start p-6 flex-1 justify-between">
                    <div className="space-y-3 w-full">
                      <div className="flex flex-wrap gap-2 items-center text-xs text-slate-500 font-semibold">
                        <span>{value.readable_publish_date}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                        {value.tag_list && value.tag_list.length > 0 ? (
                          value.tag_list.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="text-indigo-600 uppercase tracking-wider text-[10px] bg-indigo-50 px-2 py-0.5 rounded">#{tag}</span>
                          ))
                        ) : (
                          <span>Not Known</span>
                        )}
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                        <span className="uppercase text-slate-600">{value.language || "EN"}</span>
                      </div>
                      <h2 className="text-slate-900 text-xl md:text-2xl font-bold hover:text-indigo-600 transition-colors line-clamp-2">
                        <Link to={`/blog/${value.id}`}>{value.title}</Link>
                      </h2>
                      <p className="text-slate-500 text-sm font-medium line-clamp-3">
                        {value.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-row gap-3 items-center justify-between w-full mt-4 pt-4 border-t border-slate-100">
                      <div className="flex flex-row gap-3 items-center">
                        <img
                          className="w-10 h-10 rounded-full border border-slate-100"
                          src={value.user.profile_image}
                          alt="image"
                        />
                        <Link to={`/user/${value.user.user_id}`} className="text-sm text-slate-700 font-bold hover:underline">
                          {value.user.name}
                        </Link>
                      </div>
                      <div className="flex flex-row gap-4 items-center">
                        <button onClick={() => {saveLikeBlog(value)}} className="cursor-pointer text-slate-400 hover:text-rose-500 transition-colors"><Heart size={24} /></button>
                        <Link
                          to={`/blog/${value.id}`}
                          className="hover:bg-blue-50 hover:rounded-xl p-1.5 transition-colors cursor-pointer mr-2"
                        >
                          <ArrowRight
                            className="text-blue-700 font-bold"
                            size={24}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MainSection;
