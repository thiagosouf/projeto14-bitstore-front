import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

export default function CartPage() {
  const { user } = useContext(UserContext);
  console.log(user);

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    const promise = axios.get("http://localhost:5000/cart",config);
    promise.then((response) => {
        console.log(response);
      setCart(response.data);
    });
  }, []);


  return (
     <>
     <h1>asdasasdasdsdasad</h1>
     </>
  );
}

