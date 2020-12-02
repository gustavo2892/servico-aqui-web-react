import styled from 'styled-components';

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
