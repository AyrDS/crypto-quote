import styled from '@emotion/styled';

const Container = styled.div`
   color: #FFF;
   font-family: 'Lato', sans-serif;
   display: flex;
   align-items: center;
   gap: 1rem;
   margin-top: 30px;
`;

const Img = styled.img`
   display: block;
   width: 75px;
`;

const Text = styled.p`
   font-size: 18px;
   span {
      font-weight: 700;
   }
`;

const Price = styled.p`
   font-size: 24px;
   span {
      font-weight: 700;
   }
`;

export const Result = ({ quotation }) => {
   const { PRICE, LOWDAY, CHANGEPCT24HOUR, HIGHDAY, IMAGEURL, LASTUPDATE } = quotation;

   return (
      <Container>
         <Img src={`https://cryptocompare.com/${IMAGEURL}`} alt="Crypto IMG" />
         <div>
            <Price>El precio es de: <span>{PRICE}</span></Price>
            <Text>Precio más alto del día: <span>{HIGHDAY}</span></Text>
            <Text>Precio más bajo del día: <span>{LOWDAY}</span></Text>
            <Text>Variación últimas 24HS: <span>% {CHANGEPCT24HOUR}</span></Text>
            <Text>Última actualización: <span>{LASTUPDATE}</span></Text>
         </div>
      </Container>
   )
}
