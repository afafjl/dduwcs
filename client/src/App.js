import { Cart } from './pages/Cart/Cart';
import { Detail } from './pages/Detail/Detail';
import { Home } from './pages/home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Shop } from './pages/Shop/Shop';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Checkout } from './pages/Checkout/Checkout';
import AuthContextProvider from './contexts/AuthContext';


function App() {
	if (!localStorage.getItem('cart')) {
		localStorage.setItem('cart', '[]');
	}
	return (
		<div className='App'>

			<AuthContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' exact element={<Home />} />
						<Route path='/register' element={<Register />} /> 	
						<Route path='/login' element={<Login />} />
						<Route path='/shop' exact element={<Shop />} />
						<Route path='/cart' element={<Cart />} /> 	
						<Route path='/detail/:id' element={<Detail />} />
						<Route path='/checkout' element={<Checkout />} />
					</Routes>
			
				</BrowserRouter>
			</AuthContextProvider>
		</div>
	);
}

export default App;
