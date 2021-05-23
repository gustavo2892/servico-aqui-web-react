import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  margin-top: 2px;
`;

export const SideMenu = styled.div`
  height: 100%;
  width: 250px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 0px 0px #00008b;

  p {
    font-size: 16px;
    text-transform: uppercase;
    margin: 15px 0px 30px 0px;
    color: #007fff;
  }

  span {
    color: #999;
  }

  h3 {
    text-transform: uppercase;
    color: #007fff;
    margin-bottom: 15px;
  }
`;

export const ImageContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 120px;
    width: 120px;
    border-radius: 50%;
  }
`;

export const ContainerPageDate = styled.div`
  margin: 50px auto;

  display: flex;
  flex-direction: column;
  max-width: 600px;

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }

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
  width: 300px;

  opacity: ${props => (props.available ? 1 : 0.6)};

  ${props =>
    props.available &&
    css`
      cursor: pointer;
    `}

  strong {
    display: block;
    color: #999;
    font-size: 20px;
    font-weight: ${props => (props.available ? 'bold' : 'normal')};
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${props => (props.available ? '#999' : '#666')};
  }
`;
