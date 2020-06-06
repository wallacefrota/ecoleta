// importing modules
import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

// permiting send json
app.use(express.json())
app.use(cors());
// using application
app.use('/', routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
// return erros front-end
app.use(errors());

// export application
export default app;