import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import MainPage from "./containers/MainPage/MainPage";
import Account from "./containers/Account/Account";
import AddToCart from "./containers/AddToCart/AddToCart";
import Edit from "./containers/Edit/Edit";
import Catalog from "./containers/Catalog/Catalog";
import Favourites from "./containers/Favourites/Favourites";
import MyOrder from "./containers/MyOrder/MyOrder";
import OrderMaking from "./containers/OrderMaking/OrderMaking";
import Product from "./containers/Product/Product";
import Admin from "./containers/Admin/Admin";
import AdminRoute from "./router/AdminRoute";
import PublicRoute from "./router/PublicRoute";
import NotFound from "./containers/NotFound/NotFound";
import "antd/dist/antd.min.css";
import "./assets/styles/style.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute component={<MainPage />} />} />

          <Route
            path="/account"
            element={<PrivateRoute component={<Account />} />}
          />
          <Route
            path="/cart"
            element={<PrivateRoute component={<AddToCart />} />}
          />
          <Route
            path="/catalog"
            element={<PublicRoute component={<Catalog />} />}
          />
          <Route path="/edit" element={<PrivateRoute component={<Edit />} />} />
          <Route
            path="/favourites"
            element={<PrivateRoute component={<Favourites />} />}
          />
          <Route
            path="/myorder"
            element={<PrivateRoute component={<MyOrder />} />}
          />
          <Route
            path="/ordermaking"
            element={<PrivateRoute component={<OrderMaking />} />}
          />
          <Route
            path="/product/:id"
            element={<PublicRoute component={<Product />} />}
          />
          <Route path="/admin" element={<AdminRoute component={<Admin />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
