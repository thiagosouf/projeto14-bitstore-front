import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

export default function CartPage() {

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const promise = axios.get("http://localhost:5000/cart", config);
      promise.then((response) => {
        console.log(response);
        setCart(response.data);
      });
    } else {
      // ir para login(aparecer pop-up)
      //
      navigate("/login");
    }
  }, []);
// carrinho vazio
  return (
    <>
      <h1>asdasasdasdsdasad</h1>
    </>
  );
}
