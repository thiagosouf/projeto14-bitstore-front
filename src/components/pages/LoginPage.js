import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';

export default function SignUpPage() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emaillogin, setEmailLogin] = useState('');
    const [passwordlogin, setPasswordLogin] = useState('');

    const {setUser} = useContext(UserContext);

    function login(event){
        event.preventDefault();
        
        
        const requisicao = axios.post('http://localhost:5000/login', {
            email: emaillogin,
            password: passwordlogin
        });
        

        requisicao.then(res => {
            // localStorage.setItem('token', res.data.token);
            const { token, name } = res.data;
            setUser({ token, name });
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
            navigate('/');
        });

        requisicao.catch(err => {
            alert('Erro ao realizar o cadastro');
            console.log(err);
        });
    }
        





    return(
        <>
        <h1>JÁ TENHO CADASTRO</h1>
        <form onSubmit={login}>
        {/* <form> */}
            <input type="email" placeholder="E-mail" value={emaillogin} onChange={e => setEmailLogin(e.target.value)} />
            <input type="password" placeholder="Senha" value={passwordlogin} onChange={e => setPasswordLogin(e.target.value)} />
            <button type="submit">Entrar</button>
        </form>
        <br></br>
        <br></br>
        <h1>QUERO ME CADASTRAR</h1>
        <form onSubmit={fazerCadastro}>
        {/* <form> */}
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <input type="number" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirmar senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit">Cadastrar</button>
        </form>
        </>
            );
        }