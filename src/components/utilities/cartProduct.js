import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { UserContext } from "../../contexts/UserContext";
import { FaTrash } from "react-icons/fa";

export default function CartProduct({ item, index }) {
  const [qty, setQty] = useState(item.qty);
  const navigate = useNavigate()
  function editCart(e,item, qty){
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      item.newQty = qty*1
      const promise = axios.post(`http://localhost:5000/cart`, item, config);
      promise.then((response) => {
        console.log(response);
        window.location.reload();
      });
    } else {
      // ir para login(aparecer pop-up)
      navigate("/login");
    }
  }


  return (
    <li key={index}>
      <div className="product">
        <img src={item.image} alt="" />{" "}
        <div className="description">
          <h1>{item.name}</h1>
          <h2>R$ {item.price}</h2>
        </div>
      </div>
      <div className="edit-product">
        <form onSubmit={(e)=>editCart(e,item,qty)}>
          <input
            type="number"
            value={qty}
            min={1}
            onChange={(e) => setQty(e.target.value)}
          />
          <button type="submit">Alterar Quantidade</button>
        </form>
        <FaTrash />
      </div>
    </li>
  );
}
