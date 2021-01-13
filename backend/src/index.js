const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const app = express();

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log(`connected to ${db.connection.host}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/users/', userRoutes);
app.use('/api/messages/', messageRoutes);

app.listen(4000, () => {
  console.log('listening on 4000');
});

module.exports = app;
