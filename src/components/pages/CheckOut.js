import { useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { useState } from "react";

import UserContext from '../../contexts/UserContext';

export default function CheckOut(){
    const {user} = useContext(UserContext);
    const {address} = useContext(UserContext);
    

    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');

    console.log(localStorage.getItem('token'));


    useEffect(() => {
        console.log("user do front =");
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
        console.log(address)
        if(address){
            const requisicao = axios.get('http://localhost:5000/address', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                    }
                    });
            requisicao.then(res => {
                console.log(res.data);
                setEndereco((res.data.endereco));
            }
            ).catch(err => {
                console.log(err);
            }
            )}
    }, [address]);



    return(
    // <TeladeCheckout> 
    //             <Topo>
                    (user) ? (<>
                            <h1>Olá, {user.name}!</h1>
                            <h1>Seu email: {email}</h1>
                            {(address) ? (<>TEM ENDEREÇo</>) : (<Link to="/address"><p>Cadastre seu endereço</p></Link>)
}

                            
                        </>)
                        :
                        <Link to="/login"><p>Faça Login ou crie seu Cadastro</p></Link>
                /* </Topo>
                <Produtos>

                </Produtos>
                <Entrega>
                
                </Entrega>
                <Frete></Frete>
                <Cupom></Cupom>
                <Valor></Valor>

                
            </TeladeCheckout> */
    )
}