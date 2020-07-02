import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import api from './routes';

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 2244 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('assets'));
app.use(function (req, res, next) {
  res.io = io;
  next();
});
io.setMaxListeners(0);
io.on('connection', (socket) => {
  socket.on('joinEvent', (eventId) => {
    socket.join(eventId);
  });
});

dotenv.config();

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true}, (err) => {
  if (err) throw err;
  console.log('Mongoose connected!');
});

/* mongoose package configuration */
/* mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true); */

app.use('/', api);

/* io.on('connection', (socket) => {
  socket.emit("x")
  console.log('a user connected');
}); */

http.listen(PORT, () => console.log(`Server is running on ${PORT}`)); // Run server
