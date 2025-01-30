import { BuscaDeCards } from "../models/BuscaDeCards";
import { Card, cardConverter, CardRegister } from "../models/Card";
import cardback from "../assets/img/cardback.png";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { store } from "../config/firebase";
import { FirebaseContainer } from "../models/FirebaseContainer";

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
            colors: e.colors,
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
  async save(card: Card, email: string, qtd: number) {
    const id = this._generateId(email, card.name);
    const ref = doc(
      store,
      FirebaseContainer.CARDS_COLLECTION_NAME,
      id
    ).withConverter(cardConverter);
    const register = new CardRegister({
      ownerEmail: email,
      card: card,
      qtd: qtd,
    });

    await setDoc(ref, register);
  }

  async findByOwnerEmailAndName(ownerEmail: string, name: string) {
    const id = this._generateId(ownerEmail, name);
    const ref = doc(
      store,
      FirebaseContainer.CARDS_COLLECTION_NAME,
      id
    ).withConverter(cardConverter);

    const snapshot = await getDoc(ref);
    return snapshot.data();
  }

  async findAllByOwner(ownerEmail: string) {
    const ref = collection(store, FirebaseContainer.CARDS_COLLECTION_NAME);
    const q = query(ref, where("ownerEmail", "==", ownerEmail)).withConverter(
      cardConverter
    );

    const snapshot = await getDocs(q);
    const cards: CardRegister[] = [];
    snapshot.forEach((doc) => cards.push(doc.data()));

    return cards;
  }

  async deletebyOwnerEmailAndName(ownerEmail: string, name: string) {
    const id = this._generateId(ownerEmail, name);
    const ref = doc(
      store,
      FirebaseContainer.CARDS_COLLECTION_NAME,
      id
    ).withConverter(cardConverter);
    await deleteDoc(ref);
  }

  private _generateId(ownerEmail: string, name: string) {
    return `${ownerEmail}|${name.replace(/\s/g, "")}`;
  }
}
