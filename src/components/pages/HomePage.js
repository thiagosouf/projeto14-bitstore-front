import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import UserContext from "../../contexts/UserContext";

export default function HomePage() {
  const { user } = useContext(UserContext);
  console.log(user);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const promise = axios.get("http://localhost:5000/products");
    promise.then((response) => {
      setProducts(response.data);
    });
  }, []);
  if (products.length > 0) {
    return <>
    <main>
        <ul>
            {products.map((item)=>{
                return(
                    <li>
                        <h1>{item.name}</h1>
                        <h2>{item.description}</h2>
                        <h2>{item.price}</h2>
                    </li>
                )


            })}
        </ul>
    </main>
    </>;
  }else{
      return <h1>Carregando</h1>
  }
}
