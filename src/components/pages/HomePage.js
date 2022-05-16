import { useEffect, useState } from "react";
import axios from "axios";

import CreateProduct from "../utilities/CreateProduct";
import Main from "../utilities/Main";
export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const promise = axios.get("http://localhost:5000/products");
    promise.then((response) => {
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

  

