import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const KakaoRedirect = () => {
  const { search } = useLocation();

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      console.log();
    }
  };

  useEffect(() => {
    confirmLogin();
  }, []);

  return <div>confirm</div>;
};

export default KakaoRedirect;
