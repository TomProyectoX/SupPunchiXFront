import { Link } from "react-router-dom"

const BrandCard = ({ name, image, link, height = "h-[220px] md:h-[260px]" }) => {
  return (
    <Link
      to={link}
      className={`block overflow-hidden rounded-[2rem] border border-[#262626] bg-[#141414] transition-all duration-300 hover:border-[#CCFF00] hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(204,255,0,0.2)] group flex flex-col`}
    >
      <div className={`${height} flex items-center justify-center p-8 flex-shrink-0 bg-black relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_70%)]" />
        <img
          src={image}
          alt={name}
          className="relative max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="px-6 py-4 border-t border-[#262626] flex items-center justify-between">
        <span className="text-sm font-black uppercase tracking-widest text-white">
          {name}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CCFF00] text-black flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1">
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </div>
      </div>
    </Link>
  )
}

export default BrandCard