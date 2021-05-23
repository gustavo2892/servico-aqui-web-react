import styled, { css } from 'styled-components';

export const MessageInfo = styled.p`
  color: #000;
  margin: 0;
`;

export const Button = styled.button`
  ${props =>
    props.color === 'primary' &&
    css`
      background: #007fff;
      color: #fff;
    `}
  height: 40px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #ffffff;
  width: 100%;
  font-weight: 700;
  margin-top: 16px;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.6;
  }
`;

export const ContainerButton = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  width: 100%;
  padding: 0px 60px;
`;

export const ContainerButtonConfirm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  button {
    width: 150px;
  }
`;
