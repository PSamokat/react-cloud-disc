import  {useState} from 'react';
import './authorization.scss'
import Input from "../../utils/input/input";
import {useDispatch} from "react-redux";
import {login} from "../../store/user/actions";


const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    return (
        <div className='authorization'>
            <div className="authorization__header">Логин</div>
            <Input value={email} setValue={setEmail} type='text' placeholder='Введите почту'/>
            <Input value={password} setValue={setPassword} type='password' placeholder='Введите пароль'/>
            <button className='authorization__button' onClick={()=> dispatch(login(email,password))}>Войти</button>
        </div>
    );
};

export default Login;