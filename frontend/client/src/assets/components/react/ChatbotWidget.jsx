import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CHATBOT_URL = 'http://localhost:5174/widget';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleToggle = () => {
    if (!loaded) {
      setLoaded(true);
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-[90vw] max-w-[380px] h-[550px] bg-[#111111] border border-[#262626] rounded-2xl shadow-2xl shadow-[#CCFF00]/10 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-[#262626]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#CCFF00] text-xl">smart_toy</span>
                <p className="text-xs uppercase font-black tracking-widest text-white">Asistente Punchis</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-black border border-[#262626] flex items-center justify-center text-gray-400 hover:text-[#CCFF00] hover:border-[#CCFF00] transition"
              >
                ×
              </button>
            </div>

            {loaded && (
              <iframe
                src={CHATBOT_URL}
                title="Chatbot Punchis"
                className="w-full h-full border-none"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleToggle}
        className="fixed right-6 bottom-6 z-30 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#CCFF00] to-[#E8FF66] text-black font-black flex items-center justify-center rounded-full shadow-xl shadow-[#CCFF00]/50 hover:shadow-2xl hover:shadow-[#CCFF00]/70 active:scale-95 transition-all duration-200"
      >
        <span className="material-symbols-outlined text-black" style={{ fontSize: '30px' }}>
          {isOpen ? 'close' : 'smart_toy'}
        </span>
      </button>
    </>
  );
};

export default ChatbotWidget;
