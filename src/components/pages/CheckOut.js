import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

import { UserContext } from "../../contexts/UserContext";

export default function CheckOut() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { address, setAddress } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState(0);
  const [cupom, setCupom] = useState("");
  const [cupomValue, setCupomValue] = useState(true);

  const userlocal = JSON.parse(localStorage.getItem("user"));
  const tkn = userlocal.token;
  console.log(tkn);

  useEffect(() => {
    console.log("user do context =");
    console.log(user);
    if (user) {
      const requisicao = axios.get("http://localhost:5000/signin", {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      requisicao
        .then((res) => {
          console.log(res.data);
          setEmail(res.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    const requisicao = axios.get("http://localhost:5000/address", {
      headers: {
        Authorization: `${user.token}`,
      },
    });
    requisicao
      .then((res) => {
        console.log(res.data);
        setAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const requisicao = axios.get("http://localhost:5000/cart", {
      headers: {
        Authorization: `${user.token}`,
      },
    });
    requisicao
      .then((res) => {
        console.log(res.data);
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function testarCupom(event) {
    event.preventDefault();
    if (cupomValue === true) {
      if (cupom === "cupom") {
        total = total - (total * 0.1);
        setTotal(parseFloat(total.toFixed(2)));
        alert("Cupom de desconto aplicado com sucesso!");
        setCupomValue(false);
      } else {
        alert("Cupom inválido!");
      }
    } else {
      alert("Cupom já aplicado!");
    }
  }

  useEffect(() => {
    let total = 0;
    cart.map((item) => {
      total += parseFloat(item.price.replace(",", ".")) * item.qty;
    });
    setTotal(total.toFixed(2));
  }, [cart]);

  return (
    <TeladeCheckout>
      <Topo>
        {user ? (
          <>
            <h1>Olá, {user.name}!</h1>
            <h1>Seu email: {email}</h1>
          </>
        ) : (
          <Link to="/login">
            <p>Faça Login ou crie seu Cadastro</p>
          </Link>
        )}
      </Topo>
      <Titulo>
        <p>CHECKOUT</p>
      </Titulo>
      <hr width="50%"></hr>
      {cart ? (
        <Produtos>
          <Titulo>
            <p>Produtos</p>
          </Titulo>
          {cart.map((produto) => {
            return (
              <Produto>
                <>
                  <img src={produto.image} alt={produto.name} />
                </>
                <Descricao>
                  <h1>{produto.name}</h1>
                  <h2>{produto.description}</h2>
                  <h2>R$ {produto.price}</h2>
                  <h2>Quantidade: {produto.qty}</h2>
                </Descricao>
              </Produto>
            );
          })}
        </Produtos>
      ) : (
        <p>Não há produtos no carrinho</p>
      )}

      <hr width="50%"></hr>
      <Titulo>Endereço de entrega</Titulo>
      {address ? (
        <Entrega>
          <Info>
            Cep: <div>{address.cep}</div>
          </Info>
          <Info>
            Endereco: <div>{address.endereco}</div>
          </Info>
          <Info>
            Numero: <div>{address.numero}</div>
          </Info>
          <Info>
            Complemento: <div>{address.complemento}</div>
          </Info>
          <Info>
            Bairro: <div>{address.bairro}</div>
          </Info>
          <Info>
            Cidade: <div>{address.cidade}</div>
          </Info>
          <Info>
            Estado: <div>{address.estado}</div>
          </Info>
        </Entrega>
      ) : (
        <Link to="/address" className="adress-page">
          <button>Cadastre seu endereço</button>
        </Link>
      )}

      {/* <Frete></Frete> */}
      <hr width="50%"></hr>
      <Titulo>
        <p>Cupom de Desconto</p>
      </Titulo>
      <Cupom>
        <CupomInput onSubmit={testarCupom}>
          <input
            type="text"
            placeholder="Digite seu cupom"
            value={cupom}
            onChange={(e) => setCupom(e.target.value)}
          />
          <button type="submit">Aplicar</button>
        </CupomInput>
      </Cupom>
      <hr width="50%"></hr>
      <Valor>
        <h1>Valor Total: R$ {total}</h1>
        <Link to="/">
          <button onClick={() => alert("Compra finalizada com sucesso!")}>
            Finalizar Compra
          </button>
        </Link>
      </Valor>
    </TeladeCheckout>
  );
}

const TeladeCheckout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: #fff;
  .adress-page button {
    background-color: #a0d6ef;
    width: 160px;
    height: 40px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-weight: 700;
  }
`;
const Topo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  margin: 30px;
  padding-right: 30px;
`;

const Produtos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Produto = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  img {
    width: 100px;
    height: 100px;
    border: 1px solid black;
  }
  h1 {
    font-size: 20px;
    font-weight: 700;
  }
  h2 {
    font-size: 15px;
    font-weight: 400;
  }
`;
const Descricao = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 30px;
`;

const Entrega = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
  border: 1px solid black;
  font-size: 20px;
  width: 80%;
  p {
    margin: 5px;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 5px;
  width: 95%;
  height: 30px;
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: #dcdcdc;
    border: 1px solid black;
    padding-left: 5px;
    margin: 5px;
    width: 100%;
    height: 30px;
  }
`;

const Titulo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-size: 20px;
  font-weight: 700;
`;

// const Frete = styled.div``

const Cupom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  font-size: 20px;
  width: 100%;
`;
const CupomInput = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  width: 80%;
  height: 30px;
  input {
    font-size: 20px;
    width: 60%;
    height: 40px;
    padding: 5px;
  }
  button {
    font-size: 20px;
    width: 30%;
    height: 30px;
    background-color: #a0d6ef;
    height: 40px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-weight: 700;
  }
`;

const Valor = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-size: 20px;
  font-weight: 700;
  button {
    margin: 30px;
    font-size: 20px;
    width: 200px;
    height: 40px;
    background-color: #25962b;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-weight: 700;
    color: #fff;
  }
`;