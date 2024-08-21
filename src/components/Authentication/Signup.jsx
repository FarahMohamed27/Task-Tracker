import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css';
import Logo from '../../assets/logo-no-background.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/AuthSlice';
import { clearStatus } from '../../store/AuthSlice';

export default function Signup() {
    const dispatch = useDispatch();
    
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const status = useSelector((state) => state.Auth.status);      
    const signupError = useSelector((state) => state.Auth.error);

    useEffect(() => {
        dispatch(clearStatus());
    }, [dispatch]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignupSubmit = (e) =>{
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("passwords does not Match")
        }
        else{
            dispatch(signUp({
                email: email,
                userName: userName,
                password: password,
                phone: phone
            })) 
        }
    }
    useEffect(() => {
        if (status === 'succeeded') {
            navigate('/');
        } else if (status === 'failed') {
            setError(signupError);
        }
    }, [status, navigate, signupError]); 

    return (
        <div className="signUp-container">
        <form onSubmit={handleSignupSubmit}  className="signUp-form">
            <img src={Logo} className='signUp-logo'/>
            <h2 className='signUp-title'>SignUp</h2>
            <p className='signUp-paragraph'>Welcome To task Tracker, Please Signup</p>
            <div className='form-inputs'>
            <input
                className='form-login-input'
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='form-login-input'
                type="text"
                placeholder="UserName"
                value={userName}
                required
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                className='form-login-input'
                type="tel"
                placeholder="Phone"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                className='form-login-input'
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                minLength={8}
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                className='form-login-input'
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                minLength={8}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" className="show-password-btn" onClick={togglePasswordVisibility} > {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>} </button>
            </div>
            <button type="submit" className='form-login-btn'>SignUp</button>
            {error && <p className='signUp-error'>{error}</p>}
        </form>
        </div>
    )
}
