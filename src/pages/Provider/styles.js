import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const SideMenu = styled.div`
  height: 100%;
  width: 250px;
  background: #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 14px;
    margin: 15px 0px;
    color: #007fff;
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
