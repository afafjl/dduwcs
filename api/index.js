import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import productRouter from './routes/product.js';
import orderRouter from './routes/order.js';
import authRouter from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log('Connect db successfully');
	})
	.catch((err) => {
		console.log('Connect db failed', err);
	});

app.use(morgan('common'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
	console.log('App is running ....');
});

