import {userLoginAction} from '../redux/actions/userActions';
import LoginScreen from './loginscreen';
import { connect } from "react-redux";

function mapStateToProps(state) {

  return {
    isLoggedIn: state.userStatus.userAuthenticated
  };
}

const mapDispatchToProps = {
   loginHandler: userLoginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
