import { Circles } from "react-loader-spinner";
import Header from "../../components/Header";
import { Pages } from "../../enums/Pages";
import styles from "./styles.module.css";
import CardCarta from "../../components/CardCarta";
import Modal from "react-responsive-modal";
import ModalCard from "../../components/ModalCard";
import { useState } from "react";
import { BuscaDeCards } from "../../models/BuscaDeCards";
import { Card } from "../../models/Card";

const Colecao = () => {
  const [loading, isLoading] = useState(false);
  const [showModal, shouldShowModal] = useState(false);
  const [resultadoPesquisa, setResultadoPesquisa] = useState<BuscaDeCards>({
    total_cards: 0,
    has_more: false,
    data: [],
  });
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
        {!loading && resultadoPesquisa.data.length > 0 && (
          <>
            <h1>Cartas encontradas:</h1>
            <div className={styles.listaCartas}>
              {resultadoPesquisa?.data.map((c, i) => (
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

        {!loading && resultadoPesquisa.data.length === 0 && (
          <p>Nenhuma carta na sua coleção</p>
        )}
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
