import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';

import MainMenu from './components/Menu.jsx';

import '../css/app.css';
import '../css/header.css';
import '../css/footer.css';
import '../css/menu.css';
import '../css/modalForm.css';
import '../css/modalGameOptions.css';
import '../css/infoPages.css';
import '../css/game.css';
import '../css/card.scss';
import '../css/recordsTables.css';

const rootElement = document.getElementById('app');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <StrictMode>
        <HashRouter>
            <App page={<MainMenu/>}></App>
        </HashRouter>
    </StrictMode>
)

