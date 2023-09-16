import { ChakraProvider } from '@chakra-ui/react'
import Nav from "./componants/nav"
import CalLinkInput from './componants/CalInput.jsx';
import ToDo from './componants/ToDo';


const localstorageAuthKey = "@@auth0spajs@@::JpeLGJQBmOoGRLfzrcNMQvVCGPZ4D3nk::@@user@@"

function App() {

    // Only used for inital state
  const stats = localStorage.getItem(localstorageAuthKey);
  const loggedIn = stats ? true : false;
  return (
    <ChakraProvider>
      <Nav />
      <div style={{display: "flex", paddingTop: "5px"}}>
      {loggedIn && 
      <>
        <CalLinkInput />
        <ToDo />
      </>
      }
      </div>

    </ChakraProvider>
  );
}

export default App;
