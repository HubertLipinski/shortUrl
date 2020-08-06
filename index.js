const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const path = require('path')

const app = express();
connectDB();

app.use(express.json({ extend: false }));
app.use(cors());
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
