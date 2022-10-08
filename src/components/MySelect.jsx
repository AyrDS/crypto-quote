import styled from '@emotion/styled';

const Label = styled.label`
color: #FFF;
display: block;
font-family: 'Lato', sans-serif;
font-size: 24px;
font-weight: 700;
margin: 15px 0;
`;

const Select = styled.select`
width: 100%;
font-size: 18px;
padding: 14px;
border-radius: 10px;
`;

export const MySelect = ({ label, options, value, name, handleInputChange }) => {
   return (
      <>
         <Label>{label}</Label>
         <Select
            value={value}
            name={name}
            onChange={handleInputChange}
         >
            {
               options?.map((opt) => (
                  <option key={opt.id} value={opt.id} > {opt.name} </option>
               ))
            }
         </Select>
      </>
   )
}
