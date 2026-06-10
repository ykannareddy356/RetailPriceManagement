import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function PriceTable({refresh,onDelete,onEdit})
{
  const [prices, setPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {fetchPrices();}, [refresh]);
  useEffect(() => {setCurrentPage(1);}, [searchTerm, sortBy]);

 

//if refresh in app is key then useEffect will run every time refresh changes
//and no need to add refresh in dependency array of useEffect
//   useEffect(() => {
//     fetchPrices();
//   }, []);

//if refresh is not key then useEffect will run only once when component mounts and not on every refresh
 

  const fetchPrices = async () => 
  {
    try 
    {
    const res = await API.get("/prices");
    setPrices(res.data.data);
    }
    catch (error) {console.log(error);}
  };

  const handleDelete = async (id) => 
  {
  const confirmDelete = window.confirm("Are you sure you want to delete this price?");
  if (!confirmDelete) {return;}
  try 
  {
    await API.delete(`/prices/${id}`);
    toast.success("Price deleted successfully");
    onDelete();
  } 
  catch (error) {toast.error(error.response?.data?.message || "Delete failed");}
  }
  
  // filtering loic based on search term
  const filteredPrices = prices.filter((price) =>
  price.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
  price.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // dashboard metrics
  const totalItems = prices.length;
  const highestPrice =prices.length > 0? Math.max(...prices.map((p) => Number(p.newPrice))): 0;
  const lowestPrice =prices.length > 0? Math.min(...prices.map((p) => Number(p.newPrice))): 0;
  //if we use prices original array gets affected so using spreaad operator



  //sorting logic
  const sortedPrices = [...filteredPrices];
  if (sortBy === "codeAsc") {sortedPrices.sort((a, b) =>a.itemCode.localeCompare(b.itemCode));} //strings
  if (sortBy === "codeDesc") {sortedPrices.sort((a, b) =>b.itemCode.localeCompare(a.itemCode));}
  if (sortBy === "priceAsc") {sortedPrices.sort((a, b) =>a.newPrice - b.newPrice);}//nums
  if (sortBy === "priceDesc") {sortedPrices.sort((a, b) =>b.newPrice - a.newPrice);}
  if (sortBy === "newest") {sortedPrices.sort((a, b) =>new Date(b.updatedAt) - new Date(a.updatedAt));}//dates
  if (sortBy === "oldest") {sortedPrices.sort((a, b) =>new Date(a.updatedAt) - new Date(b.updatedAt));}
  
  //pagination as per frontend logic but backend logic is feasible and efficient
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord =indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedPrices.slice(indexOfFirstRecord,indexOfLastRecord);
  
  const totalPages = Math.ceil(sortedPrices.length / recordsPerPage);
  
  //useeffect to handle case when current page exceeds total pages after filtering or deletion
  //so need to use after totalPages is calculated and currentPage is updated
  useEffect(() => {
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }
}, [currentPage, totalPages]);
  return (
    <div className="price-table">
      <h2>Price Table</h2>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Items</h3>
          <p>{totalItems}</p>
        </div>

        <div className="card">
          <h3>Highest Price</h3>
          <p>₹{highestPrice}</p>
        </div>

        <div className="card">
          <h3>Lowest Price</h3>
          <p>₹{lowestPrice}</p>
        </div>
      </div>  
      <input
      type="text"
      placeholder="Search by Item Code or Name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      >
      <option value="">Sort By</option>
      <option value="codeAsc">Item Code ↑</option>
      <option value="codeDesc">Item Code ↓</option>
      <option value="priceAsc">Price Low → High</option>
      <option value="priceDesc">Price High → Low</option>
      <option value="newest">Newest Updated</option>
      <option value="oldest">Oldest Updated</option>
      </select>
      <table className="table-container" border="1">
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Old Price</th>
            <th>New Price</th>
            <th>Updated By</th>
            <th>Actions</th>
            <th>Updated At</th>
          </tr>
        </thead>

        <tbody>
        {sortedPrices.length > 0 ? 
        (
          currentRecords.map((price) => (
            <tr key={price._id}>
              <td>{price.itemCode}</td>
              <td>{price.itemName}</td>
              <td>{price.oldPrice}</td>
              <td>{price.newPrice}</td>
              <td>{price.updatedBy}</td>
              <td>
                <div className="action-buttons">
                <button className="edit-btn" onClick={() => onEdit(price)}>
                 Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(price._id)}>
                 Delete
                </button>
                </div>
              </td>
              <td>
              {new Date(price.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))
        ):( <tr><td colSpan="7">No records found</td></tr>)}
        </tbody>
      </table>
      <div className="pagination">
        <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1|| totalPages === 0}
        >
        Previous
        </button>

        <span>
        Page {currentPage} of {totalPages || 1}
        </span>

        <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        >
        Next
        </button>
      </div>
    </div>
  );
}

export default PriceTable;