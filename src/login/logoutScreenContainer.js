import {userLogoutAction} from '../redux/actions/userActions';
import Logout from './logout';
import { connect } from "react-redux";

function mapStateToProps(state) {

  return {
    isLoggedIn: state.userStatus.userAuthenticated
  };
}

const mapDispatchToProps = {
   logoutHandler: userLogoutAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
