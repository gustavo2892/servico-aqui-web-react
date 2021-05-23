import styled, { css } from 'styled-components';

export const MiniLoading = styled.span`
  ${(props) =>
    props.large &&
    css`
      display: flex;
      justify-content: center;
      margin-top: 20px;

      span {
        width: 2rem;
        height: 2rem;
      }
    `}
`;



