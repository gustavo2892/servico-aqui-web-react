import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.header`
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    height: 200px;
  }
`;

export const TopBar = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #d4c2ff;

  a {
    height: 3.2rem;
    transition: opacity 0.2s;
  }

  a:hover {
    opacity: 0.6;
  }

  > img {
    height: 1.6rem;
  }

  button {
    background: transparent;
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }

  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }

  @media (min-width: 700px) {
    max-width: 1100px;
  }
`;

export const Content = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
  margin: 3.2rem auto;

  strong {
    font: 700 3.6rem Archivo;
    line-height: 4.2rem;
    color: #ffffff;
  }

  p {
    max-width: 30rem;
    font-size: 1.6rem;
    line-height: 2.6rem;
    color: #d4c2ff;
    margin-top: 2.4rem;
  }

  @media (min-width: 700px) {
    flex: 1;
    max-width: 740px;
    margin: 0 auto;
    padding-bottom: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    strong {
      max-width: 350px;
    }
  }
`;
