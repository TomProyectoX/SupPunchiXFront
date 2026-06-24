const TopBar = () => {
  return (
    <div className="w-full bg-[#0a0a0a] text-[10px] md:text-xs text-center py-2 px-4 border-b border-[#262626] uppercase tracking-widest font-black text-white flex items-center justify-center gap-2">
      <span className="text-[#CCFF00]">ENVIO GRATIS A TODO EL PAÍS</span>
      <img src="https://i.imgur.com/bk5luHe.gif" alt="Argentina" className="w-10 h-auto rounded-sm" />
    </div>
  );
};

export default TopBar;