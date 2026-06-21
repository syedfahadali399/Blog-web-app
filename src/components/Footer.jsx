import { Hash } from "lucide-react"

function Footer() {
  return (
    <>
      <footer className="bg-white border-t border-slate-200 py-16 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-slate-500">
          <div className="space-y-6 col-span-2">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Hash size={16} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Insight.
              </span>
            </div>
            <p className="max-w-xs text-sm font-medium leading-loose w-[90%]">
              Sharing the best ideas, tutorials, and insights in design and
              development since 2024.
            </p>
            <div className="flex gap-2">
              {["Twitter", "Instagram", "Github", "LinkedIn"].map((social) => (
                <button
                  key={social}
                  className="text-xs font-bold uppercase tracking-widest hover:text-indigo-600 transition-colors"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-slate-900 font-bold uppercase tracking-[0.2em] text-[10px]">
              Company
            </h4>
            <ul className="text-sm font-semibold space-y-3">
              <li className="hover:text-indigo-600 cursor-pointer">About</li>
              <li className="hover:text-indigo-600 cursor-pointer">Careers</li>
              <li className="hover:text-indigo-600 cursor-pointer">
                Newsletter
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-slate-900 font-bold uppercase tracking-[0.2em] text-[10px]">
              Resources
            </h4>
            <ul className="text-sm font-semibold space-y-3">
              <li className="hover:text-indigo-600 cursor-pointer">
                Documentation
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">
                Help Center
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">API</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-300">
          <span>© 2026 Insight Media Group</span>
          <span>Privacy • Terms • Cookies</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;