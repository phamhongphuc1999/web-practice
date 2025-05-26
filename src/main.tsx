import '@mysten/dapp-kit/dist/index.css';
import '@peter-present/led-caro/dist/assets/style.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/ant.style.css';
import './styles/colorful-box.style.css';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
