const LOGIN = "login/LOGIN";
const LOGOUT = "login/LOGOUT";

export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });

const initalState = {
  isLogin: false,
};

function log(state = initalState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        isLogin: (state.isLogin = true),
      };
    case LOGOUT:
      return {
        isLogin: (state.isLogin = false),
      };
    default:
      return state.isLogin;
  }
}
export default log;
