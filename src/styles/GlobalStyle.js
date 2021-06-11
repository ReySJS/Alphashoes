import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --primary: #185adb;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    background: #f5f5f5;
    color: #333333;
  }

  body, input, button {
    font: 400 16px sans-serif;
  }

  button {
    cursor: pointer;
  }
`