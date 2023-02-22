import {Router} from 'express';
import {getBooks, postBook, deleteBook} from '../controllers/bookmark';

const bookRoute = Router();

bookRoute
  .get('/', getBooks)
  .post('/', postBook)
  .delete('/:BOOK_SQ', deleteBook);

export default bookRoute;
