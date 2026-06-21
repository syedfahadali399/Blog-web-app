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
        <div className="flex flex-col gap-6 items-center mt-12">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
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
          <div className="grid grid-cols-2 gap-8 items-center p-6 mt-6">
            {data.map((value, index) => {
              return loading ? (
                <Loader />
              ) : (
                <div
                  key={index}
                  className="flex flex-col gap-5 items-center border-2 border-gray-500 rounded-xl bg-white m-2"
                >
                  <Link
                    to={`/blog/${value.id}`}
                    className="overflow-hidden hover:cursor-pointer"
                  >
                    <img
                      className="rounded-t-xl w-full h-full object-cover hover:scale-105 transition-transform duration-1000 hover:rounded-t-xl"
                      src={value.social_image}
                      alt=""
                    />
                  </Link>
                  <div className="flex flex-col gap-6 items-start p-6 mb-3">
                    <div className="flex flex-row gap-4 items-center">
                      <h4>{value.readable_publish_date}</h4>
                      <div className="w-1 h-1 rounded-full border-2 border-gray-600 bg-gray-600"></div>
                      {value.tag_list != []? value.tag_list.map((value, index) => {
                        return index < 3 ? <p key={value}>{value}</p> : null;
                      }):<p>Not Known</p>}
                      <div className="w-1 h-1 rounded-full border-2 border-gray-600 bg-gray-600"></div>
                      <p className="uppercase">{value.language}</p>
                    </div>
                    <h1 className="text-black text-2xl font-bold">
                      {value.title}
                    </h1>
                    <p className="text-gray-400 text-base font-medium">
                      {value.description}
                    </p>
                    <div className="flex flex-row gap-3 items-center justify-between w-full mt-2">
                      <div className="flex flex-row gap-3 items-center">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={value.user.profile_image}
                          alt="image"
                        />
                        <Link to={`/user/${value.user.user_id}`} className="text-base text-black font-medium hover:underline">
                          {value.user.name}
                        </Link>
                      </div>
                      <div className="flex flex-row gap-4 items-center">
                        <button onClick={() => {saveLikeBlog(value)}} className="cursor-pointer"><Heart size={30}/></button>
                        <Link
                          to={`/blog/${value.id}`}
                          className="hover:bg-blue-200 hover:border-2 hover:border-blue-200 hover:rounded-xl hover:p-1 hover:cursor-pointer mr-2"
                        >
                          <ArrowRight
                            className="text-blue-700 font-bold"
                            size={30}
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
