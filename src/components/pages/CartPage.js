import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import CartProduct from "../utilities/cartProduct";
import UserContext from "../../contexts/UserContext";

import { FaShoppingCart } from "react-icons/fa";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const promise = axios.get("http://localhost:5000/cart", config);
      promise.then((response) => {
        console.log(response);
        let priceTotal = 0;
        response.data.map((item) => {
          let price = item.qty * parseFloat(item.price.replace(",", "."));
          priceTotal += price;
        });
        setCart(response.data);
        setTotal(priceTotal.toFixed(2));
      });
    } else {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, []);

  if (cart.length > 0) {
    return (
      <Main>
        <section>
          <ul>
            {cart.map((item, index) => (
              <CartProduct item={item} index={index} setTotal={setTotal} />
            ))}
          </ul>
          <div className="total">
              <h5>Total</h5>
              <h6>R$ {total.toString().replace(".",",")}</h6>
          </div>
        </section>
        <button onClick={()=>navigate("/checkout")} className="checkout-button">Pagamento</button>
      </Main>
    );
  } else {
    return (
      <Main>
        <div className="empty">
          <FaShoppingCart className="cart" />
          <h4>Carrinho vazio</h4>
        </div>
      </Main>
    );
  }
}

const Main = styled.main`
  margin: 100px 5% 20px 5%;
  display: flex;
  flex-direction: column;
  section {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);
    padding: 5px;
  }
  img {
    width: 150px;
    height: 150px;
  }
  h1 {
    font-size: 15px;
    margin-bottom: 10px;
  }
  h2 {
    color: #25962b;
    font-size: 25px;
    margin-bottom: 10px;
  }
  h3 {
    font-weight: 400;
    margin-top: 10px;
  }
  h4 {
    color: #9e9e9e;
    font-size: 30px;
  }
  .total{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }
  h5{
    font-size: 25px;
  }
  h6{
    font-size: 25px;
    color: #25962b;
  }
  .cart {
    font-size: 100px;
    color: #9e9e9e;
  }
  .checkout-button{
    width: 200px;
    height: 60px;
    align-self: center;
    margin-top: 20px;
    font-size: 25px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .empty {
    padding-top: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  button {
    border: none;
    background-color: #25962b;
    color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    margin-bottom: 10px;
    width: 96px;
    height: 32px;
    border-radius: 5px;
    margin-left: 10px;
  }
  .product {
    display: flex;
  }
  .description {
  }
  .edit-product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  form {
    display: flex;
  }
  input {
    width: 96px;
    height: 32px;
    text-align: center;
  }
`;
