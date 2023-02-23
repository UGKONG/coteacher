import {Router} from 'express';
import {getBoard, getBoards} from '../controllers/board';

const boardRoute = Router();

boardRoute.get('/', getBoards).get('/:BD_SQ', getBoard);

export default boardRoute;
