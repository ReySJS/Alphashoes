import styled from 'styled-components'

export const Container = styled.li`
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