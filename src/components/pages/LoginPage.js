import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { UserContext } from "../../contexts/UserContext";

export default function SignUpPage() {
  const localUser = JSON.parse(localStorage.getItem("usuariolocal"));
  if (localUser) {
  }

  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emaillogin, setEmailLogin] = useState("");
  const [passwordlogin, setPasswordLogin] = useState("");
  const [selecionarLogin, setSelecionarLogin] = useState(false);
  const [selecionarCadastro, setSelecionarCadastro] = useState(false);

  const { user, setUser } = useContext(UserContext);

  function login(event) {
    event.preventDefault();

    const requisicao = axios.post("http://localhost:5000/login", {
      email: emaillogin,
      password: passwordlogin,
    });

    requisicao
      .then((res) => {
        const { token, name } = res.data;
        console.log(res.data);
        setUser({ token, name });
        const dados = JSON.stringify({ token, name });
        localStorage.setItem("user", dados);

        alert("Login realizado com sucesso!");
        navigate("/");
      })
      .catch((err) => {
        alert("Erro ao realizar o login");
        console.log(err);
      });
  }

  function fazerCadastro(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não conferem");
      return;
    }
    const requisicao = axios.post("http://localhost:5000/signup", {
      name: nome,
      cpf: cpf,
      email: email,
      password: password,
    });
    requisicao.then((res) => {
      alert("Cadastro realizado com sucesso");

      navigate("/login");
    });

    requisicao.catch((err) => {
      alert("Erro ao realizar o cadastro");
      console.log(err);
    });
  }

  return (
    <TeladeLogin>
      <section>
        <Formularios>
          <FormCadastro>
            <h1>QUERO ME CADASTRAR</h1>
            <Formulario onSubmit={fazerCadastro}>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="number"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Cadastrar</button>
            </Formulario>
          </FormCadastro>

          <FormLogin>
            <h1>FAZER LOGIN</h1>
            <Formulario onSubmit={login}>
              <input
                type="email"
                placeholder="E-mail"
                value={emaillogin}
                onChange={(e) => setEmailLogin(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={passwordlogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
              />
              <button type="submit">Entrar</button>
            </Formulario>
          </FormLogin>
        </Formularios>
      </section>
    </TeladeLogin>
  );
}

const TeladeLogin = styled.div`
  margin: 100px 5% 20px 5%;

  section {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
const Formularios = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const FormCadastro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5px;
  margin-top: 15px;
  padding-bottom: 20px;
  h1 {
    font-size: 20px;
    margin-bottom: 30px;
  }
  border-bottom: 1px solid rgb(230, 230, 230);
`;

const FormLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 15px;
  padding: 5px;
  padding-bottom: 15px;
  h1 {
    font-size: 20px;
    margin-bottom: 30px;
  }
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    margin-bottom: 8px;
    font-size: 20px;
    width: 100%;
    height: 35px;
    border: 1px solid rgb(230, 230, 230);
    padding-left: 5px;
    outline: 0;
  }
  button {
    font-size: 20px;
    width: 150px;
    height: 30px;
    background-color: #a0d6ef;
    height: 40px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-weight: 700;
  }
`;
