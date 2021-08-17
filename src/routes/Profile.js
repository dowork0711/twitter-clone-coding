import { authService } from "fbInstance";
import React from "react";

const Profile = () => {
  const onLogOutClick = () => authService.signOut();
  return (
    <>
      <button onClick={onLogOutClick}>Logout</button>
    </>
  )
}

export default Profile;

/* useHistory를 사용할 때
 * const history = useHistory();
 * onLogOutClick 함수 스코프에 다음과 같이 선언
 * const onLogOutClick = () => {
 *  authService.signOut();
 *  history.push("/");
 * }
*/
