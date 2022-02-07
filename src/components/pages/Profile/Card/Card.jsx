import c from './Card.module.scss';
import {Info} from './Info';
import {ANON_USER_AVATAR, ANON_USER_COVER, ANON_USER_STATUS} from '../../../../constants';
import {Status} from '../../../ui/Status';
import {Field} from "../../../ui/Field";
import {Image} from "../../../ui/Image";

export const Card = ({visitedProfile, authedUserId, changeAuthedUserAvatar, changeAuthedUserInfo}) => {
  const {status, photos, userId, ...userInfo} = visitedProfile;
  const isOwner = authedUserId === userId;
  const setUserPhoto = (e) => {
    if (e.target.files.length) {
      changeAuthedUserAvatar(authedUserId , e.target.files[0])
    }
  }
  return (
    <section className={c.card}>
      <Image src={ANON_USER_COVER} alt='cover' style={{padding: '0 0 25% 0', marginBottom: '10px'}} />
      <Field>
        <div className={c.box}>
          <div className={c.avatarBox}>
            <Image src={photos?.large || ANON_USER_AVATAR} style={{gridArea: 'avatar', width: '160px', height: '160px'}}/>
            {isOwner ?
              <label><input type='file' onChange={(e) => setUserPhoto(e)}/><p>Изменить аватар</p></label> : null}
          </div>
          <h1 className={c.name}>{visitedProfile.fullName}</h1>
          {isOwner ? <Status status={status}/> : <p>{status || ANON_USER_STATUS}</p>}
          <Info userInfo={userInfo} isOwner={isOwner} id={authedUserId} changeAuthedUserInfo={changeAuthedUserInfo} />
        </div>
      </Field>
    </section>
  );
}
