import React from 'react';
import { render } from '@testing-library/react'

import CartInfo from '../../components/CartInfo';
import { useCart } from '../../hooks/useCart'

const mockedUseCartHook = useCart

jest.mock('../../hooks/useCart')

describe('CartInfo Component', () => {
  test('component is being rendered correctly', () => {
    mockedUseCartHook.mockReturnValueOnce({
      cart: []
    })

    const { getByText } = render(<CartInfo />)

    expect(getByText('Meu carrinho')).toBeInTheDocument()
    expect(getByText('0 itens')).toBeInTheDocument()
  })

  test('should be able to show the component with only one item', () => {
    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          id: 1,
          amount: 1,
          title: "Tênis Infantil Adidas Lite Racer CLN",
          price: 139.99,
          image: "https://static.netshoes.com.br/produtos/tenis-infantil-adidas-lite-racer-cln/36/NQQ-8001-036/NQQ-8001-036_detalhe1.jpg"
        }
      ]
    })

    const { getByText } = render(<CartInfo />)

    expect(getByText('1 item')).toBeInTheDocument()
  })
})