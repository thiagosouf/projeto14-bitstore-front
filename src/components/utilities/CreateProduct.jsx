import { Link } from "react-router-dom";

export default function CreateProduct({ item, index }) {
 
  return (
    <Link to={`/product/${item._id}`}>
      <li key={index}>
        <img src={item.image} alt="" />
        <div className="description">
          <h1>{item.name}</h1>
          <h2>R$ {item.price}<span> à vista no PIX</span></h2>
        </div>
      </li>
    </Link>
  );
}
