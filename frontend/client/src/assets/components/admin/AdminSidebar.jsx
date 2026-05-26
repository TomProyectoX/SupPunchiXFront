import { NavLink } from "react-router-dom";

const baseLinkClass = "flex items-center gap-4 px-4 py-3 text-sm uppercase font-semibold tracking-wide transition-colors";

function getLinkClass({ isActive }) {
  return `${baseLinkClass} ${isActive ? "text-[#CCFF00] bg-gray-800 border-l-3 border-[#CCFF00]" : "text-gray-400 hover:text-[#CCFF00]"}`;
}

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#0A0A0A] border-r border-gray-700 h-screen flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-black text-[#CCFF00] uppercase tracking-widest">
          IRON ARCH
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-wider">Elite Admin</p>
      </div>

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
              <span>Products</span>
            </NavLink>
          </li>

          {/* Catalog Configuration */}
          <li>
            <NavLink to="/admin/catalog" className={getLinkClass}>
              <span className="w-5 h-5 flex items-center justify-center">⚙</span>
              <span>Catálogo</span>
            </NavLink>
          </li>

          {/* Customers */}
          <li>
            <div className="flex items-center gap-4 px-4 py-3 text-gray-600 text-sm uppercase font-semibold tracking-wide cursor-default">
              <span className="w-5 h-5 flex items-center justify-center">◉</span>
              <span>Customers</span>
            </div>
          </li>

          {/* Settings */}
          <li>
            <div className="flex items-center gap-4 px-4 py-3 text-gray-600 text-sm uppercase font-semibold tracking-wide cursor-default">
              <span className="w-5 h-5 flex items-center justify-center">⚙</span>
              <span>Settings</span>
            </div>
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
