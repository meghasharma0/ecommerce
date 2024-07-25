// packages
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// utilities
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes')

dotenv.config();
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello Backend');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));