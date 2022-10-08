import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { currencies } from '../data/currencies';
import useSelectCurrency from '../hooks/useSelectCurrency';
import { Error } from './Error';

const InputSubmit = styled.input`
   background-color: #9497FF;
   border: none;
   width: 100%;
   padding: 10px;
   color: #FFF;
   font-weight: 700;
   text-transform: uppercase;
   font-size: 20px;
   border-radius: 5px;
   cursor: pointer;
   transition: background-color .3s ease;
   margin-top: 30px;

   &:hover {
      background-color: #7A7DFE;
   }
`

export const Form = ({ setCurrencies }) => {
   const [cryptos, setCryptos] = useState([]);
   const [error, setError] = useState(false);

   const [currency, SelectCurrency] = useSelectCurrency('Elige tu Moneda', currencies);
   const [criptoCurrency, SelectCripto] = useSelectCurrency('Elige tu Criptomoneda', cryptos);

   useEffect(() => {
      const fetchApi = async () => {
         const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
         const response = await fetch(url);
         const result = await response.json();

         const arrayCryptos = result.Data.map(cripto => {
            const obj = {
               id: cripto.CoinInfo.Name,
               name: cripto.CoinInfo.FullName
            }

            return obj;
         });

         setCryptos(arrayCryptos);
      }

      fetchApi();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();

      if ([currency, criptoCurrency].includes('')) {
         return setError(true);
      }

      setError(false);
      setCurrencies({
         currency,
         criptoCurrency
      })
   }

   return (
      <>
         {error && <Error msg='Todos los campos son obligatorios' />}
         <form
            onSubmit={handleSubmit}
         >
            <SelectCurrency />
            <SelectCripto />
            <InputSubmit
               type="submit"
               value='Cotizar'
            />
         </form>
      </>
   )
}
