import { useState, useEffect }from "react";
import API from "../services/api";
import {toast} from "react-toastify";

function PriceForm({ onAdd , selectedPrice,clearSelectedPrice, }) { 
    // onAdd is a callback to refresh the table after adding a price
    //onAdd=handlerefresh in App.jsx
  const emptyForm = {
  _id: "",
  itemCode: "",
  itemName: "",
  oldPrice: "",
  newPrice: "",
  updatedBy: "",
};
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
  if (selectedPrice) {
    setFormData({
      _id: selectedPrice._id,
      itemCode: selectedPrice.itemCode,
      itemName: selectedPrice.itemName,
      oldPrice: selectedPrice.oldPrice,
      newPrice: selectedPrice.newPrice,
      updatedBy: selectedPrice.updatedBy,
    });
  }
}, [selectedPrice]);

useEffect(() => {
  if (selectedPrice) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}, [selectedPrice]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  //setLoading(true);
    try{
 // Item Code validation
  if (!formData.itemCode.trim()) {
    toast.error("Item Code is required");
    setFormData(emptyForm); // clear form on error as well
    return;
  }

  // Item Name validation
  if (!formData.itemName.trim()) {
    toast.error("Item Name is required");
    setFormData(emptyForm); // clear form on error as well
    return;
  }

  // Old Price validation
  if (!formData.oldPrice || Number(formData.oldPrice) <= 0) {
    toast.error("Old Price must be greater than 0");
    setFormData(emptyForm); // clear form on error as well
    return;
  }

  // New Price validation
  if (!formData.newPrice || Number(formData.newPrice) <= 0) {
    toast.error("New Price must be greater than 0");
    setFormData(emptyForm); // clear form on error as well
    return;
  }

  // Updated By validation
  if (!formData.updatedBy.trim()) {
    toast.error("Updated By is required");
    setFormData(emptyForm); // clear form on error as well
    return;
  }
    }
    catch(error)
    {
      console.log(error);
    }

    try 
    {
      let res;
       setLoading(true);

      if (formData._id) //-id:dggbejhiruio exists then update else add new price
      {
      res = await API.put(`/prices/${formData._id}`,formData);
      //clearSelectedPrice();
      //alert("Price Updated Successfully ✅");
      toast.success("Price Updated Successfully ✅");
      clearSelectedPrice();
      } 
      else 
      {
      const { _id, ...priceData } = formData;
      res= await API.post("/prices", priceData);
      //alert("Price Added Successfully ✅");
      toast.success("Price Added Successfully ✅");
      }

      console.log("Saved:", res.data);

      //alert("Price Added Successfully ✅");

      onAdd(); // refresh table

      setFormData(emptyForm); // clear form after submit
    
  
    } catch (error) {
      console.log(error.response?.data);
      //alert("Error saving data ❌");
      toast.error("Error saving data ❌");
      setFormData(emptyForm); // clear form on error as well
    }
    finally {
  setLoading(false);
}
  };

  return (
<div className="form-container">  
    <form onSubmit={handleSubmit}>
      <h2>Price Form</h2>
 
    {formData._id && (
                      <div className="edit-banner">
                        Editing Item: {formData.itemCode}
                        <button type="button" onClick={()=> {
                           clearSelectedPrice();
                           setFormData(emptyForm);
                        }}>
                        Cancel
                        </button>
                      </div>
                    )}



      <input name="itemCode" placeholder="Item Code" value={formData.itemCode} onChange={handleChange} />
      <input name="itemName" placeholder="Item Name" value={formData.itemName} onChange={handleChange} />
      <input  type="number" name="oldPrice" placeholder="Old Price" value={formData.oldPrice} onChange={handleChange} />
      <input type="number" name="newPrice" placeholder="New Price" value={formData.newPrice} onChange={handleChange} />
      <input name="updatedBy" placeholder="Updated By" value={formData.updatedBy} onChange={handleChange} />

      <button
      type="submit"
      className="save-btn"
      disabled={loading}
      >
      {loading
      ? "Saving...": formData._id? "Update": "Save"}
      </button>

    </form>
    </div>
  );
}

export default PriceForm;