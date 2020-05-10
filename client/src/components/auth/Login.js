import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';


const Login = (props) => {
    const authContext = useContext(AuthContext);
    const {login, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated) props.history.push("/");
        // eslint-disable-next-lint
    }, [isAuthenticated, props.history])


    const [ user, setUser] = useState({
        email: '',
        password: ''
    });


    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    

    const onSubmit = e => {
        e.preventDefault();
        if(email === '' || password === ''){console.log("Empty field")}
        else {
            login({
                email,
                password
            });
        }
    }

    return (
        <div className='form-container'>
            <h1>
                <span className="text-primate">Logg inn</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group"> 
                    <label htmlFor="email">Email Adresse</label>
                    <input type="email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Passord</label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary brn-block"/>
            </form>
        </div>
    )
}



export default Login;