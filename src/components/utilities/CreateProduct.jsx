import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

export default function CreateProduct({ item, index }) {
  const { user } = useContext(UserContext);
  console.log(user);
  console.log(item);
  //   const [products, setProducts] = useState([]);
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     const promise = axios.get("http://localhost:5000/products");
  //     promise.then((response) => {
  //       setProducts(response.data);
  //     });
  //   }, []);

  return (
    <Link to={`/product/${item._id}`}>
      <li key={index}>
        <img src={item.image} alt="" />
        <div className="description">
          <h1>{item.name}</h1>
          <h2>{item.price}</h2>
        </div>
      </li>
    </Link>
  );
}
