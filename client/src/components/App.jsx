import React, {useEffect} from "react";
import {Routes, BrowserRouter, Route, Navigate} from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Registration from "./authorization/Registration";
import './app.scss'
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../store/user/actions";
import Disk from "./disk/Disk";
import {selectAuth} from "../store/user/selectors";

function App() {
    const isAuth = useSelector(selectAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

  return (
      <BrowserRouter>
        <div className='app'>
            <Navbar/>
            <div className='wrap'>
                {!isAuth
                    ?<Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/registration' element={<Registration/>}/>
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                    :<Routes>
                        <Route path="/" element={<Disk/>}/>
                        <Route path="*" element={<Navigate to="/" />}
                        />
                    </Routes>
                }
            </div>
        </div>
      </BrowserRouter>

  )
}

export default App;