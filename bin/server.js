const mongoose = require('mongoose')
const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    console.log(DB_HOST);
    console.log(`Listen port - ${PORT}`);
    app.listen(PORT);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })
