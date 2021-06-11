import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';

import api from '../../services/api';

import { Container, Main } from './styles'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get('/products')

        if (Array.isArray(data)) {
          setProducts(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    loadData()
  }, [])

  return (
    <Container data-testid="homepage-container">
      <Header />

      <Main>
        <div>
          <ul data-testid="container-products">
            {products.map(product => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </ul>
        </div>
      </Main>
    </Container>
  )
}

export default Home;