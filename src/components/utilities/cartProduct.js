import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaTrash } from "react-icons/fa";

export default function CartProduct({ item, index }) {
  const [qty, setQty] = useState(item.qty);
  const navigate = useNavigate()

  function editCart(e, item, qty) {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      item.newQty = qty * 1
      const promise = axios.post(`https://project14-bitstore.herokuapp.com/cart`, item, config);
      promise.then((response) => {
        window.location.reload();
      });
    } else {
      navigate("/login");
    }
  }
  function deleteProduct(e, id) {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const promise = axios.put(`https://project14-bitstore.herokuapp.com/cart`, { id }, config);
      promise.then((response) => {
        window.location.reload();
      });
    } else {
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
        <form onSubmit={(e) => editCart(e, item, qty)}>
          <input
            type="number"
            value={qty}
            min={1}
            onChange={(e) => setQty(e.target.value)}
          />
          <button type="submit">Alterar Quantidade</button>
        </form>
        <FaTrash onClick={(e) => deleteProduct(e, item._id)} />
      </div>
    </li>
  );
}
