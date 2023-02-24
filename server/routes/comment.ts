import {Router} from 'express';
import {deleteComment, postComment} from '../controllers/comment';

const commentRoute = Router();

commentRoute.post('/:BD_SQ', postComment).delete('/:CMT_SQ', deleteComment);

export default commentRoute;
