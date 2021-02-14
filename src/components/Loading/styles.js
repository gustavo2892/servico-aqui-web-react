import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    margin-top: 10px;
    color: #007fff;
    font-weight: bold;
  }
`;

export const LogoContainer = styled.div`
  position: fixed;
  margin: 0;
  top: 90%;
  left: 95%;
  z-index: 100;
  background-color: transparent;
  width: 100%;
  height: 100%;
`;
