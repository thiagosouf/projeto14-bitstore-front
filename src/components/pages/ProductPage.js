import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

export default function Product() {
  const { user } = useContext(UserContext);
  console.log(user);
  const [product, setProduct] = useState([]);
  // const [data, setData]=useState({})
  const navigate = useNavigate();
  const id = useParams().id;
  console.log(id);
  // const data = {productId:id, plus:true }
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    const promise = axios.get(`http://localhost:5000/product/${id}`);
    promise.then((response) => {
      console.log(response);
      setProduct({...response.data,plus:true});
    });
  }, []);
function addToCart(id){
  // adicionar token para verificaçao
  const promise = axios.post(`http://localhost:5000/cart`, product,config)
  promise.then((response)=>{
    console.log(response);
  })
}
  return (
    <>
      <Main>
        <section>
        <h1>{product.name}</h1>
          <h2>{product.description}</h2>
          <h2>{product.price}</h2>
          <button onClick={()=>addToCart(id)}>Adicionar ao carrinho</button>
        </section>
        <Link to="/cart">ir para carrinho</Link>
      </Main>
    </>
  );
}

const Main = styled.main`
  ul {
    background-color: aqua;
  }
`;
