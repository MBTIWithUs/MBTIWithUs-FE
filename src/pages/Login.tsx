import React from 'react';

const Login = () => {
  return (
    <div>
      <a
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
          process.env.REACT_APP_KAKAOID
        }&redirect_uri=${'http://localhost:3000/oauth/kakao'}`}
      >
        kakao login
      </a>
    </div>
  );
};

export default Login;
