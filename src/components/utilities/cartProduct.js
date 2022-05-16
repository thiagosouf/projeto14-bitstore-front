import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { UserContext } from "../../contexts/UserContext";
import { FaTrash } from "react-icons/fa";

export default function CartProduct({ item, index }) {
  const [qty, setQty] = useState(item.qty);
  


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
        <form >
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
