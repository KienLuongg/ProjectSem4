import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { store } from './redux/store';
import App from './App';
import './style/mainStyle.css';
import './index.css';
import './satoshi.css';

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap your App component with Provider and pass the store */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
