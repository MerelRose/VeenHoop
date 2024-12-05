import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppWithRouter from './App'; // Adjust the path as necessary

ReactDOM.render(
  <BrowserRouter>
    <AppWithRouter />
  </BrowserRouter>,
  document.getElementById('root')
);