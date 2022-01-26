import {useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {ANON_USER_NAME} from '../../../constants';
import {authLogOut, getData} from '../../../services/redux/reducer/authReducer';
import c from './Logout.module.scss';

const mapStateToProps = (state) => ({
  login: getData(state)?.login,
})

const LogoutForm = ({login, authLogOut}) => {
  const {handleSubmit} = useForm({
    mode: 'onBlur',
  });
  const onSubmit = () => {
    login && authLogOut();
  };
  return (
    <div className={c.loginCard}>
      <p>{login || ANON_USER_NAME}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}>
        <button className={c.logOut}>
          <div></div>
        </button>
      </form>
    </div>
  )
}

export const Logout = compose(
  connect(mapStateToProps, {authLogOut})
)(LogoutForm)