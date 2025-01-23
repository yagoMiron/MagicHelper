import { Card } from "./Card";

export type BuscaDeCards = {
  total_cards: number;
  has_more: boolean;
  next_page?: string;
  data: Card[];
};
