import { useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import styled from "styled-components"

import UserContext from '../../contexts/UserContext';

export default function CheckOut(){
    const {user} = useContext(UserContext);
    const { address, setAddress } = useContext(UserContext);
    

    const [email, setEmail] = useState('');

    const tkn = (localStorage.getItem('token'));
    console.log(tkn)

    useEffect(() => {
        console.log("user do context =");
        console.log(user)
        if(user){
            const requisicao = axios.get('http://localhost:5000/signin', {
                headers: {
                    Authorization: `${user.token}`
                    } 
                    });
            requisicao.then(res => {
                console.log(res.data);
                setEmail((res.data.email));
            }
            ).catch(err => {
                console.log(err);
            }
            )}
    }, [user]);

    useEffect(() => {
        
            const requisicao = axios.get('http://localhost:5000/address', {
                headers: {
                    Authorization: `${user.token}`
                    }
                    });
            requisicao.then(res => {
                console.log(res.data);
                setAddress((res.data));
            }
            ).catch(err => {
                console.log(err);
            }
            )
    }, []);



    return(
    <TeladeCheckout> 
                <Topo>
                    {(user) ? <>
                            <h1>Olá, {user.name}!</h1>
                            <h1>Seu email: {email}</h1>                            
                        </>
                        :
                        <Link to="/login"><p>Faça Login ou crie seu Cadastro</p></Link>}
                </Topo>
                <Titulo><p>CHECKOUT</p></Titulo>
                {/* <Produtos>

                </Produtos> */}
                <Titulo>Endereço de entrega</Titulo>
                {(address) ? 
                            
                            (<Entrega>
                                
                                <p>cep: {address.cep}</p>
                                <p>endereco: {address.endereco}</p>
                                <p>numero: {address.numero}</p>
                                <p>complemento: {address.complemento}</p>
                                <p>bairro: {address.bairro}</p>
                                <p>cidade: {address.cidade}</p>
                                <p>estado: {address.estado}</p>
                            </Entrega>
                            )                            
                
                            
                            
                            : (<Link to="/address"><p>Cadastre seu endereço</p></Link>)}
                
                {/* <Frete></Frete>
                <Cupom></Cupom>
                <Valor></Valor> */}

                
            </TeladeCheckout>
    )
}

const TeladeCheckout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    background-color: antiquewhite;
`
const Topo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    margin: 30px;
    padding-right: 30px;
`

// const Produtos = styled.div``

const Entrega = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px;
    border: 1px solid black;
    font-size: 20px;
    width: 80%;
    p{
        margin: 5px;
    }
    `
const Titulo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    font-size: 20px;
    font-weight: 700;`

// const Frete = styled.div``

// const Cupom = styled.div``

// const Valor = styled.div``