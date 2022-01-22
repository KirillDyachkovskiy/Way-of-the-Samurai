import { ANON_USER_AVATAR } from '../../../constants';
import c from './Avatar.module.scss';

export const Avatar = ({ src, size }) => {
    return (
        <div className={c[size]}>
            <img src={src || ANON_USER_AVATAR} alt='profile' />
        </div>
    )
}
