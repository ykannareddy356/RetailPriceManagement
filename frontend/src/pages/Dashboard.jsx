import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PriceForm from "../components/PriceForm";
import PriceTable from "../components/PriceTable";
import SearchPrice from "../components/SearchPrice";
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';



const styles = {
  header: {
    display: "grid",

    // 🔥 3 columns layout
    gridTemplateColumns: "1fr auto 1fr",

    alignItems: "center",

    width: "70%",
    margin: "20px auto",

    padding: "10px 20px",

    backgroundColor: "#f7fff5",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "600",
    color: "black",

    // 🔥 ensures perfect centering
    justifySelf: "center",
  },

  logoutBtn: {
    justifySelf: "end", // 🔥 pushes button to far right

    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  logoutBtn: {}
};
function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const navigate = useNavigate();


  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  const clearSelectedPrice = () => {
  setSelectedPrice(null);
};


// 🔴 Logout logic
  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    navigate("/login");
  };


  return (
    <div className="app-container">
      <ToastContainer />
      

   <div style={styles.header}>
  <div></div> {/* left empty space */}

  <h2 style={styles.title}>
    Retail Price Management
  </h2>

  <button onClick={handleLogout} style={styles.logoutBtn}>
    Logout
  </button>
</div>


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

export default Dashboard;