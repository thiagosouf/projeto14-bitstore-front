import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


import CreateProduct from "../utilities/CreateProduct";
import Main from "../utilities/Main";
export default function HomePage() {
  const [products, setProducts] = useState([]);

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

  

