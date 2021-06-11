import styled from 'styled-components'

export const Container = styled.button`
  border: 0;
  background: none;

  color: #fff;

  display: flex;
  align-items: center;
  gap: 16px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    span {
      font-size: 12px;
      color: #89adf2;
    }
  }

  svg {
    width: 30px;
    height: 30px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`