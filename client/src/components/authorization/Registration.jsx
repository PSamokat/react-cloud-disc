import {useState} from 'react';
import './authorization.scss'
import Input from "../../utils/input/input";
import {registration} from "../../store/user/actions";


const Registration = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    return (
        <div className='authorization'>
            <div className="authorization__header">Регистрация</div>
            <Input value={email} setValue={setEmail} type='text' placeholder='Введите почту'/>
            <Input value={password} setValue={setPassword} type='password' placeholder='Введите пароль'/>
            <button className='authorization__button' onClick={()=> registration(email,password)}>Зарегистрироваться</button>
        </div>
    );
};

export default Registration;