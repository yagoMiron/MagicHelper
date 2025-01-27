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
