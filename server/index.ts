import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import testRoute from './routes/test';
import languageRoute from './routes/language';
import postRoute from './routes/post';
import bookRoute from './routes/bookmark';
import loginRoute from './routes/login';
import userRoute from './routes/user';
import boardRoute from './routes/board';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use('/img', express.static(__dirname + '/../assets/langIcons'));

app.use('/api/test', testRoute);
app.use('/api/language', languageRoute);
app.use('/api/post', postRoute);
app.use('/api/book', bookRoute);
app.use('/api/login', loginRoute);
app.use('/api/user', userRoute);
app.use('/api/board', boardRoute);

app.listen(port, () => console.log('React Native Server Started.'));
