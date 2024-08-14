const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const routes = require('./routes');
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
