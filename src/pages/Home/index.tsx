import { useState } from "react";

import styles from "./styles.module.css";
import Header from "../../components/Header";
import { Circles } from "react-loader-spinner";
import { CardService } from "../../services/CardService";
import { BuscaDeCards } from "../../models/BuscaDeCards";
import CardCarta from "../../components/CardCarta";

const Home = () => {
  const [loading, isLoading] = useState(false);
  const [filter, setFilter] = useState("description");
  const [pesquisa, setPesquisa] = useState("");

  const [resultadoPesquisa, setResultadoPesquisa] = useState<BuscaDeCards>({
    total_cards: 0,
    has_more: false,
    data: [],
  });
  const cardService = new CardService();

  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles.pesquisa}>
          <label htmlFor="filter">Critério: </label>
          <select
            name="filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value="description">Descrição</option>
            <option value="cod">Codigo</option>
          </select>

          <label htmlFor="pesquisa">Pesquisa:</label>
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
                <CardCarta card={c} key={i} />
              ))}
            </div>
          </>
        )}

        {!loading && resultadoPesquisa.data.length === 0 && pesquisa !== "" && (
          <p>Nenhuma carta encontrada</p>
        )}
      </div>
    </>
  );
};

export default Home;
