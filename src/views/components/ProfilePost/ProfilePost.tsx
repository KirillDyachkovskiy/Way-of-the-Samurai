import { UserPost } from '../../../data/redux/reducers/profileReducer';
import { Avatar, Cross, Field } from '../../ui';
import s from './profilePost.module.scss';

interface IPost extends UserPost {
  deletePost: (id: number) => void;
  name?: string;
  photo?: string;
}

export default function ProfilePost({
  id,
  text,
  likes,
  deletePost,
  name = 'Anonymous',
  photo,
}: IPost) {
  return (
    <Field>
      <div className={s.post}>
        <div className={s.post__deleter}>
          <Cross onClick={() => deletePost(id)} />
        </div>
        <div className={s.post__header}>
          <Avatar src={photo} />
          <h1>{name}</h1>
        </div>
        <p>{text}</p>
        <div className={s.post__footer}>
          <p className={s.post__likes}>❤ {likes}</p>
        </div>
      </div>
    </Field>
  );
}
