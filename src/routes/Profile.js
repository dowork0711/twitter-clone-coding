import React from "react";
import { authService } from "fbInstance";
import { useState } from "react";
import { useHistory } from "react-router";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);
  const onLogOutClick = async () => {
    const okay = window.confirm("로그아웃 하시겠습니까?");
    if (okay) {
      await authService.signOut();
      history.push("/");
    };
  };
  // const getMyTweet = async () => {
  //   const tweets = await dbService
  //     .collection("tweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createdAt", "desc")
  //     .get();
  //   console.log(tweets.docs.map((doc) => doc.data()));
  // };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
        photoURL: ""
      });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="닉네임을 입력하세요"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input type="submit" value="프로필 업데이트" className="formBtn" style={{ marginTop: 10 }}/>
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>로그아웃</span>
    </div>
  );
};

export default Profile;

/* useHistory를 사용할 때
 * const history = useHistory();
 * onLogOutClick 함수 스코프에 다음과 같이 선언
 * const onLogOutClick = () => {
 *  authService.signOut();
 *  history.push("/");
 * }
 */
