import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 16px;
  height: 44px;
  width: 100%;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    &::placeholder {
      color: #fff;
    }
  }
  svg {
    margin-right: 16px;
  }
`;