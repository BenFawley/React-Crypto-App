import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Details from './pages/Details.js';
import CryptoList from './pages/CryptoList.js';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/coin/:id" element={<Details/>}/> */}
        <Route path="/coins/" element={<CryptoList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App