import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState} from "react";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import UserContext from "../contexts/UserContext";

export default function App(){
    const [user, setUser] = useState(null);
    return(
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/product/:id" element={<Product />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}
