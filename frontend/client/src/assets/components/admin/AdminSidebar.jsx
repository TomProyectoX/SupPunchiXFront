import { NavLink } from "react-router-dom";

const baseLinkClass = "flex items-center gap-4 px-4 py-3 text-sm uppercase font-semibold tracking-wide transition-colors";

function getLinkClass({ isActive }) {
  return `${baseLinkClass} ${isActive ? "text-[#CCFF00] bg-gray-800 border-l-3 border-[#CCFF00]" : "text-gray-400 hover:text-[#CCFF00]"}`;
}

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#0A0A0A] border-r border-gray-700 h-screen flex flex-col fixed left-0 top-0">

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-8 px-3">
        <ul className="space-y-1">
          {/* Orders */}
          <li>
            <NavLink to="/admin/inventory" className={getLinkClass}>
              <span className="w-5 h-5 flex items-center justify-center">▢</span>
              <span>Inventario</span>
            </NavLink>
          </li>

          {/* Products */}
          <li>
            <NavLink to="/admin/products" className={getLinkClass}>
              <span className="w-5 h-5 flex items-center justify-center">▢</span>
              <span>Productos</span>
            </NavLink>
          </li>

          {/* Catalog Configuration */}
          <li>
            <NavLink to="/admin/catalog" className={getLinkClass}>
              <span className="w-5 h-5 flex items-center justify-center">⚙</span>
              <span>Catálogo</span>
            </NavLink>
          </li>


          {/* Promos */}
          <li>
            <NavLink to="/admin/promos" className={getLinkClass}>
              <span className="w-5 h-5 flex items-center justify-center">%</span>
              <span>Promos</span>
            </NavLink>
          </li>


        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#CCFF00] flex items-center justify-center font-black text-black text-sm">
            ⚡
          </div>
          <div className="text-xs">
            <p className="text-white font-bold uppercase">Master Admin</p>
            <p className="text-gray-500 text-xs">via admin@irn.arch</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
