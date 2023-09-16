import { ChakraProvider } from '@chakra-ui/react'
import HelloWorld from "./componants/helloWorld.jsx";
import Nav from "./componants/nav"
import { Auth0Provider } from '@auth0/auth0-react';


function App() {
  return (
    <ChakraProvider>
      <Nav />
      <HelloWorld />
    </ChakraProvider>
  );
}

export default App;
