import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain="dev-8cw64wvajlxe1cg3.us.auth0.com"
  clientId="JpeLGJQBmOoGRLfzrcNMQvVCGPZ4D3nk"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
  useRefreshTokens={true}
  cacheLocation="localstorage"
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>
);


