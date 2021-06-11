import React from 'react'
import { render, waitFor } from '@testing-library/react'

import AxiosMock from 'axios-mock-adapter'
import api from '../../services/api'

import Home from '../../pages/Home'

const apiMock = new AxiosMock(api)

jest.mock('../../hooks/useCart', () => {
  return {
    useCart() {
      return {
        cart: []
      }
    }
  }
})

describe('Home Page', () => {
  it('page is being rendering correctly', async () => {
    apiMock.onGet('products').reply(200, [
      {
        "id": 1,
        "title":  "Tênis Infantil Adidas Lite Racer CLN",
        "price": 139.99,
        "image": "https://static.netshoes.com.br/produtos/tenis-infantil-adidas-lite-racer-cln/36/NQQ-8001-036/NQQ-8001-036_detalhe1.jpg"
      },
      {
        "id": 2,
        "title":  "Tênis Nike Revolution 5 Masculino",
        "price": 179.99,
        "image": "https://static.netshoes.com.br/produtos/tenis-nike-revolution-5-masculino/44/HZM-1731-844/HZM-1731-844_detalhe1.jpg"
      },
      {
        "id": 3,
        "title":  "Tênis Olympikus Attract Se 815",
        "price": 79.99,
        "image": "https://static.netshoes.com.br/produtos/tenis-olympikus-attract-se-815-masculino/20/D22-3836-120/D22-3836-120_detalhe1.jpg"
      },
      {
        "id": 4,
        "title":  "Bola de futsal Penalty Lider XXI",
        "price": 99.99,
        "image": "https://static.netshoes.com.br/produtos/bola-de-futsal-penalty-lider-xxi/24/D23-9780-024/D23-9780-024_zoom2.jpg"
      },
      {
        "id": 5,
        "title":  "Bola Adidas de Futebol Campo Cruzeiro",
        "price": 129.90,
        "image": "https://static.netshoes.com.br/produtos/bola-adidas-de-futebol-campo-cruzeiro-azul-e-dourado/86/3ZP-0774-286/3ZP-0774-286_zoom1.jpg"
      },
      {
        "id": 6,
        "title":  "Luva de Goleiro Juvenil Adidas Pretador 20 Training",
        "price": 59.90,
        "image": "https://static.netshoes.com.br/produtos/luva-de-goleiro-juvenil-adidas-pretador-20-training/02/NQQ-3458-002/NQQ-3458-002_zoom1.jpg"
      },
    ])

    const { getByTestId } = render(<Home/>)

    await waitFor(() => getByTestId("homepage-container"))

    const containerProducts = getByTestId("container-products")

    expect(getByTestId("homepage-container")).toBeInTheDocument()
    expect(containerProducts.children.length).toBe(6)
  })

  it('should not be able to show the products if the request returned an error', async () =>  {
    apiMock.onGet('products').reply(400)

    const { getByTestId } = render(<Home/>)

    await waitFor(() => getByTestId("homepage-container"))

    const containerProducts = getByTestId("container-products")

    expect(containerProducts.children.length).toBe(0)
  })

  it('should not be able to show the products if the request does not return to an array', async () =>  {
    apiMock.onGet('products').reply(200, {})

    const { getByTestId } = render(<Home/>)

    await waitFor(() => getByTestId("homepage-container"))

    const containerProducts = getByTestId("container-products")

    expect(containerProducts.children.length).toBe(0)
  })
})