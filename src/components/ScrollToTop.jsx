import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component scrolls the window to the top whenever the route changes.
 * This component should be rendered inside BrowserRouter.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation(); // get pathname dari URL saat ini

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 

  return null; 
};

export default ScrollToTop;
