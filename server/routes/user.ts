import {Router} from 'express';
import {deleteUser, getUsers, putUserName} from '../controllers/user';

const userRoute = Router();

userRoute
  .get('/', getUsers)
  .put('/:USER_SQ', putUserName)
  .delete('/:USER_SQ', deleteUser);

export default userRoute;
