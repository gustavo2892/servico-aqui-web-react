import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #ffffff;

  @media (max-width: 1100px) {
    width: '100%';
    flex-direction: column;
  }
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;;
    transform: translateX(0);
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;;
    transform: translateX(0);
  }
`;

export const ContentNotProvider = styled.div`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: linear-gradient(-90deg, #ffffff, #cccccc);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
  font-size: 70px;
  font-family: 'Roboto Slab', serif;
  text-align: center;
  padding: 40px;
  font-weight: bold;

  animation: ${appearFromLeft} 1s;

  @media (max-width: 1100px) {
    font-size: 40px;
  }
`;

export const ContentProvider = styled.div`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: linear-gradient(-90deg, #000000, #312e38);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  font-family: 'Roboto Slab', serif;
  text-align: center;
  padding: 40px;
  font-weight: bold;

  animation: ${appearFromRight} 1s;

  @media (max-width: 1100px) {
    font-size: 40px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3.2rem 0;

  a {
    width: 30rem;
    height: 5.4rem;
    border-radius: 0.8rem;
    font: 700 2rem Roboto Slab;

    @media (max-width: 1100px) {
      font-size: 30px;
      width: 15rem;
      height: 3.4rem;
    }

    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    color: #ffffff;

    transition: background-color 0.2s;
  }

  a:first-child {
    margin-right: 1.6rem;
  }

  a img {
    width: 4rem;
    margin-right: 2.4rem;
  }

  @media (min-width: 1100px) {
    grid-area: buttons;
    justify-content: flex-start;

    a {
      font-size: 2.4rem;
    }
  }
`;

export const ButtonPage = styled(Link)`
  background: #ff9000;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;

export const OptionCenter = styled.div`
  z-index: 10;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;

  h2 {
    color: #ff9000;
    font-size: 70px;
    font-family: 'Roboto Slab', serif;
    font-weight: bold;
  }
`;
