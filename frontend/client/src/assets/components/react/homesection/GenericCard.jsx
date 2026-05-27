import { Link } from "react-router-dom"

const GenericCard = ({
  name,
  image,
  link,
  height = "h-64 md:h-96",
  rounded = "rounded-[1.25rem]",
}) => {
  return (
    <Link
      to={link}
      className={`group block overflow-hidden ${rounded} border border-[#262626] bg-[#141414] transition-all duration-300 hover:border-[#CCFF00] ${height}`}
    >
      <div className="relative h-full w-full">

        {/* IMAGEN */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />

        {/* TEXTO */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-wide drop-shadow-lg text-center">
            {name}
          </h3>
        </div>

        {/* BOTON */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-90 transition-opacity duration-300 group-hover:opacity-100">
          <span className="material-symbols-outlined">
            arrow_forward
          </span>
        </div>

      </div>
    </Link>
  )
}

export default GenericCard