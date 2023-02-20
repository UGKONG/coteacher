import {Router} from 'express';
import {getLanguages} from '../controllers/language';

const languageRoute = Router();

languageRoute.get('/', getLanguages);

export default languageRoute;
