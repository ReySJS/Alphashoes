import React from 'react';
import { render } from '@testing-library/react'

import Button from '../../components/Button'

describe('Button Component', () => {
  test('component is being rendering correctly', () => {
    const { getByText } = render(<Button />)

    expect(getByText('Adicionar ao carrinho')).toBeInTheDocument()
  })
})