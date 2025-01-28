import styles from "./styles.module.css";
import "react-responsive-modal/styles.css";
import { Card } from "../../models/Card";

type Props = {
  card: Card;
  children?: any;
};

const CardCarta = ({ card, children }: Props) => {
  return (
    <div className={styles.carta}>
      <img
        className={styles.cardImg}
        src={card.image_uris.large}
        alt={card.name}
      />
      <span className={styles.cardName}>{card.name}</span>
      {children}
    </div>
  );
};

export default CardCarta;
