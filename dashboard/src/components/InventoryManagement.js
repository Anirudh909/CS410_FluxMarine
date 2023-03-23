import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryManagement.css';

function InventoryManagementSystem() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);

  useEffect(() => {
    axios.get('/api/inventory')
      .then(response => {
        setInventoryItems(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleAddItem = () => {
    axios.post('/api/inventory', {
      name: itemName,
      quantity: itemQuantity
    })
    .then(response => {
      setInventoryItems([...inventoryItems, response.data]);
      setItemName('');
      setItemQuantity(0);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const handleDeleteItem = (id) => {
    axios.delete(`/api/inventory/${id}`)
      .then(() => {
        const updatedInventoryItems = inventoryItems.filter(item => item.id !== id);
        setInventoryItems(updatedInventoryItems);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Inventory Management System</h1>
      <h2>Add Item</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        
        <input
          type="text"
          placeholder="Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>
    </div>
  );
}

export default InventoryManagementSystem;
