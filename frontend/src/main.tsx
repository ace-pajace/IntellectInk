import * as React from 'react'
import { extendTheme } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App.tsx'

const colors = {
  primary: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  secondary: {
    900: '#234e52',
    800: '#185c64',
    700: '#0b6c7f',
  }
}


const theme = extendTheme({ colors })


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
