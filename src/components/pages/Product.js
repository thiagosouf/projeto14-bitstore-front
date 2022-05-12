import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

export default function Product() {
  const { user } = useContext(UserContext);
  console.log(user);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    const promise = axios.get(`http://localhost:5000/product/${id}`);
    promise.then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <Main>
        <h1> aq</h1>
      </Main>
    </>
  );
}

const Main = styled.main`
  ul {
    background-color: aqua;
  }
`;
