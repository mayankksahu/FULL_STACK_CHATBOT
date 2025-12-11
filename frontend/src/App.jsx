import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import About from './pages/About';

import ChatPage from './pages/Chat';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
   {
    path: '/about',
    element: <About />,    
  },

]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
