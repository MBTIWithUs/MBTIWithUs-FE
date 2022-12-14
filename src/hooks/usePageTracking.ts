import { useLocation } from 'react-router-dom';
import RG from 'react-ga';
import { useEffect, useState } from 'react';

const usePageTracking = () => {
  const location = useLocation();
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      RG.initialize(
        process.env.REACT_APP_GATI ? process.env.REACT_APP_GATI : '',
      );
    }
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      RG.pageview(location.pathname + location.search);
    }
  }, [init, location]);
};

export default usePageTracking;
