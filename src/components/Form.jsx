import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Error } from './Error';
import { currencies } from '../data/currencies';
import { useForm } from '../hooks/useForm';

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
`;

const formData = {
   currency: '',
   cryptoCurrency: ''
};

export const Form = ({ setCurrencies }) => {
   const [cryptos, setCryptos] = useState([]);
   const [error, setError] = useState(false);
   const { currency, cryptoCurrency, formState, onInputChange } = useForm(formData);


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

      if ([currency, cryptoCurrency].includes('')) {
         return setError(true);
      }

      setError(false);
      setCurrencies({
         currency,
         cryptoCurrency
      })
   }

   return (
      <>
         {error && <Error msg='Todos los campos son obligatorios' />}
         <form
            onSubmit={handleSubmit}
         >
            <InputSubmit
               type="submit"
               value='Cotizar'
            />
         </form>
      </>
   )
}
