import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
const game=createRoot(document.getElementById("chart"));
game.render(<App/>);
 
