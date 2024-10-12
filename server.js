const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  console.error(err.name, err.message);
  console.error('uncaughtException shuting down');
  process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');
//database
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('success coonect to database');
  });

///
const server = app.listen(process.env.port || 3000, () => {
  console.log(`app running on port ${process.env.port}`);
});

process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message);
  console.error('unhandled rejection shuting down');
  server.close(() => {
    process.exit(1);
  });
});
