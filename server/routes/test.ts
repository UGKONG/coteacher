import {Router} from 'express';
import {getTest} from '../controllers/test';

const testRoute = Router();

testRoute.get('/', getTest);

export default testRoute;
