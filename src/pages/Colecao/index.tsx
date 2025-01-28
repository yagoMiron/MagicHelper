import { Circles } from "react-loader-spinner";
import Header from "../../components/Header";
import { Pages } from "../../enums/Pages";
import styles from "./styles.module.css";
import CardCarta from "../../components/CardCarta";
import Modal from "react-responsive-modal";
import ModalCard from "../../components/ModalCard";
import { useContext, useEffect, useState } from "react";
import { Card } from "../../models/Card";
import { CardService } from "../../services/CardService";
import { UserContext } from "../../context/UserContext";

const Colecao = () => {
  const [loading, isLoading] = useState(false);
  const [showModal, shouldShowModal] = useState(false);
  const [colecao, setColecao] = useState<Card[]>([]);
  const [selectedCard, selectCard] = useState<Card>({
    name: "",
    image_uris: {
      small: "",
      large: "",
    },
    prices: {
      usd: 0.0,
    },
    artist: "",
    mana_cost: "0",
    rarity: "commun",
    type_line: "",
    legalities: {
      alchemy: "not_legal",
      brawl: "not_legal",
      commander: "not_legal",
      duel: "not_legal",
      explorer: "not_legal",
      future: "not_legal",
      gladiator: "not_legal",
      historic: "not_legal",
      legacy: "not_legal",
      modern: "not_legal",
      oathbreaker: "not_legal",
      oldschool: "not_legal",
      pauper: "not_legal",
      paupercommander: "not_legal",
      penny: "not_legal",
      pioneer: "not_legal",
      predh: "not_legal",
      premodern: "not_legal",
      standard: "not_legal",
      standardbrawl: "not_legal",
      timeless: "not_legal",
      vintage: "not_legal",
    },
  });
  const { email } = useContext(UserContext);
  const cardService = new CardService();
  useEffect(() => {
    (async () => {
      isLoading(true);
      const collection = await cardService.findAllByOwner(email);
      isLoading(false);
      setColecao(collection);
    })();
  }, []);
  return (
    <>
      <Header atualPage={Pages.COLECAO} />
      <div className={styles.container}>
        <Circles
          height="80"
          width="80"
          color="#fff"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={loading}
        />
        {!loading && colecao.length > 0 && (
          <>
            <h1>Sua Coleção:</h1>
            <div className={styles.listaCartas}>
              {colecao.map((c, i) => (
                <button
                  key={i}
                  className={styles.resetedBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    selectCard(c);
                    shouldShowModal(true);
                  }}
                >
                  <CardCarta card={c} />
                </button>
              ))}
            </div>
          </>
        )}

        {!loading && colecao.length === 0 && <p>Sua coleção está vazia</p>}
      </div>
      <Modal
        open={showModal}
        onClose={() => shouldShowModal(false)}
        center
        classNames={{
          modal: "customModal",
        }}
      >
        <ModalCard card={selectedCard} />
      </Modal>
    </>
  );
};
export default Colecao;
