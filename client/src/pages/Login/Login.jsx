import './Login.scss';
import { Person } from '@mui/icons-material';
import HttpsIcon from '@mui/icons-material/Https';
import ErrorIcon from '@mui/icons-material/Error';
import { useRef } from 'react';
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { toast, ToastContainer } from 'react-toastify';
import  { useNavigate } from 'react-router-dom'

const Login = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { loginUser } = useContext(AuthContext)

	const username = useRef('');
	const password = useRef('');

	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})
	const navigate = useNavigate();

	// const { username, password } = loginForm
	const onChangeLoginForm = event =>{
		// console.log(loginForm );
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!username.current.value) {
			document.querySelector('.error.username-error').style.visibility =
				'visible';
		} else {
			document.querySelector('.error.username-error').style.visibility =
				'hidden';
		}
		if (!password.current.value) {
			document.querySelector('.error.password-error').style.visibility =
				'visible';
		} else {
			document.querySelector('.error.password-error').style.visibility =
				'hidden';
		}

		if (
			!username.current.value ||
			!password.current.value
		) {
			toast.error('Vui lòng điền đầy đủ thông tin.');
		} else {

			try {
				const loginData = await loginUser(loginForm)
				if (!loginData.success) {
					// AlertMessage({ type: 'danger', message: loginData.message })
					// setTimeout(() => AlertMessage(null), 5000)
					toast.error(loginData.message);
				}
				else{
					toast.error(loginData.message);

					navigate('/');
				}
			} catch (error) {
				console.log(error)
			}
		}
	};

	return (
		<div
			className='wrapper'
			style={{ backgroundImage: `url(${PF + '/background.png'})` }}>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
			<div className='main'>
				<form action='post' className='form'  >
					<span className='title'>Login</span>
					<div className='wrap-input'>
						<span className='label'>Username</span>
						<div className='input-field'>
							<Person className='icon' />
							<input
								type='text'
								name='username'
								placeholder='Type your username'
								className='input'
								ref={username}
								onChange={onChangeLoginForm}
							/>
							<div className='error username-error'>
								<span className='log'>
									Username is required
								</span>
								<ErrorIcon className='err-icon' />
							</div>
						</div>
					</div>
					<div className='wrap-input'>
						<span className='label'>Password</span>
						<div className='input-field'>
							<HttpsIcon className='icon' />
							<input
								type='password'
								name='password'
								placeholder='Type your username'
								className='input'
								ref={password}
								onChange={onChangeLoginForm}
							/>
							<div className='error password-error'>
								<span className='log'>
									Password is required
								</span>
								<ErrorIcon className='err-icon' />
							</div>
						</div>
					</div>
					<div className='forgot-pass'>
						<span>Forgot password?</span>
					</div>
					<div className='btn-container'>
						<div className='wrap-btn'>
							<div className='btn-bg'></div>
							<button onClick={(e) => handleSubmit(e)}>
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
