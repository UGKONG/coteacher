import {Router} from 'express';
import {deletePost, getPost, getPosts, postPost} from '../controllers/post';

const postRoute = Router();

postRoute
  .get('/', getPosts)
  .get('/:POST_SQ', getPost)
  .post('/', postPost)
  .delete('/:POST_SQ', deletePost);

export default postRoute;
