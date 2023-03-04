import {Router} from 'express';
import {
  deletePost,
  getPost,
  getPosts,
  postPost,
  putPost,
} from '../controllers/post';

const postRoute = Router();

postRoute
  .get('/', getPosts)
  .get('/:POST_SQ', getPost)
  .post('/', postPost)
  .put('/:POST_SQ', putPost)
  .delete('/:POST_SQ', deletePost);

export default postRoute;
