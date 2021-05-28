import styled, { css } from 'styled-components';

export const AnnouncementList = styled.ul`
  position: relative;
  margin: 30px 30px 0 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;
  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    border: solid 1px #204ac8;
    padding: 20px;

    strong {
      font-size: 18px;
      line-height: 20px;
      color: #000;
      margin-top: 5px;
    }
    p {
      color: #000;
      margin: 10px 0px 10px 0px;
    }
    span {
      font-size: 15px;
      color: #000;
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
`;

export const ContainerSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content:center; 
  align-items: center;
  margin-top: 2.5rem;
`;

export const ContainerSearchInput = styled.div`
  background: #3db0f7;
  border-radius: 10px;
  padding: 16px;
  width: 30%;
  border: 2px solid transparent;
  color: #FFF;
  display: flex;
  justify-content:center; 
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #007fff;
      border-color: #007fff;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #007fff;
    `}

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }


  input {
    flex: 1;
    width: 30%;
    background: transparent;
    border: 0;
    color: #f4ede8;
    &::placeholder {
      color: #FFF;
    }
  }
  svg {
    margin-right: 16px;
  }
`;


export const Prefix = styled.span`
  margin-right: 10px;
`;
