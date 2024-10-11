import '@peter-present/led-caro/dist/assets/style.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './styles/ant.style.css';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
