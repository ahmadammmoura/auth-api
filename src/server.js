const express = require('express');
const cors = require('cors');
const morgan = require('morgan');



const notFoundHandler = require('./error-handler/404');
const errorHandler = require('./error-handler/500');
const logger = require('./middleware/logger');

const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');
const authRoutes = require('./routes/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(logger);

app.get('/',(req,res)=>{
  res.status(200).json('welcome to the home page');
});
app.use(authRoutes);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);


app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};