import Navigation from './navigation';
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userStatus.userAuthenticated,
    isOnLoginScreen: false
  };
}

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
