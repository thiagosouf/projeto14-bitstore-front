import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components"

import {UserContext} from '../../contexts/UserContext';
 
export default function SignUpPage() {

    const localUser = localStorage.getItem("usuariolocal")
    if(localUser){
        
    }






    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emaillogin, setEmailLogin] = useState('');
    const [passwordlogin, setPasswordLogin] = useState('');
    const [selecionarLogin, setSelecionarLogin] = useState(false);
    const [selecionarCadastro, setSelecionarCadastro] = useState(false);

    const {user, setUser} = useContext(UserContext);

    function login(event){
        event.preventDefault();
        
        
        const requisicao = axios.post('http://localhost:5000/login', {
            email: emaillogin,
            password: passwordlogin
        }); 
        
        

        requisicao.then(res => {
            const { token, name } = res.data;
            console.log(res.data);
            setUser({ token, name });
            const dados = JSON.stringify({ token,name});
            localStorage.setItem('user', JSON.stringify(dados));
            
            alert('Login realizado com sucesso!');
            navigate('/');
        }
        ).catch(err => {
            alert('Erro ao realizar o login');
            console.log(err);
        });     
    }

    function fazerCadastro(event){
        event.preventDefault();
        if(password !== confirmPassword){
            alert('As senhas não conferem');
            return;
        }
        const requisicao = axios.post('http://localhost:5000/signup', {
            name: nome,
            cpf: cpf,
            email: email,
            password: password
        });
        requisicao.then(res => {
            alert('Cadastro realizado com sucesso');

            navigate('/login');

        });

        requisicao.catch(err => {
            alert('Erro ao realizar o cadastro');
            console.log(err);
        });
    }
        




    return(
        <TeladeLogin>
            <Identificacao>
                Identificacao
            </Identificacao>
            <Formularios>
                {selecionarCadastro ?
                    <FormCadastro>
                    <h1>QUERO ME CADASTRAR</h1>
                    <Formulario onSubmit={fazerCadastro}>
                    
                        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="number" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Confirmar senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type="submit">Cadastrar</button>
                    </Formulario>
                </FormCadastro>
                :
                <FormCadastro onClick={() => setSelecionarCadastro(true)}><h1>FAZER CADASTRO</h1></FormCadastro>
                    }

                
                    
                    {(selecionarLogin)? 
                        <FormLogin>
                            <h1>FAZER LOGIN</h1>
                            <Formulario onSubmit={login}>
                        
                            <input type="email" placeholder="E-mail" value={emaillogin} onChange={e => setEmailLogin(e.target.value)} />
                            <input type="password" placeholder="Senha" value={passwordlogin} onChange={e => setPasswordLogin(e.target.value)} />
                            <button type="submit">Entrar</button>
                            </Formulario>
                        </FormLogin>
                        : 
                        <FormLogin onClick={() => setSelecionarLogin(true)}><h1>JA É CADASTRADO?</h1></FormLogin>
                        }
                
                
            </Formularios>
        </TeladeLogin>
            );
        }

const TeladeLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #fafafa;
`;
const Identificacao = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 30px;
    width: 90%;
    font-size: 30px;
    font-weight: bold;
    color: black;
`
const Formularios = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
`
const FormCadastro = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    background-color: green;
    padding: 5px;
    h1{
        font-size: 20px;
        margin-bottom: 30px;
    }
`

const FormLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    background-color: green;
    margin-top: 15px;
    padding: 5px;
    h1{
        font-size: 20px;
        margin-bottom: 30px;
    }
`

const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input{
        margin-bottom: 8px;
        font-size: 20px;
        width: 100%
    }
    button{
        font-size: 20px;
        font-weight: 700;
        width: 100%;}

`
