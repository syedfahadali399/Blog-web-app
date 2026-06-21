import { ArrowLeft, Heart, Bookmark, Share2, MessageSquare, } from "lucide-react";
import { Link, useParams } from "react-router";
import BlogSaver from "../../context/BlogSaver";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useContext } from "react";
import Loader from "../Loader";

function BlogDetail() {

  const [data, setData] = useState([]);
  const [deepData, setDeepData] = useState([])
  const [deepData2, setDeepData2] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams();

  const { saveBlog, setSaveBlog, likeBlog, setLikeBlog } = useContext(BlogSaver);

  useEffect(() => {

    const fetchBlog = async () => {

      setLoading(true)
      fetch(`https://dev.to/api/articles/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res)
        setDeepData(res.user)
        setDeepData2(res.tags)
      })
      .catch((error) => console.log(`${error}, Failed to fetch data`));
      setLoading(false)
    }

    fetchBlog()
  }, [id]);

  const blogSaver = (newBlog) => {

    const findBlog = saveBlog.find((blog) => blog.id == newBlog.id)
    if(findBlog) {
        toast.error("Blog already saved")
    } else {
        setSaveBlog(prev => [...prev, newBlog])    
        toast.success("Successfully save Blog")
    }
  }

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
      {loading? <Loader/>:
         <article className="animate-in slide-in-from-bottom-8 duration-700 max-w-3xl mx-auto space-y-8 pb-24 mt-8 md:mt-14 px-4 sm:px-6 lg:px-8 w-full">
        <Link
          to={"/"}
          className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors group mb-8"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back to Feed
        </Link>

        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-bold uppercase tracking-[0.3em] text-indigo-500">
            {deepData2.map((value, index) => {
              return index < 3? ( 
              <span key={value} className="bg-indigo-50 px-2 py-0.5 rounded text-[10px]">#{value}</span>
              ): null
            })}
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
            <span className="ml-2">Published {data.readable_publish_date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            {data.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 border-y border-slate-100 gap-4 sm:gap-0">
            <div className="flex items-center gap-4">
              <img
                className="w-10 h-10 rounded-full"
                src={deepData.profile_image}
                alt=""
              />

              <div>
                <Link to={`/user/${deepData.user_id}`} className="font-bold text-slate-800 hover:underline">{deepData.name}</Link>
                <p className="text-xs text-slate-400">
                  Contributor • {data.reading_time_minutes} min read
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => {saveLikeBlog(data)}} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer">
                <Heart size={20} fill={`${likeBlog.find((blog) => blog.id == data.id)? "currentColor": "none"}`}/>
              </button>
              <button onClick={() => {blogSaver(data)}} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer">
                <Bookmark fill={`${saveBlog.find((blog) => blog.id == data.id)? "currentColor": "none"}`} size={20} />
              </button>
              <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-800 transition-all cursor-pointer">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={data.social_image}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-indigo max-w-none pt-8">
          <div className="space-y-6 text-slate-700 leading-loose text-lg">
            <p>{data.description}</p>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center text-center space-y-6">
          <h3 className="text-xl font-bold">Was this article helpful?</h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => {saveLikeBlog(data)}} className="flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all cursor-pointer w-full sm:w-auto">
              <Heart size={18} fill={`${likeBlog.find((blog) => blog.id == data.id)? "white": "none"}`} /> Like Article
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all cursor-pointer w-full sm:w-auto">
              <MessageSquare size={18} /> Comment
            </button>
          </div>
        </div>
      </article>
      }  
    </>
  );
}

export default BlogDetail;