import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

export default function HomePage() {
  const { user } = useContext(UserContext);
  console.log(user);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const promise = axios.get("http://localhost:5000/products");
    promise.then((response) => {
      setProducts(response.data);
    });
  }, []);
  function goToProduct(name) {}
  if (products.length > 0) {
    return (
      <>
        <Main>
          <ul>
            {products.map((item, index) => {
              return (
                <Link to={`/product/${item._id}`}>
                  <li key={index}>
                    <h1>{item.name}</h1>
                    <h2>{item.description}</h2>
                    <h2>{item.price}</h2>
                  </li>
                </Link>
              );
            })}
          </ul>
        </Main>
      </>
    );
  } else {
    return <h1>Carregando</h1>;
  }
}

const Main = styled.main`
  ul {
    background-color: aqua;
  }
`;
