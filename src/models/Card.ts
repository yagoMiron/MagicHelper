export type Card = {
  name: string;
  image_uris: {
    small: string;
    large: string;
  };
  prices: {
    usd: number;
  };
};
