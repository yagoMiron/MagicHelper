import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

import styles from "./styles.module.css";
import centelha from "../../assets/img/centelha.png";
import { UserContext } from "../../context/UserContext";
import google from "../../assets/img/google.png";
import github from "../../assets/img/github.png"
import { auth } from "../../config/firebase";

const Login = () => {
  const [loading, isLoading] = useState(false);

  const {
    setAuthTime,
    setExp,
    setName,
    setEmail,
    setPhotoURL,
    isSessionValid,
  } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSessionValid()) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGithubLogin = () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential && auth.currentUser) {
          const { currentUser } = auth;
          const token = await currentUser.getIdTokenResult();
          const { authTime, expirationTime } = token;
          setAuthTime(new Date(authTime).getTime());
          setExp(new Date(expirationTime).getTime());
          setName(currentUser.displayName || "");
          setEmail(currentUser.email || "");
          setPhotoURL(currentUser.photoURL || "");
          navigate("/home");
        } else {
          console.log("Falha na autenticação");
        }
      })
      .catch((err) => {
        const { code, message } = err;
        console.log(code);
        console.log(message);
        isLoading(false);
      });
  };

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    isLoading(true);

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential && auth.currentUser) {
          const { currentUser } = auth;
          const token = await currentUser.getIdTokenResult();
          const { authTime, expirationTime } = token;
          setAuthTime(new Date(authTime).getTime());
          setExp(new Date(expirationTime).getTime());
          setName(currentUser.displayName || "");
          setEmail(currentUser.email || "");
          setPhotoURL(currentUser.photoURL || "");
          navigate("/home");
        } else {
          console.log("Falha na autenticação");
        }
      })
      .catch((err) => {
        const { code, message } = err;
        console.log(code);
        console.log(message);
        isLoading(false);
      });
  };

  return (
    <div className={styles.loginPanel}>
      {loading && (
        <Bars
          height="80"
          width="80"
          color="#ffa500"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}

      {!loading && (
        <>
          <div className={styles.logo}>
            <img src={centelha} className={styles.stock} alt="Voltar" />
            <h1 className={styles.appTitle}>
              <strong>Magic</strong>Helper
            </h1>
          </div>

          <button onClick={handleLogin} className={styles.btnLogin}>
            <img src={google} alt="Login com Google" />
            <span>Entrar com Google</span>
          </button>
          <button onClick={handleGithubLogin} className={styles.btnLoginGit}>
            <img src={github} alt="Login com GitHub" />
            <span>Entrar com GitHub</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
