import React from 'react';
import { render, fireEvent } from '@testing-library/react'

import ProductCard from '../../components/ProductCard'

const mockedAddProductFunction = jest.fn()

jest.mock('../../hooks/useCart', () => {
  return {
    useCart() {
      return {
        addProduct: mockedAddProductFunction
      }
    }
  }
})

describe('ProductCard Component', () => {
  it('component is being rendering correctly', () => {
    const { getByTestId } = render(
      <ProductCard
        product={{ 
          id: 'product_id',
          image: '/image.jpg',
          title: 'Produto X',
          price: 100
        }}
      />
    )

    expect(getByTestId('product-title')).toHaveTextContent('Produto X')
    expect(getByTestId('product-price')).toHaveTextContent('R$ 100')
  })

  it('should be able to call the function to add the product to the cart when the button is clicked', () => {
    const { getByTestId } = render(
      <ProductCard
        product={{ 
          id: 'product_id',
          image: '/image.jpg',
          title: 'Produto X',
          price: 100
        }}
      />
    )

    const addProductToCartButtonElement = getByTestId("button-element")

    fireEvent.click(addProductToCartButtonElement)

    expect(mockedAddProductFunction).toHaveBeenCalledWith('product_id')
  })
})