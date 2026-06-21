import { MapPin, LinkIcon, Clock, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Link } from "react-router"
import Loader from "../Loader"

function UserDetail() {

    const [userData, setUserData] = useState([])
    const [userAllDetail, setUserAllDetail] = useState([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            fetch(`https://dev.to/api/users/${id}`)
            .then((res) => res.json())
            .then((res) => setUserData(res))
            .catch((error) => console.log(error + ",Failed to Fetch Data"))
            setLoading(false)
        }

        fetchData()
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            fetch(`https://dev.to/api/articles?username=${userData.username}&sort_by=published_at`)
            .then((res) => res.json())
            .then((data) => setUserAllDetail(data))
            .catch((error) => console.log(error, "Failed to Fetch Data"))
            setLoading(false)
        }
        fetchData()

    }, [userData])

  return (
    <>
       {loading? <Loader/>:
           <div className="animate-in fade-in zoom-in-95 duration-500 space-y-12">
            <div className="bg-white border border-slate-200 rounded-b-[3rem] p-8 md:p-12 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-34 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10"></div>
               
               <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* <div className="relative"> */}
                    <img src={userData.profile_image} className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] bg-indigo-50 border-4 border-white shadow-xl" />
                    {/* For adding that user is online or not */}
                    {/* <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                       <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div> */}
                  {/* </div> */}

                  <div className="flex-1 text-center md:text-left space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex flex-col gap-3 items-start">
                        <h1 className="text-4xl font-black tracking-tight text-slate-900">{userData.name}</h1>
                        <p className="text-indigo-600 font-bold text-lg">{userData.username}</p>
                      </div>
                    </div>

                    <p className="text-slate-500 text-lg leading-relaxed max-w-2xl font-medium">
                      {userData.summary? userData.summary: "Not add"}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2 text-sm font-bold text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} /> {userData.location? userData.location: "Not Mention"}
                      </div>
                      <div className="flex items-center gap-2">
                        <LinkIcon size={16} /> {userData.website_url? userData.website_url: "Not add"}
                      </div>
                      <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-slate-600">
                        <Clock size={16} /> Jioned At  {userData.joined_at}
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-8 p-8">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Published Works</h2>                

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {userAllDetail.filter(p => p.id).map(blog => (
                  <article key={blog.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col group">
                    <div className="relative overflow-hidden">
                      <img src={blog.social_image} className="rounded-t-xl w-full h-full object-cover hover:scale-105 transition-transform duration-1000 hover:rounded-t-xl" />
                    </div>
                    <div className="p-6 flex flex-col flex-1 space-y-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-500">
                        <span className="text-xs">{blog.description}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>{blog.reading_time_minutes} min</span>
                      </div>
                      <h3 className="text-xl font-bold leading-snug text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {blog.title}
                      </h3>
                      <div className="pt-4 mt-auto flex items-center justify-between border-t border-slate-50">
                        <span className="text-[10px] font-bold text-slate-400">{blog.readable_publish_date}</span>
                        <Link to={`/blog/${blog.id}`}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2 font-bold text-sm"
                        >
                          Read <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
       }
    </>
  )
}

export default UserDetail