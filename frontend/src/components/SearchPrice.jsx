import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function SearchPrice() {
  const [itemCode, setItemCode] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    try {
        if (!itemCode.trim()) 
            {
            //alert("Enter Item Code");
            toast.error("Enter Item Code");
            return;
            }
      const res = await API.get(
        `/prices/search/${itemCode}`
      );

      setResult(res.data.data);
       setItemCode(""); // clear input
    } catch (error) {
      
  setResult(null);
  toast.error("Item not found");
  //alert("Item not found");
  setItemCode(""); // clear input

    }
  };

  return (
    <div>
      <h2>Search Item</h2>
<form className="search-form"
  onSubmit={(e) => {
    e.preventDefault();
    handleSearch();
  }}
>
  <input
    type="text"
    placeholder="enter ItemCode here to search"
    value={itemCode}
    onChange={(e) => setItemCode(e.target.value)}
  />

  <button className="save-btn" type="submit">
    Search
  </button>
</form>

      {result && (
        <div className="search-container">
          <h3>Result</h3>

          <p>Code: {result.itemCode}</p>
          <p>Name: {result.itemName}</p>
          <p>Old Price: {result.oldPrice}</p>
          <p>New Price: {result.newPrice}</p>
          <p>Updated By: {result.updatedBy}</p>
        </div>
      )}
    </div>
  );
}

export default SearchPrice;