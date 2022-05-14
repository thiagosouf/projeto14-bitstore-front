import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";


import { UserContext } from "../../contexts/UserContext";




import logo from "../../assets/logo.png";
import { GoThreeBars } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

export default function HeaderCreator() {

  const user = localStorage.getItem("user");



  console.log(user);

  if (user) {
    return (
      <Header>
        <GoThreeBars />
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>

        <div className="options">
          <Link to={"/cart"}>
            <FaShoppingCart />
          </Link>
        </div>
      </Header>
    );
  } else {
    return (
      <Header>
        <GoThreeBars />

        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>

        <div className="options">
          <Link to={"/login"}>
            <MdAccountCircle />
            <p>Login</p>
          </Link>
        </div>
      </Header>
    );
  }
}

const Header = styled.header`
  background-color: aquamarine;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  img {
    height: 50px;
  }
  svg {
    font-size: 35px;
  }
  .options {
    svg {
      font-size: 30px;
    }
  }
  a {
    text-decoration: none;
    color: #000;
    display: flex;
    align-items: center;
    text-align: center;
    line-height: 25px;

    font-weight: 400;

    p {
      padding-left: 3px;
    }
  }
`;
