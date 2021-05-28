import styled, { css } from 'styled-components';

import Tooltip from '../../components/Tooltip'

export const Container = styled.div`
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  ${props =>
    props.isProvider &&
    css`
      max-width: 600px;

      ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 15px;
        margin-top: 30px;
      }
    `}

  ${props =>
    !props.isProvider &&
    css`
      margin: 50px 100px 50px 100px;
    `}

  header {
    display: flex;
    align-self: center;
    align-items: center;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }
`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #fff;

  opacity: ${props => (props.past ? 0.6 : 1)};

  strong {
    display: block;
    color: ${props => (props.available ? '#999' : '#5729d9')};
    font-size: 20px;
    font-weight: ${props => (props.available ? 'normal' : 'bold')};
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${props => (props.available ? '#999' : '#666')};
  }
`;

export const ContainerSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content:center; 
  align-items: center;
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

