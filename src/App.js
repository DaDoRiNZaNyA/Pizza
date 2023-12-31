import React, { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";

import "./scss/app.scss";

export const SearchContext = createContext("");

function App() {
  return (
    <div className="wrapper">
      <Provider store={store}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </div>
  );
}

export default App;
