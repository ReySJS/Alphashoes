import React from 'react';
import { render } from '@testing-library/react'

import Header from '../../components/Header'

jest.mock('../../hooks/useCart', () => {
  return {
    useCart() {
      return {
        cart: []
      }
    }
  }
})

describe('Header component', () => {
  test('component is being rendering correctly', () => {
    const { getByTestId } = render(<Header />)

    expect(getByTestId('header-container')).toBeInTheDocument()
    expect(getByTestId('logo')).toBeInTheDocument()
  })
})