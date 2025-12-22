import { useState } from 'react';
import './App.css';


function App() {
  const [Wardrobe, setWardrobe] = useState([
    { type: 'Shirt', color: 'Black', material: 'Cotton', season: 'Summer'},
    { type: 'Pants', color: 'Blue', material: 'Denim', season: 'All'},
    { type: 'Jacket', color: 'Brown', material: 'Leather', season: 'Winter'}
    
    
  ])
  
  const [newItem, setNewItem] = useState({
    type: '', 
    color: '', 
    material: '',
    season: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };

  const addItem = () => { 
    if(newItem.type && newItem.color && newItem.material && newItem.season) {
      setWardrobe([...Wardrobe, newItem]);
      setNewItem({ type: '', color: '', material: '', season: '' });
    } else {
      alert("Please fill in all fields");
    }

  };


   return (
   <div className = "App"  >
    <h1>My Outfit Generator </h1> 
    {/* form to add a new item to the wardrobe */}

    <div style = {{ border: '10px solid black', padding: '20px', margin: '20px', backgroundColor: 'lightgray'   }}>
      <h2>Add New Item</h2>

      <input 
        type = "text"
        name = "type"
        placeholder = "Type (e.g. Shirt, Pants)"
        value = {newItem.type}
        onChange= {handleInputChange}
        style= {{ marging: '5px', padding: '80x' }}
        />

        <input
          type = "color"
          name = "color"
          placeholder = "Color"
          value = {newItem.color}
          onChange = {handleInputChange}
          style = {{ margin: '5px', padding: '8px' }}
        />

        <input
          type = "text"
          name = "material" 
          placeholder= "Material"
          value = {newItem.material}
          onChange = {handleInputChange}
          style = {{ margin: '5px', padding: '8px'}}
        />

        <input 
          type = "text"
          name = "season" 
          placeholder = "Season" 
          value = {newItem.season}
          onChange = {handleInputChange}
          style = {{ margin: '5px', padding: '8px'}}
        />

        <br />
        <button onClick = {addItem} style = {{ margin: '10px', padding: '10px 20px'}}>
          Add to Wardrobe
        </button>

    </div>

    {/* map over the wardrobe array and display each item's type, color, material, and season */}
    <h2>My Wardrobe ({Wardrobe.length} items)</h2>
    <p>You have {Wardrobe.length} items in your wardrobe</p>
    <div>
    {Wardrobe.map((item, index) => (
      <div key= {index} style = {{ border: '10px solid black', padding: '10px', margin: '10px', backgroundColor: 'lightgray' }}>
        <h3>{item.type}</h3>
        <p>Color: {item.color}</p>
        <p>Material: {item.material}</p>
        <p>Season: {item.season}</p>
      </div>
    ))}
   </div>
  </div>
 );



 }
 export default App;

