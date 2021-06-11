import React from 'react';
import { useCart } from '../../hooks/useCart';
import Button from '../Button';

import { Container } from './styles';

function ProductCard({ product }) {
  const { addProduct } = useCart()

  return (
    <Container>
      <img src={product?.image} alt={product.title} />

      <div className="product-info">
        <strong data-testid="product-title">{product?.title}</strong>
        <span data-testid="product-price">R$ {product?.price}</span>
      </div>

      <Button data-testid="button-element" onClick={() => addProduct(product?.id)} />
    </Container>
  )
}

export default ProductCard;