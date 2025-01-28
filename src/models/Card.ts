import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export type Card = {
  name: string;
  type_line: string;
  mana_cost: string;
  rarity: string;
  image_uris: {
    small: string;
    large: string;
  };
  prices: {
    usd: number;
  };
  artist: string;
  legalities: {
    standard: string;
    future: string;
    historic: string;
    timeless: string;
    gladiator: string;
    pioneer: string;
    explorer: string;
    modern: string;
    legacy: string;
    pauper: string;
    vintage: string;
    penny: string;
    commander: string;
    oathbreaker: string;
    standardbrawl: string;
    brawl: string;
    alchemy: string;
    paupercommander: string;
    duel: string;
    oldschool: string;
    premodern: string;
    predh: string;
  };
};

export class CardRegister {
  ownerEmail: string = "";
  card: Card = {
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
  };
  qtd: number = 1;
  constructor(obj: Partial<CardRegister>) {
    Object.assign(this, obj);
  }
}

export const cardConverter: FirestoreDataConverter<CardRegister, DocumentData> =
  {
    toFirestore: (card: CardRegister): DocumentData => {
      const cleancard = Object.entries(card)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      return cleancard;
    },

    fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ) => {
      const data = snapshot.data(options);
      return new CardRegister(data);
    },
  };
