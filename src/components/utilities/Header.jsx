import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import { UserContext } from "../../contexts/UserContext";

import logo from "../../assets/logo.png";
import { GoThreeBars } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import{CgLogOut} from "react-icons/cg"
export default function HeaderCreator() {
  const user = JSON.parse(localStorage.getItem("user"));
const navigate = useNavigate()
function logout() {
  localStorage.removeItem("user")
  navigate("/")
}



  if (user) {
    return (
      <Header>
        <CgLogOut onClick={logout}/>
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
  background-color: #a0d6ef;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  img {
    height: 50px;
  }
  svg {
    font-size: 40px;
  }
  .options {
    svg {
      font-size: 40px;
    }
  }
  a {
    text-decoration: none;
    color: #000;
    display: flex;
    align-items: center;
    text-align: center;
    line-height: 25px;
    position: relative;
    font-weight: 400;

    p {
      padding-left: 3px;
      font-weight: 700;
    }
  }
  span {
    position: absolute;
    bottom: 10px;
    right: 8px;
    line-height: 15px;
    color: #a0d6ef;
    font-weight: 700;
    font-size: 14px;
  }
`;
