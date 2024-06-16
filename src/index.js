import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";




// import Main from './Layout/Main';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

