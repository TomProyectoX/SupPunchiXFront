export default function SortProducts({
  ordenPrecio,
  setOrdenPrecio
}) {

  return (
    <div>
      <select
        value={ordenPrecio}
        onChange={(e) => setOrdenPrecio(e.target.value)}
        className="bg-[#141414] border border-[#262626] text-white text-xs font-black uppercase px-4 py-2 outline-none"
      >
        <option value="default">
          Destacados
          </option>
        <option value="menor-mayor">
          Menor a Mayor
          </option>
        <option value="mayor-menor">
          Mayor a Menor
          </option>
      </select>
    </div>
  )

}