import { Circles } from "react-loader-spinner";
import styles from "./styles.module.css";
import Header from "../../components/Header";
import { Pages } from "../../enums/Pages";
import { useContext, useEffect, useState } from "react";
import type {} from "@mui/x-charts/themeAugmentation";
import { BarChart, PieChart } from "@mui/x-charts";
import { CardService } from "../../services/CardService";
import { UserContext } from "../../context/UserContext";

const Estatisticas = () => {
  const [loading, isLoading] = useState(true);

  const [dataQtd, setQtd] = useState(0);
  const [dataDiferentCard, setDiferentCard] = useState(0);
  const [dataTotalPrice, setPrice] = useState(0);
  const [dataCardRarity, setRarity] = useState({
    comum: 0,
    incomum: 0,
    rara: 0,
    miticoRara: 0,
  });
  const [dataCores, setCores] = useState({
    branco: 0,
    azul: 0,
    preto: 0,
    vermelho: 0,
    verde: 0,
  });
  const [dataLegalities, setLegalities] = useState<any>();

  const cardService = new CardService();
  const { email } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      isLoading(true);
      const collection = await cardService.findAllByOwner(email);
      let cardQtd = 0;
      let diferentCard = 0;
      let totalPrice = 0;
      let comum = 0;
      let incomum = 0;
      let rara = 0;
      let miticoRara = 0;
      let branco = 0;
      let azul = 0;
      let preto = 0;
      let vermelho = 0;
      let verde = 0;
      let legalities = [
        {
          format: "alchemy",
          legalCards: 0,
        },
        {
          format: "brawl",
          legalCards: 0,
        },
        {
          format: "commander",
          legalCards: 0,
        },
        {
          format: "duel",
          legalCards: 0,
        },
        {
          format: "explorer",
          legalCards: 0,
        },
        {
          format: "future",
          legalCards: 0,
        },
        {
          format: "gladiator",
          legalCards: 0,
        },
        {
          format: "historic",
          legalCards: 0,
        },
        {
          format: "legacy",
          legalCards: 0,
        },
        {
          format: "modern",
          legalCards: 0,
        },
        {
          format: "oathbreaker",
          legalCards: 0,
        },
        {
          format: "oldschool",
          legalCards: 0,
        },
        {
          format: "pauper",
          legalCards: 0,
        },
        {
          format: "paupercommander",
          legalCards: 0,
        },
        {
          format: "penny",
          legalCards: 0,
        },
        {
          format: "pioneer",
          legalCards: 0,
        },
        {
          format: "predh",
          legalCards: 0,
        },
        {
          format: "premodern",
          legalCards: 0,
        },
        {
          format: "standard",
          legalCards: 0,
        },
        {
          format: "standardbraw",
          legalCards: 0,
        },
        {
          format: "timeless",
          legalCards: 0,
        },
        {
          format: "vintage",
          legalCards: 0,
        },
      ];
      collection.forEach((cr) => {
        cardQtd += cr.qtd;
        diferentCard += cr.qtd > 0 ? 1 : 0;
        legalities[0].legalCards +=
          cr.card.legalities.alchemy == "legal" ? cr.qtd : 0;
        legalities[1].legalCards +=
          cr.card.legalities.brawl == "legal" ? cr.qtd : 0;
        legalities[2].legalCards +=
          cr.card.legalities.commander == "legal" ? cr.qtd : 0;
        legalities[3].legalCards +=
          cr.card.legalities.duel == "legal" ? cr.qtd : 0;
        legalities[4].legalCards +=
          cr.card.legalities.explorer == "legal" ? cr.qtd : 0;
        legalities[5].legalCards +=
          cr.card.legalities.future == "legal" ? cr.qtd : 0;
        legalities[6].legalCards +=
          cr.card.legalities.gladiator == "legal" ? cr.qtd : 0;
        legalities[7].legalCards +=
          cr.card.legalities.historic == "legal" ? cr.qtd : 0;
        legalities[8].legalCards +=
          cr.card.legalities.legacy == "legal" ? cr.qtd : 0;
        legalities[9].legalCards +=
          cr.card.legalities.modern == "legal" ? cr.qtd : 0;
        legalities[10].legalCards +=
          cr.card.legalities.oathbreaker == "legal" ? cr.qtd : 0;
        legalities[11].legalCards +=
          cr.card.legalities.oldschool == "legal" ? cr.qtd : 0;
        legalities[12].legalCards +=
          cr.card.legalities.pauper == "legal" ? cr.qtd : 0;
        legalities[13].legalCards +=
          cr.card.legalities.paupercommander == "legal" ? cr.qtd : 0;
        legalities[14].legalCards +=
          cr.card.legalities.penny == "legal" ? cr.qtd : 0;
        legalities[15].legalCards +=
          cr.card.legalities.pioneer == "legal" ? cr.qtd : 0;
        legalities[16].legalCards +=
          cr.card.legalities.predh == "legal" ? cr.qtd : 0;
        legalities[17].legalCards +=
          cr.card.legalities.premodern == "legal" ? cr.qtd : 0;
        legalities[18].legalCards +=
          cr.card.legalities.standard == "legal" ? cr.qtd : 0;
        legalities[19].legalCards +=
          cr.card.legalities.standardbrawl == "legal" ? cr.qtd : 0;
        legalities[20].legalCards +=
          cr.card.legalities.timeless == "legal" ? cr.qtd : 0;
        legalities[21].legalCards +=
          cr.card.legalities.vintage == "legal" ? cr.qtd : 0;

        switch (cr.card.rarity) {
          case "common":
            comum += cr.qtd;
            break;
          case "uncommon":
            incomum += cr.qtd;
            break;
          case "rare":
            rara += cr.qtd;
            break;
          case "mythic":
            miticoRara += cr.qtd;
            break;
          default:
            break;
        }
        totalPrice += cr.card.prices.usd * cr.qtd;
        if (cr.card.colors) {
          cr.card.colors.forEach((cor) => {
            switch (cor) {
              case "W":
                branco += cr.qtd;
                break;
              case "U":
                azul += cr.qtd;
                break;
              case "B":
                preto += cr.qtd;
                break;
              case "R":
                vermelho += cr.qtd;
                break;
              case "G":
                verde += cr.qtd;
                break;
            }
          });
        }
      });
      setLegalities(legalities);
      setQtd(cardQtd);
      setDiferentCard(diferentCard);
      setPrice(totalPrice);
      setRarity({
        comum: comum,
        incomum: incomum,
        rara: rara,
        miticoRara: miticoRara,
      });
      setCores({
        branco,
        azul,
        preto,
        verde,
        vermelho,
      });

      isLoading(false);
    })();
  }, []);
  return (
    <>
      <Header atualPage={Pages.ESTATISTICAS} />

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
        {!loading && dataQtd === 0 && (
          <p>
            Sua Coleção está vazia, adicione mais cartas para acessar
            estatisticas
          </p>
        )}
        {!loading && dataQtd > 0 && (
          <div className={styles.stats}>
            <div className={styles.info}>
              <span>Numero total de cartas = {dataQtd}</span>
              <br />
              <span>Numero de cartas diferentes = {dataDiferentCard}</span>
              <br />
              <span>
                Custo total da Coleção = {dataTotalPrice.toFixed(2)} USD
              </span>
            </div>
            <div className={styles.graph}>
              <PieChart
                series={[
                  {
                    data: [
                      {
                        value: dataCardRarity.comum,
                        color: "black",
                        label: "Comum",
                      },
                      {
                        value: dataCardRarity.incomum,
                        color: "gray",
                        label: "Incomum",
                      },
                      {
                        value: dataCardRarity.rara,
                        color: "orange",
                        label: "Rara",
                      },
                      {
                        value: dataCardRarity.miticoRara,
                        color: "red",
                        label: "mitico-rara",
                      },
                    ],
                  },
                ]}
                height={200}
                width={400}
              />
            </div>
            <div className={styles.graph}>
              <BarChart
                dataset={dataLegalities}
                yAxis={[{ scaleType: "band", dataKey: "format" }]}
                series={[{ dataKey: "legalCards", label: "Cartas Validas" }]}
                layout="horizontal"
                xAxis={[
                  {
                    label: "Cartas Validas por formato",
                  },
                ]}
                width={500}
                height={500}
                margin={{ left: 115 }}
              />
            </div>
            <div className={styles.graph}>
              <PieChart
                colors={["black", "gray", "orange", "red"]} // Use palette
                series={[
                  {
                    data: [
                      {
                        value: dataCores.branco,
                        color: "yellow",
                        label: "Branco",
                      },
                      {
                        value: dataCores.azul,
                        color: "blue",
                        label: "Azul",
                      },
                      {
                        value: dataCores.preto,
                        color: "black",
                        label: "Preto",
                      },
                      {
                        value: dataCores.vermelho,
                        color: "red",
                        label: "Vermelho",
                      },
                      {
                        value: dataCores.verde,
                        color: "green",
                        label: "Verde",
                      },
                    ],
                  },
                ]}
                height={200}
                width={400}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Estatisticas;
