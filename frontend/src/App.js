import { ChakraProvider } from '@chakra-ui/react'
import HelloWorld from "./componants/helloWorld.jsx";
import Nav from "./componants/nav"
import CalLinkInput from './componants/CalInput.jsx';


const localstorageAuthKey = "@@auth0spajs@@::JpeLGJQBmOoGRLfzrcNMQvVCGPZ4D3nk::@@user@@"

function App() {

    // Only used for inital state
  const stats = localStorage.getItem(localstorageAuthKey);
  const loggedIn = stats ? true : false;
  return (
    <ChakraProvider>
      <Nav />

      {loggedIn && 
      <CalLinkInput />
      }
      <HelloWorld />
    </ChakraProvider>
  );
}

export default App;
