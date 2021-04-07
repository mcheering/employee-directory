import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
ReactDOM.render(<Application />, document.getElementById('root'));
serviceWorker.unregister();