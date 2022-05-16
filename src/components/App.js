import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./../components/GlobalStyles";

import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import HeaderCreator from "./utilities/Header";
import Product from "./pages/ProductPage";

import CheckOut from "./pages/CheckOut";
import AddressPage from "./pages/AddressPage";
import AuthProvider from "../contexts/UserContext";

export default function App(){
    return(

        <AuthProvider>

             <GlobalStyles />
             <BrowserRouter>
               <HeaderCreator/>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/checkout" element={<CheckOut />} />
                    <Route path="/address" element={<AddressPage />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
