import { Routes, Route } from "react-router";
import MainLayout from "./mainLayout";
import BlogDetailApp from "./components/BlogDetail/BlogDetailApp";
import BlogSaverProvider from "./context/BlogSaverProvider";
import BlogsaveLayout from "./BlogsaveLayout";
import BlogLikeLayout from "./BlogLikeLayout";
import UserDetailApp from "./components/UserDetail/UserDetailApp";

function App() {
  return (
    <>
      <BlogSaverProvider>
        <div className="bg-gray-200">
          <Routes>
            <Route path="" element={<MainLayout />} />
            <Route path="/saved" element={<BlogsaveLayout/>}/>
            <Route path="/liked" element={<BlogLikeLayout/>}/>
            <Route path="/blog/:id" element={<BlogDetailApp />} />
            <Route path="/blog/sreach/:id" element={<BlogDetailApp />} />
            <Route path="/user/:id" element={<UserDetailApp/>}/>
          </Routes>
        </div>
      </BlogSaverProvider>
    </>
  );
}

export default App;
