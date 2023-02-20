import {Router} from 'express';
import {getPost, getPosts} from '../controllers/post';

const postRoute = Router();

postRoute.get('/', getPosts).get('/:POST_SQ', getPost);

export default postRoute;
