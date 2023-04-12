
import '../styles/globals.scss'
import {AppProps} from 'next/app';
import {useEffect, useState} from 'react';
// Next.js allows you to import CSS directly in .js files.
// It handles optimization and all the necessary Webpack configuration to make this work.
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SSRProvider } from 'react-bootstrap'
import axios from "axios";
config.autoAddCss = false


function App({Component, pageProps}) {

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('user');
    let authTokenJson = JSON.parse(userJson);
    const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.baseURL = BASE_URL_API;
    
    if (userJson) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + authTokenJson.token;
    } else {
        axios.defaults.headers.common["Authorization"] = null;
    }

  }, [])

  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? <Component {...pageProps} /> : null;
}

export default App