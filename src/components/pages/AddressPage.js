import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components"

import {UserContext} from '../../contexts/UserContext';

export default function AddressPage() {
    const navigate = useNavigate();
    
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)


    const handleSubmit = (e) => {
        e.preventDefault();
        const requisicao = axios.post('http://localhost:5000/address', {
            cep,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            estado
        }, {
            headers: {
                Authorization: `${user.token}`
            }
        });
        requisicao.then(res => {
            console.log(res.data);
            console.log("Endereço adicionado com sucesso!");
            navigate('/checkout');
        }
        ).catch(err => {
            console.log(err);
        }
        )
    }
    return (
        <FormCadastro>
            <h1>Selecione o endereço de entrega</h1>
            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)}/>
                <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
                <input type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)}/>
                <input type="text" placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)}/>
                <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)}/>
                <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
                <input type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)}/>
                <button type="submit">Selecionar</button>
            </Form>
        </FormCadastro>
    )
}




    const Form= styled.form`
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