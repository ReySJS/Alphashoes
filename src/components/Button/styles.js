import styled from 'styled-components'

export const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: 5px;
  height: 40px;

  background: var(--primary);
  color: #fff;

  display: flex;
  align-items: center;

  > div {
    height: 40px;
    width: 20%;

    margin-right: 16px;

    background: #1244a7;
    border-radius: 5px 0 0 5px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  > span {
    font-weight: 400;
  }

  &:hover {
    filter: brightness(0.9);
  }
`