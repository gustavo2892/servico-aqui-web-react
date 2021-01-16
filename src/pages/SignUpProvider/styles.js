import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.main`
  background: #ffffff;
  width: 100%;
  max-width: 74rem;
  border-radius: 0.8rem;
  margin: -3.2rem auto 3.2rem;
  padding-top: 4.4rem;
  overflow: hidden;
`;

export const Footer = styled.footer`
  padding: 4rem 2.4rem;
  background: #fafafc;
  border-top: 1px solid #e6e6f0;
  margin-top: 6.4rem;
  width: 100%;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: #9c98a6;

    img {
      margin-right: 2rem;
    }
  }

  button {
    width: 100%;
    height: 5.6rem;
    background: #ff9000;
    color: #ffffff;
    border: 0;
    border-radius: 0.8rem;
    cursor: pointer;
    font: 700 1.6rem Roboto Slab;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: backgroudcolor 0.2s;
    margin-top: 3.2rem;
  }

  button:hover {
    background: #04bf58;
  }
`;

export const Fieldset = styled.fieldset`
  border: 0;
  padding: 0 2.4rem;

  & + fieldset {
    margin-top: 6.4rem;
  }

  legend {
    font: 700 2.4rem Roboto Slab;
    color: #312e38;
    margin-bottom: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 1.6rem;
    border-bottom: 1px solid #e6e6f0;

    button {
      background: none;
      border: 0;
      color: #8257e5;
      font: 700 1.6rem Roboto Slab;
      cursor: pointer;
      transition: color 0.2s;
    }

    button:hover {
      color: #774dd6;
    }
  }
`;
