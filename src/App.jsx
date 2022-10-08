import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Form, Result, Spinner } from './components';
import ImgCrypto from './assets/imagen-criptos.png';

const Container = styled.div`
   max-width: 900px;
   margin: 0 auto;
   width: 90%;

   @media (min-width: 992px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
   }
`;

const Img = styled.img`
   max-width: 400px;
   width: 80%;
   margin: 100px auto 0 auto;
   display: block;
`;

const Heading = styled.h1`
   font-family: 'Lato', sans-serif;
   color: #FFF;
   text-align: center;
   font-weight: 700;
   margin-top: 80px;
   margin-bottom: 50px;
   font-size: 34px;

   &::after{
      content: '';
      width: 100px;
      height: 6px;
      background-color: #66A2FE;
      display: block;
      margin: 10px auto 0 auto;
   }
`;

export const App = () => {

   const [currencies, setCurrencies] = useState({});
   const [quotation, setQuotation] = useState({});
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (Object.keys(currencies).length > 0) {
         const quoteCrypto = async () => {
            setLoading(true);
            const { currency, criptoCurrency } = currencies;
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoCurrency}&tsyms=${currency}`;

            const response = await fetch(url);
            const result = await response.json();

            setQuotation(result.DISPLAY[criptoCurrency][currency]);
            setLoading(false);
         }

         quoteCrypto();
      }
   }, [currencies]);

   return (
      <Container>
         <Img
            src={ImgCrypto}
            alt='Imagen Cripto'
         />
         <div>
            <Heading>Cotiza Criptomonedad al Instante</Heading>

            <Form
               setCurrencies={setCurrencies}
            />
            {loading && <Spinner />}
            {quotation.PRICE && !loading && <Result quotation={quotation} />}
         </div>
      </Container>
   )
}
