import { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import logout from "../../assets/img/logout.png";
import centelha from "../../assets/img/centelha.png";
import { UserContext } from "../../context/UserContext";
import { Pages } from "../../enums/Pages";

type Props = {
  atualPage: Pages;
};

const Header = ({ atualPage }: Props) => {
  const { photoURL, name } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <img src={centelha} className={styles.stock} alt="Voltar" />
      <h1 className={styles.appTitle}>
        <strong>Magic</strong>Helper
      </h1>
      <div className={styles.nav}>
        {atualPage != Pages.SEARCH && (
          <Link to="/home" className={styles.anchor}>
            Pesquisar Carta
          </Link>
        )}
        {atualPage != Pages.COLECAO && (
          <Link to="/colecao" className={styles.anchor}>
            Minha Coleção
          </Link>
        )}
      </div>

      <img src={photoURL} className={styles.thumb} alt={name} />

      <Link to="/logout">
        <img src={logout} className={styles.logout} alt="Sair" />
      </Link>
    </header>
  );
};

export default Header;
