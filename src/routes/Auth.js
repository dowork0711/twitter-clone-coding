import { authService, firebaseInstance } from "../fbInstance";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e) => {
    const {target: {name}} = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="이메일 주소를 입력하세요"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "계정 생성하기" : "기존 계정으로 로그인"}
        />
        {error && <span>{error}</span>}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "기존 계정으로 로그인 하시겠습니까?" : "계정을 생성하시겠습니까?"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Google 계정으로 로그인
        </button>
        <button onClick={onSocialClick} name="github">
          Github 계정으로 로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
