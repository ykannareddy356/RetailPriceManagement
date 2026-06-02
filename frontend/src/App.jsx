import { useState } from "react";
import PriceForm from "./components/PriceForm";
import PriceTable from "./components/PriceTable";
import SearchPrice from "./components/SearchPrice";
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  const clearSelectedPrice = () => {
  setSelectedPrice(null);
};
  return (
    <div className="app-container">
      <ToastContainer />
      <h1>Retail Price Management</h1>

      <PriceForm onAdd={handleRefresh} 
                selectedPrice={selectedPrice} 
                clearSelectedPrice={clearSelectedPrice}/>
      <SearchPrice />
      <PriceTable key={refresh} 
                  refresh={refresh}   
                  onEdit={setSelectedPrice}
                  onDelete={handleRefresh} />
    
    </div>
  );
}

export default App;