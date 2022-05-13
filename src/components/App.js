import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState} from "react";
import GlobalStyles from "./../components/GlobalStyles";

import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import Product from "./pages/ProductPage";

import CheckOut from "./pages/CheckOut";
import AddressPage from "./pages/AddressPage";


import UserContext from "../contexts/UserContext";

export default function App(){
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    return(
        <UserContext.Provider value={{ user, setUser, address, setAddress }}>
            <BrowserRouter>
                <GlobalStyles />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/checkout" element={<CheckOut />} />
                    <Route path="/address" element={<AddressPage />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}
