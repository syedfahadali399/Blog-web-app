import { useState, useEffect } from "react"
import BlogSaver from "./BlogSaver"

function BlogSaverProvider({children}) {

    const [saveBlog, setSaveBlog] = useState(() => {
        const saved = localStorage.getItem("blog")
        return saved? JSON.parse(saved): []
    })

    const [likeBlog, setLikeBlog] = useState(() => {
        const saved = localStorage.getItem('like')
        return saved? JSON.parse(saved): []
    })

    useEffect(() => {
        localStorage.setItem("blog", JSON.stringify(saveBlog))
        localStorage.setItem("like", JSON.stringify(likeBlog))
    }, [saveBlog, likeBlog])


  return (
    <>
      <BlogSaver.Provider value={{saveBlog, setSaveBlog, likeBlog, setLikeBlog}}>
        {children}
      </BlogSaver.Provider>
    </>
  )
}

export default BlogSaverProvider
