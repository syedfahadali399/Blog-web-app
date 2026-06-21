import { ArrowLeft, Heart, Trash2 } from "lucide-react"
import BlogSaver from "../context/BlogSaver"
import { useContext } from "react"
import { toast } from "react-toastify"
import { Link } from "react-router"

function LikeBlog() {

    const { likeBlog, setLikeBlog } = useContext(BlogSaver)

    const deleteLikeBlog = (index) => {

        const del = likeBlog.filter((_, id) => id !== index)
        setLikeBlog(del)
        toast.success("Success Delete!")
    }

    console.log(likeBlog);
    
  return (
    <>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8 p-12">
            <div className="flex items-center gap-4 mb-10">
              <Link to={"/"}
                className="p-3 bg-white rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm text-slate-600"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 flex items-center gap-3">
                  Liked Stories <Heart size={28} className="fill-rose-500 text-rose-500" />
                </h1>
                <p className="text-slate-400 text-sm font-medium tracking-wide">{likeBlog.length} articles you loved</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {likeBlog.filter(p => p.id).map((blog, index) => (
                <div key={blog.id} className="relative group bg-white border border-slate-100 rounded-[2rem] p-5 flex gap-6 hover:shadow-xl hover:shadow-rose-500/5 transition-all border-l-4 border-l-indigo-600">
                  <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-2xl overflow-hidden relative shadow-md">
                    <img src={blog.social_image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  
                  <div className="flex flex-col justify-between py-1 flex-1">
                    <div className="space-y-2">
                       <div className="flex items-center justify-between">
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{blog.readable_publish_date}</p>
                         <div className="flex items-center gap-1 text-[10px] font-black text-rose-500">
                           <Heart size={10} fill="currentColor" /> {blog.public_reactions_count + 1}
                         </div>
                       </div>
                       <h3 className="text-lg md:text-xl font-extrabold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                         {blog.title}
                       </h3>
                       <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                         {blog.description}
                       </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                       <div className="flex items-center gap-2">
                          <img
                          className="w-10 h-10 rounded-full"
                          src={blog.user.profile_image}
                          alt=""
                        />
                         <Link to={`/user/${blog.user.user_id}`} className="text-[10px] font-black text-slate-700 uppercase tracking-tighter hover:underline">{blog.user.name}</Link>
                       </div>
                       <div className="flex items-center gap-2">
                         <button onClick={() => {deleteLikeBlog(index)}} className="cursor-pointer p-2 text-slate-300 hover:text-rose-500 transition-colors">
                           <Trash2 size={20} />
                         </button>
                        
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
    </>
  )
}

export default LikeBlog
