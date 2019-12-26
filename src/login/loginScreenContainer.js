import {userLoginAction} from '../redux/actions/userActions';
import LoginScreen from './loginscreen';
import { connect } from "react-redux";

function mapStateToProps(state) {
  const val = state.userStatus.userAuthenticated;
  console.log("val is " + val);

  return {
    isLoggedIn: state.userStatus.userAuthenticated
  };
}

const mapDispatchToProps = {
   loginHandler: userLoginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
