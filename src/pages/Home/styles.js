import styled from 'styled-components'

export const Container = styled.div``

export const Main = styled.main`
  width: 100%;

  > div {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
  }

  ul {
    list-style: none;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
  }
`

export const ProductCard = styled.li`
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 24px;

  img {
    width: 200px;
  }

  .product-info {
    flex: 1;

    > strong {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #504f4f;
    }

    > span {
      display: block;
      color: var(--primary);
      font-size: 24px;
    }
  } 

`
