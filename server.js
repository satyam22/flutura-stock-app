const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const {populateDb} = require('./server/db/populatedb');
const companyRouter = require('./server/routes/company');
const stocksRouter = require('./server/routes/stocks');
const userRouter = require('./server/routes/user');
const app = express();

app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/company', companyRouter);
app.use('/stock', stocksRouter);
app.use('/user',userRouter);

app.listen(PORT, () => console.log(`API server is running at port ${PORT}`));

// call this function to populate data from csv file to mysql database
  // populateDb();