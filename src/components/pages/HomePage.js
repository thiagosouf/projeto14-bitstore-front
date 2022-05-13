import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";
import CreateProduct from "../utilities/CreateProduct";

export default function HomePage() {
  const { user } = useContext(UserContext);
  console.log(user);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const promise = axios.get("http://localhost:5000/products");
    promise.then((response) => {
     console.log(response.data);
      setProducts(response.data);
    });
  }, []);

  console.log(products);


  if (products.length > 0) {
    return (
      <>
      <Link to="/login">ir para login</Link>
        <Main>
          <ul>
            {products.map((item, index) => (
             <CreateProduct item={item} index={index}/>
            ))}
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
