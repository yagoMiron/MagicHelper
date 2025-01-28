import { Card } from "../../models/Card";
import styles from "./styles.module.css";
import fullstar from "../../assets/img/full-star.svg";
import emptystar from "../../assets/img/empty-star.svg";
import { CardService } from "../../services/CardService";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

type Props = {
  card: Card;
};

const ModalCard = ({ card }: Props) => {
  const ehLegal = (legalidade: string) => {
    switch (legalidade) {
      case "legal":
        return <span className={styles.legal}>Legal</span>;
      case "not_legal":
        return <span className={styles.ilegal}>Ilegal</span>;
      default:
        break;
    }
  };
  const { email } = useContext(UserContext);
  const cardService = new CardService();
  const [loading, isLoading] = useState(false);
  const [isMarked, setMarked] = useState(false);
  useEffect(() => {
    (async () => {
      isLoading(true);
      const selectedCard = await cardService.findByOwnerEmailAndName(
        email,
        card.name
      );
      isLoading(false);
      setMarked(selectedCard != undefined);
    })();
  }, []);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.cardInfo}>
        <h2 className={styles.cardName}>
          {card.name}
          {!loading && isMarked ? (
            <button
              className={styles.btn}
              onClick={() => {
                setMarked(false);
                cardService.deletebyOwnerEmailAndName(email, card.name);
              }}
            >
              <img src={fullstar} alt="favorito" className={styles.fav} />
            </button>
          ) : (
            <button
              className={styles.btn}
              onClick={() => {
                setMarked(true);
                cardService.save(card, email, 1);
              }}
            >
              <img src={emptystar} alt="favorito" className={styles.fav} />
            </button>
          )}
        </h2>
        <p>
          <strong>Custo de Mana:</strong> {card.mana_cost}
          <br />
          <strong>Tipos:</strong> {card.type_line}
          <br />
          <strong>Raridade:</strong> {card.rarity}
          <br />
          <strong>Artista:</strong> {card.artist}
          <br />
          <strong>Preço:</strong> {card.prices?.usd} USD
        </p>
        <table>
          <p>
            <strong>Legalidades:</strong>
          </p>
          <tbody className={styles.legalidade}>
            <tr>
              <td>
                <div>
                  <span>standard:</span> {ehLegal(card.legalities.standard)}
                </div>
              </td>
              <td>
                <div>
                  <span>future:</span> {ehLegal(card.legalities.future)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>historic:</span> {ehLegal(card.legalities.historic)}
                </div>
              </td>
              <td>
                <div>
                  <span>timeless:</span> {ehLegal(card.legalities.timeless)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>gladiator:</span>
                  {ehLegal(card.legalities.gladiator)}
                </div>
              </td>
              <td>
                <div>
                  <span>pioneer:</span> {ehLegal(card.legalities.pioneer)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>explorer:</span> {ehLegal(card.legalities.explorer)}
                </div>
              </td>
              <td>
                <div>
                  <span>modern:</span> {ehLegal(card.legalities.modern)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>legacy:</span> {ehLegal(card.legalities.legacy)}
                </div>
              </td>
              <td>
                <div>
                  <span>pauper:</span> {ehLegal(card.legalities.pauper)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>vintage:</span> {ehLegal(card.legalities.vintage)}
                </div>
              </td>
              <td>
                <div>
                  <span>penny:</span> {ehLegal(card.legalities.penny)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>commander:</span>
                  {ehLegal(card.legalities.commander)}
                </div>
              </td>
              <td>
                <div>
                  <span>oathbreaker:</span>
                  {ehLegal(card.legalities.oathbreaker)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>standardbrawl:</span>
                  {ehLegal(card.legalities.standardbrawl)}
                </div>
              </td>
              <td>
                <div>
                  <span>brawl:</span> {ehLegal(card.legalities.brawl)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>alchemy:</span> {ehLegal(card.legalities.alchemy)}
                </div>
              </td>
              <td>
                <div>
                  <span>paupercommander:</span>
                  {ehLegal(card.legalities.paupercommander)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>duel:</span> {ehLegal(card.legalities.duel)}
                </div>
              </td>
              <td>
                <div>
                  <span>oldschool:</span>
                  {ehLegal(card.legalities.oldschool)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>premodern:</span>
                  {ehLegal(card.legalities.premodern)}
                </div>
              </td>
              <td>
                <div>
                  <span>predh:</span> {ehLegal(card.legalities.predh)}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <img
        className={styles.cardImage}
        src={card.image_uris?.large}
        alt={card.name}
      />
    </div>
  );
};

export default ModalCard;
