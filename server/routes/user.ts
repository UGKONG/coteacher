import {Router} from 'express';
import {putUserName} from '../controllers/user';

const userRoute = Router();

userRoute.put('/:USER_SQ', putUserName);

export default userRoute;
