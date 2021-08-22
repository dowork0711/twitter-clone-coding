import React from "react";
import { authService, firebaseInstance } from "../fbInstance";
import AuthForm from "components/AuthForm";

const Auth = () => {
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
        <AuthForm />
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
