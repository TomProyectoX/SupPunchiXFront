import { useLocation } from 'react-router-dom';
import ChatbotWidget from './ChatbotWidget';

const ConditionalChatbotWidget = () => {
  const location = useLocation();

  // El chatbot solo aparece en el Home, donde el carrito está oculto
  const isHomeRoute = location.pathname === '/' || location.pathname === '/home';

  if (!isHomeRoute) {
    return null;
  }

  return <ChatbotWidget />;
};

export default ConditionalChatbotWidget;
