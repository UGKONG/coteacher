import {Router} from 'express';
import {
  deleteBoard,
  getBoard,
  getBoards,
  getMyComment,
  postBoard,
} from '../controllers/board';

const boardRoute = Router();

boardRoute
  .get('/', getBoards)
  .get('/myComment/:USER_SQ', getMyComment)
  .get('/:BD_SQ', getBoard)
  .post('/', postBoard)
  .delete('/:BD_SQ', deleteBoard);

export default boardRoute;
