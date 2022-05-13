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
            const requisicao = axios.get('http://localhost:5001/signin', {
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
        
            const requisicao = axios.get('http://localhost:5001/address', {
                headers: {
                    Authorization: `${user.token}`
                    }
                    });
            requisicao.then(res => {
                console.log(res.data);
                setAddress((res.data.endereco));
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
                {/* <Produtos>

                </Produtos> */}
                <Entrega>
                {(address) ? 
                            
                            (<>Endereço de Entrega: {address}</>) 
                            
                            
                            : (<Link to="/address"><p>Cadastre seu endereço</p></Link>)}
                </Entrega>
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
`
const Topo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

// const Produtos = styled.div``

const Entrega = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

// const Frete = styled.div``

// const Cupom = styled.div``

// const Valor = styled.div``