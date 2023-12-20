require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.API_PORT;

app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
