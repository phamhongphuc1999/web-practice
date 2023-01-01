import axios from 'axios';
import { useEffect, useState } from 'react';

export const PRICE_TOKEN_ROOT = 'https://min-api.cryptocompare.com/data/price';

export async function getTokenPrice(tokenSymbol: string, currency = 'USD') {
  const formattedCurrency = currency.toUpperCase();
  const result = await axios
    .get<{ [key: string]: number }>(`${PRICE_TOKEN_ROOT}?fsym=${tokenSymbol}&tsyms=${formattedCurrency}`)
    .then((res) => res.data);
  return result[formattedCurrency];
}

export default function useTokenPrice(tokenSymbol: string, currency = 'USD') {
  const [price, setPrice] = useState<number | undefined>(undefined);

  async function fetch() {
    const _result = await getTokenPrice(tokenSymbol, currency);
    setPrice(_result);
  }

  useEffect(() => {
    fetch();
  }, [tokenSymbol, currency]);

  return price;
}
