import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {Toaster} from "react-hot-toast";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";


import reportWebVitals from './reportWebVitals';

// 1. Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60, // 1 hour cache
      staleTime: 1000 * 60 * 5,  // 5 mins fresh
    },
  },
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <QueryClientProvider client={queryClient}> 
      <App />
    </QueryClientProvider>
    <Toaster/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
