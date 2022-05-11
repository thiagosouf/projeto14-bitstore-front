import { useContext } from "react";
import { Link } from "react-router-dom"

import UserContext from '../../contexts/UserContext';

export default function HomePage(){
    const {user} = useContext(UserContext);
    console.log(user)
    return(
        <>  
            <Link to="/login"><p>Faça Login ou crie seu Cadastro</p></Link>
        </>
    )
}