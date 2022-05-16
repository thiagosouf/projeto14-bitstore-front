import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { MdAddShoppingCart } from "react-icons/md";

import { UserContext } from "../../contexts/UserContext";

export default function Product() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const id = useParams().id;
  console.log(id);
  
  useEffect(() => {
    const promise = axios.get(`http://localhost:5000/product/${id}`);
    promise.then((response) => {
      console.log(response);
      setProduct({ ...response.data, plus: true });
    });
  }, []);

  function addToCart(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const promise = axios.post(`http://localhost:5000/cart`, product, config);
      promise.then((response) => {
        console.log(response);
        navigate("/cart")
      });
    } else {
      alert("Você precisa estar logado!")
      navigate("/login");
    }
  }
  return (
    <>
      <Main>
        <section>
          <img src={product.image} alt="" />
          <div className="description">
            <h1>{product.name}</h1>
            <h2>R$ {product.price}</h2>
          </div>

          <button onClick={() => addToCart(id)}>
            <MdAddShoppingCart />
            <span> Adicionar ao carrinho</span>
          </button>

          <div className="description">
            <h1>Descrição:</h1>
            <h3>{product.description}</h3>
          </div>
        </section>
      </Main>
    </>
  );
}

const Main = styled.main`
  margin: 100px 5% 20px 5%;

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
  img {
    width: 200px;
    height: 200px;
  }
  h1 {
    font-size: 23px;
    margin-bottom: 10px;
  }
  h2 {
    color: #25962b;
    font-size: 35px;
    margin-bottom: 10px;
  }
  h3 {
    font-weight: 400;
    margin-top: 10px;
  }
  button {
    border: none;
    background-color: #25962b;
    color:#fff;
    display: flex;
    justify-content: space-around;
    align-items:center ;
    font-size: 18px;
    margin-bottom: 10px;
    width: 220px;
    height: 50px;
    border-radius: 5px;
    svg{
      font-size: 22px;
    }
  }
`;
