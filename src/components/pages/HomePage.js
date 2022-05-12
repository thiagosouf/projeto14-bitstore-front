import { useContext } from "react";
import { Link } from "react-router-dom"

// import UserContext from '../../contexts/UserContext';

export default function HomePage(){
    // const {user} = useContext(UserContext);
    
    const dados = JSON.parse(localStorage.getItem('usuarioLocal'));
    console.log(dados)

    // console.log(user)
    return(
        (dados) ? (<>
                    <h1>Bem Vindo(a)!!</h1>
                </>)
        :
        <>  
            <Link to="/login"><p>Faça Login ou crie seu Cadastro</p></Link>
        </>
    )
}