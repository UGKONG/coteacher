import {Router} from 'express';
import {getBoard, getBoards, postBoard} from '../controllers/board';

const boardRoute = Router();

boardRoute.get('/', getBoards).get('/:BD_SQ', getBoard).post('/', postBoard);

export default boardRoute;
