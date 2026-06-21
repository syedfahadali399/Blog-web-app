import { ArrowLeft, ChevronRight } from "lucide-react"
import BlogSaver from "../context/BlogSaver"
import { useContext } from "react"
import { Link } from "react-router"
import { toast } from "react-toastify"

function SaveBlog() {

  const { saveBlog, setSaveBlog } = useContext(BlogSaver)

  const deleteBlog = (index) => {
    const del = saveBlog.filter((_, id) => id !== index)
    setSaveBlog(del)
    toast.success("Sucessfully Delete!")
  }
  
  return (
    <>
       <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8 p-4 sm:p-8 md:p-12 max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-10">
              <Link to={"/"}
                className="p-3 bg-white rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-3xl font-black italic uppercase tracking-tighter">Your Library</h1>
                <p className="text-slate-400 text-sm font-medium tracking-wide">{saveBlog.length} stories saved for later</p>
              </div>
            </div>

            <div className="grid gap-6">
              {saveBlog.filter(p => p.id).map((blog, index) => (
                <div key={blog.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 bg-white border border-slate-200 rounded-3xl hover:border-indigo-200 transition-all group">
                   <img src={blog.social_image} className="w-full h-48 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl object-cover shrink-0 shadow-sm" />
                   <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                      <div>
                        <div className="flex flex-wrap items-start gap-2 mb-2">
                          {blog.tags.map((value, index) => {
                            return index < 3? (
                              <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider mb-1" key={index}>#{value}</span>
                            ): null
                          })}                     
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 truncate group-hover:text-indigo-600 transition-colors">{blog.title}</h3>
                        <p className="text-sm text-slate-400 line-clamp-2 hidden md:block mb-4">{blog.description}</p>
                      </div>
                      <div className="flex items-center gap-6 mt-4 sm:mt-auto">
                        <Link to={`/blog/${blog.id}`} className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                          Read Now <ChevronRight size={14}/>
                        </Link>
                        <button onClick={() => {deleteBlog(index)}} className="text-[10px] font-bold text-rose-400 hover:text-rose-600 transition-colors uppercase cursor-pointer">Remove</button>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
    </>
  )
}

export default SaveBlog
