import {connect} from 'react-redux';
import {compose} from 'redux';
import {HOC} from '../../hoc';
import {Users} from "./Users";
import {
  changePage,
  changeUsersFetchingStatus,
  getCurrentPage,
  getFollowingInProgress,
  getFriendsIsFetching,
  getPageSize,
  getPagination,
  getUsers,
  toggleFollow
} from "../../../services/redux/reducer/friendsReducer";
import {useEffect, useState} from "react";
import Preloader from "../../ui/Preloader";
import c from "./Friends.module.scss";
import {Paginator} from "../../ui/Paginator";

const mapStateToProps = (state) => ({
  isFetching: getFriendsIsFetching(state),
  users: getUsers(state),
  followingInProgress: getFollowingInProgress(state),
  pageSize: getPageSize(state),
  currentPage: getCurrentPage(state),
  pagination: getPagination(state),
});

const FriendsStateless = ({
                            pagination,
                            currentPage,
                            pageSize,
                            changePage,
                            isFetching,
                            changeUsersFetchingStatus,
                            ...usersProps
                          }) => {
  const [currentPage1, setCurrentPage] = useState(1);

  useEffect(() => {
    changePage(currentPage, pageSize);
  }, [])

  useEffect(() => () => {
    changeUsersFetchingStatus(true)
  }, [])

  return (
    <section className={c.friends}>
      <div className={c.content}>
        {isFetching ? <Preloader/> : <Users {...usersProps}/>}
      </div>
      <Paginator pagination={pagination} currentPage={currentPage} changePage={changePage} pageSize={pageSize} />
    </section>
  )
};

export const Friends = compose(
  connect(mapStateToProps, {changePage, toggleFollow, changeUsersFetchingStatus}),
  HOC.withRedirect('/login'),
)(FriendsStateless);
