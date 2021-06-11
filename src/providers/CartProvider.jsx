import React, { createContext, useState, useCallback, useEffect } from 'react'
import api from '../services/api'

export const CartContext = createContext({})

export const CartProvider = (props) => {
  const [cart, setCart] = useState(() => {
    const storagedCart = localStorage.getItem('@alphashoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart)
    }

    return []
  })

  const addProduct = useCallback(async (productId) => {
    try {
      const copyCart = cart.slice()

      const { data: product } = await api.get(`/products/${productId}`)
      const { data: stock } = await api.get(`/stock/${productId}`)

      const findProductInCartIndex = copyCart.findIndex(
        cartProduct => cartProduct.id === productId
      )

      if (findProductInCartIndex > -1) {
        const productInCart = copyCart[findProductInCartIndex]
        const updatedAmount = productInCart.amount + 1;

        if (stock.amount < updatedAmount) {
          console.log('Quantidade solicitada fora de estoque.')
          return;
        }

        copyCart[findProductInCartIndex] = {
          ...productInCart,
          amount: updatedAmount
        }

        localStorage.setItem('@alphashoes:cart', JSON.stringify(copyCart))

        setCart(copyCart)

        return;
      }

      if (stock.amount < 1) {
        console.log('Quantidade solicitada fora de estoque.')
        return;
      }

      copyCart.push({
        ...product,
        amount: 1
      })

      localStorage.setItem('@alphashoes:cart', JSON.stringify(copyCart))

      setCart(copyCart)
    } catch (error) {
      console.log('Não foi possivel adicionar este produto.')
    }
  }, [cart])

  const removeProduct = useCallback(productId => {
    const copyCart = cart.slice()

    const findProductInCartIndex = copyCart.findIndex(
      cartProduct => cartProduct.id === productId
    )

    if (findProductInCartIndex < 0) {
      console.log('Erro na remoção do produto')

      return;
    }

    copyCart.splice(findProductInCartIndex, 1)
    localStorage.setItem('@alphashoes:cart', JSON.stringify(copyCart))

    setCart(copyCart)
  }, [cart])

  const updateProductAmount = useCallback(async (productId, amount) => {
    try {
      if (amount <= 0) {
        return;
      }

      const { data: stock } = await api.get(`/stock/${productId}`)

      if (stock.amount < amount) {
        console.log('Quantidade solicitada fora de estoque.')

        return;
      }

      const copyCart = cart.slice()

      const findProductInCartIndex = copyCart.findIndex(
        cartProduct => cartProduct.id === productId
      )

      const productInCart = copyCart[findProductInCartIndex]

      copyCart[findProductInCartIndex] = {
        ...productInCart,
        amount,
      }

      localStorage.setItem('@alphashoes:cart', JSON.stringify(copyCart))

      setCart(copyCart)

    } catch (error) {
      console.log('Erro ao atualizar quantidade do produto.')
    }
  }, [cart])

  useEffect(() => {
    console.log("Carrinho: ", cart)
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, updateProductAmount }}>
      {props.children}
    </CartContext.Provider>
  )
}
