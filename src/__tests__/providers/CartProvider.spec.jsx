import { renderHook, act } from '@testing-library/react-hooks'
import AxiosMock from 'axios-mock-adapter'

import api from '../../services/api'
import { useCart } from '../../hooks/useCart'
import { CartProvider } from '../../providers/CartProvider'

const apiMock = new AxiosMock(api)

describe('Cart Provider', () => {
  it('should be able to add product in the cart', async () => {
    const productId = 1;

    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 1,
      title: "Tênis Infantil Adidas Lite Racer CLN",
      price: 139.99,
      image: "https://static.netshoes.com.br/produtos/tenis-infantil-adidas-lite-racer-cln/36/NQQ-8001-036/NQQ-8001-036_detalhe1.jpg"
    })

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 1,
      amount: 10
    })

    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper: CartProvider
    })

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')

    result.current.addProduct(productId)

    await waitForNextUpdate()

    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(result.current.cart).toHaveLength(1)
  })

  it('should restore saved data from storage when application starts', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(storageKey => {
      switch (storageKey) {
        case '@alphashoes:cart':
          return JSON.stringify([
            {
              id: 1,
              title: "Tênis Infantil Adidas Lite Racer CLN",
              price: 139.99,
              image: "https://static.netshoes.com.br/produtos/tenis-infantil-adidas-lite-racer-cln/36/NQQ-8001-036/NQQ-8001-036_detalhe1.jpg",
              amount: 1,
            }
          ])
        default:
          return null;
      }
    })

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    })

    expect(result.current.cart).toHaveLength(1)
  })

  it('should not be able to add product in the cart if quantity is not in stock', async () => {
    const productId = 1

    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 1,
      title: "Tênis Infantil Adidas Lite Racer CLN",
      price: 139.99,
      image: "https://static.netshoes.com.br/produtos/tenis-infantil-adidas-lite-racer-cln/36/NQQ-8001-036/NQQ-8001-036_detalhe1.jpg"
    })

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 1,
      amount: 0,
    })

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    })

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')

    result.current.addProduct(productId)

    expect(setItemSpy).not.toHaveBeenCalled()
    expect(result.current.cart).toHaveLength(0)
  })

  it('should be able to increment the quantity of a product if it already exists in the cart', async () => {
    const productId = 1

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(storageKey => {
      switch (storageKey) {
        case '@alphashoes:cart':
          return JSON.stringify([
            {
              id: 1,
              title: "Tênis Infantil Adidas Lite Racer CLN",
              price: 139.99,
              image: "https://static.netshoes.com.br/produtos/tenis-infantil-adidas-lite-racer-cln/36/NQQ-8001-036/NQQ-8001-036_detalhe1.jpg",
              amount: 1,
            }
          ])
        default:
          return null;
      }
    })

    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 1,
      title: "Tênis Infantil Adidas Lite Racer CLN",
      price: 139.99,
      image: "https://static.netshoes.com.br/produtos/tenis-infantil-adidas-lite-racer-cln/36/NQQ-8001-036/NQQ-8001-036_detalhe1.jpg"
    })

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 1,
      amount: 10
    })

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')

    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper: CartProvider
    })

    result.current.addProduct(productId)

    await waitForNextUpdate()

    expect(setItemSpy).toHaveBeenCalled()
    expect(result.current.cart[0].amount).toEqual(2)
  })

  it('should not be able to increment the quantity of a product in the cart if the quantity is out of stock', async () => {
    const productId = 1

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(storageKey => {
      switch (storageKey) {
        case '@alphashoes:cart':
          return JSON.stringify([
            {
              id: 1,
              title: "Tênis Infantil Adidas Lite Racer CLN",
              price: 139.99,
              image: "https://static.netshoes.com.br/produtos/tenis-infantil-adidas-lite-racer-cln/36/NQQ-8001-036/NQQ-8001-036_detalhe1.jpg",
              amount: 3,
            }
          ])
        default:
          return null;
      }
    })

    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 1,
      title: "Tênis Infantil Adidas Lite Racer CLN",
      price: 139.99,
      image: "https://static.netshoes.com.br/produtos/tenis-infantil-adidas-lite-racer-cln/36/NQQ-8001-036/NQQ-8001-036_detalhe1.jpg"
    })

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 1,
      amount: 3
    })

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    })

    result.current.addProduct(productId)

    expect(setItemSpy).not.toHaveBeenCalled()
    expect(result.current.cart[0].amount).toBe(3)
  }) 

  it('should not be able to add a product if it not existing', async () => {
    const productId = 1

    apiMock.onGet(`products/${productId}`).reply(400)
    
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    })

    result.current.addProduct(productId)

    expect(result.current.cart).toHaveLength(0)
  })

  it('should be able to remove a product from the cart', async () => {
    const productId = 1

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(storageKey => {
      switch (storageKey) {
        case '@alphashoes:cart':
          return JSON.stringify([
            {
              id: 1,
              title: "Tênis Infantil Adidas Lite Racer CLN",
              price: 139.99,
              image: "https://static.netshoes.com.br/produtos/tenis-infantil-adidas-lite-racer-cln/36/NQQ-8001-036/NQQ-8001-036_detalhe1.jpg",
              amount: 3,
            }
          ])
        default:
          return null;
      }
    })

    const {result} = renderHook(() => useCart(), {
      wrapper: CartProvider
    })

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')

    act(() =>  {
      result.current.removeProduct(productId)
    })

    expect(setItemSpy).toHaveBeenCalled()
    expect(result.current.cart).toHaveLength(0)
  })

  it('should not be able to remove a product from the cart if it is not found in the cart', async () => {
    const productId = 1

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(storageKey => {
      switch (storageKey) {
        case '@alphashoes:cart':
          return JSON.stringify([])
        default:
          return null;
      }
    })

    const {result} = renderHook(() => useCart(), {
      wrapper: CartProvider
    })

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')

    act(() =>  {
      result.current.removeProduct(productId)
    })

    expect(setItemSpy).not.toHaveBeenCalled()
    expect(result.current.cart).toHaveLength(0)
  })
})