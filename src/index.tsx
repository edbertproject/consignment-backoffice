import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ConfigProvider from "antd/lib/config-provider";
import idID from "antd/lib/locale/ms_MY";
import React, { useEffect } from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ReactDOM from "react-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App";
import "./i18n";
import reportWebVitals from "./reportWebVitals";
import { store } from "./stores";
import "./styles/style.less";

const publicUrl = () => process.env.PUBLIC_URL;

const themes = {
  dark: `${publicUrl()}/dark-theme.css`,
  light: `${publicUrl()}/light-theme.css`,
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Sentry.init({
//   dsn: "https://0ffcba517067424b96b0b0fbf28090b8@o1122635.ingest.sentry.io/6168442",
//   integrations: [new Integrations.BrowserTracing()],
//
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

ReactDOM.render(
  //<React.StrictMode>
  <Provider store={store}>
    <ThemeSwitcherProvider
      themeMap={themes}
      defaultTheme="light"
      insertionPoint="styles-insertion-point"
    >
      <BrowserRouter>
        <HelmetProvider>
          <Helmet>
            <title>Dashboard Consignx</title>
          </Helmet>
          <ScrollToTop />
          <ConfigProvider locale={idID}>
            <App />
          </ConfigProvider>
        </HelmetProvider>
      </BrowserRouter>
    </ThemeSwitcherProvider>
  </Provider>,
  //</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
