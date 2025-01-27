import { BuscaDeCards } from "../models/BuscaDeCards";
import { Card } from "../models/Card";
import cardback from "../assets/img/cardback.png";

export class CardService {
  private _URL = "https://api.scryfall.com/cards";

  async search(q: string): Promise<BuscaDeCards> {
    const URL = `${this._URL}/search?q=${q}`;
    const results = await fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.object === "error") {
          const result: BuscaDeCards = {
            total_cards: 0,
            has_more: false,
            data: [],
          };
          return result;
        }
        const { total_cards, has_more, next_page, data } = json;

        const lista_cartas = data.map((e: any) => {
          const card: Card = {
            name: e.name,
            artist: e.artist,
            image_uris: {
              small: e.image_uris?.small || cardback,
              large: e.image_uris?.large || cardback,
            },
            prices: {
              usd: e.prices.usd,
            },
            legalities: e.legalities,
            mana_cost: e.mana_cost,
            rarity: e.rarity,
            type_line: e.type_line,
          };
          return card;
        });

        const resultado: BuscaDeCards = {
          total_cards: total_cards,
          has_more: has_more,
          next_page: next_page,
          data: lista_cartas,
        };
        return resultado;
      });
    return results;
  }
}
