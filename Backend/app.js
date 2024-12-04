const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
};
const checkApiKey = require('./middlewares/checkApiKey'); 

console.log(PORT);
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use('/', checkApiKey);

require("./routes.js")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});