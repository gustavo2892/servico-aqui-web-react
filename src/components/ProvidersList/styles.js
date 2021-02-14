import styled from 'styled-components';

export const ProvidersSelect = styled.ul`
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
      margin-bottom: 20px;
      text-align: center;
    }
    span {
      font-size: 15px;
      color: #000;
      margin: 5px 0px 5px 0px;
    }
  }
`;

ProvidersSelect.ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 64px;
    width: 64px;
    border-radius: 50%;
  }
`;

ProvidersSelect.LinkContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 20px;
  align-items: flex-end;

  a {
    color: #000;
  }
`;
