import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
const app = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
