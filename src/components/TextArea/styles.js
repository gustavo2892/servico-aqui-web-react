import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  background: #3db0f7;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  border: 2px solid transparent;
  color: #FFF;
  display: flex;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #007fff;
      border-color: #007fff;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #007fff;
    `}
  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    overflow: hidden;
    resize: none;
    &::placeholder {
      color: #FFF;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
