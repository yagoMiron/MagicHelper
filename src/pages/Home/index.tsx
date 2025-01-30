import { useState } from "react";

import styles from "./styles.module.css";
import Header from "../../components/Header";
import { Circles } from "react-loader-spinner";
import { CardService } from "../../services/CardService";
import { BuscaDeCards } from "../../models/BuscaDeCards";
import CardCarta from "../../components/CardCarta";
import Modal from "react-responsive-modal";
import { Card } from "../../models/Card";
import ModalCard from "../../components/ModalCard";
import { Pages } from "../../enums/Pages";

const Home = () => {
  const [loading, isLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [showModal, shouldShowModal] = useState(false);
  const [pesquisada, setPesquisada] = useState(false);
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
    colors: [],
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

  const cardService = new CardService();

  return (
    <>
      <Header atualPage={Pages.SEARCH} />

      <div className={styles.container}>
        <div className={styles.pesquisa}>
          <input
            placeholder="Busque uma carta"
            type="text"
            name="pesquisa"
            value={pesquisa}
            onChange={(e) => {
              setPesquisa(e.target.value);
            }}
          />

          <input
            type="button"
            className={styles.searchBtn}
            value="Pesquisar"
            onClick={async () => {
              if (pesquisa) {
                isLoading(true);
                setResultadoPesquisa(await cardService.search(pesquisa));
                setPesquisada(true);
                isLoading(false);
              }
            }}
          />
        </div>
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
        {pesquisada === false && (
          <p>Pesquise por uma carta e adicione a sua coleção</p>
        )}
        {!loading &&
          resultadoPesquisa.data.length === 0 &&
          pesquisada === true && <p>Nenhuma carta encontrada</p>}
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

export default Home;
