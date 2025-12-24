import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [Wardrobe, setWardrobe] = useState(() => {
    const saved = localStorage.getItem('Wardrobe');
    if (saved) {
      return JSON.parse(saved);  
    }
   return [
      { type: 'Shirt', color: 'Black', material: 'Cotton', season: 'Summer'},
      { type: 'Pants', color: 'Blue', material: 'Denim', season: 'All'},
      { type: 'Jacket', color: 'Brown', material: 'Leather', season: 'Winter'},
      { type: 'Sweater', color: 'White', material: 'Wool', season: 'Fall'},
      { type: 'Hoodie', color: 'Gray', material: 'Fleece', season: 'Fall'},
      { type: 'Coat', color: 'Red', material: 'Down', season: 'Winter'}    
  ];
  });  
  const [newItem, setNewItem] = useState({
    type: '', 
    color: '', 
    material: '',
    season: ''
  });

  const [generatedOutfit, setGeneratedOutfit] = useState(null);

  useEffect(() => {
    localStorage.setItem('Wardrobe', JSON.stringify(Wardrobe));
  }, [Wardrobe]);


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

  const deleteItem = (index) => {
    setWardrobe(Wardrobe.filter((_, i) => i !== index));
  };

  const generateOutfit = () => {
    const tops = Wardrobe.filter(item =>
      item.type === 'Shirt' || item.type === 'Sweater' || item.type === 'Hoodie'
    );
    const bottoms = Wardrobe.filter(item =>
      item.type === 'Pants'
    );
    const outwear = Wardrobe.filter(item =>
      item.type === 'Jacket' || item.type === 'Coat'
    );

    if (tops.length === 0 || bottoms.length === 0) { 
      alert("You need at least one top and one bottom to generate an outfit.");
      return;
    }
    const randomTop = tops[Math.floor(Math.random() * tops.length)];
    const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
    const randomOutwear = outwear.length > 0
      ? outwear[Math.floor(Math.random() * outwear.length)]
      : null;

      setGeneratedOutfit({
        top: randomTop,
        bottom: randomBottom, 
        outwear: randomOutwear
      });
  };


   return (
   <div className = "App"  >
    <h1>My Outfit Generator </h1> 
    {/* form to add a new item to the wardrobe */}

    <div style = {{ border: '10px solid black', padding: '20px', margin: '20px', backgroundColor: 'lighblue'   }}>
      <h2>Add New Item</h2>

      <select name = "type" value = {newItem.type} onChange = {handleInputChange}>
        <option value = " ">Select Type</option>
        <option value = "Shirt">Shirt</option>
        <option value = "Pants">Pants</option>
        <option value = "Jacket">Jacket</option>
        <option value = "Sweater">Sweater</option>
        <option value = "Hoodie">Hoodie</option>
      </select>

        <input
          type = "text"
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

        <select name = "season" value = {newItem.season} onChange  = {handleInputChange}>
          <option value = " "> Select Season </option>
          <option value = "Spring">Spring</option>
          <option value = "Summer">Summer</option>
          <option value = "Fall">Fall</option>
          <option value = "Winter">Winter</option>
        </select>

        <br />
        <button onClick = {addItem} style = {{ margin: '10px', padding: '10px 20px'}}>
          Add to Wardrobe
        </button>

    </div>
    
    <div style = {{ border: '10px solid black', padding: '20px', margin: '20px', backgroundColor: 'lightblue' }}>
      <h2>Generate Random Outfit</h2>
      <button
        onClick = {generateOutfit}
        style ={{
          margin: '10px',
          padding: '15px 30px',
          backgroundColor: 'purple',
          color: 'white',
          border: 'none',
        }}
      >Generate Outfit</button>

      {/* display the generated outfit */ }
      {generatedOutfit && (
        <div style = {{ margin: '20px', padding: ' 15px', backgroundColor: 'white', borderRadius: '5px'}}>
          <h3>Your Outfit:</h3>

          <div style= {{ border: '2px solid black', padding: '10px', margin: '10px', }}>
            <h4>Top: {generatedOutfit.top.type}</h4>
            <p> Color: {generatedOutfit.top.color}</p>
            <p>Material: {generatedOutfit.top.material}</p>
            <p>Season: {generatedOutfit.top.season}</p>
          </div>

          <div style = {{ border: '2px solid black', padding: '10px', margin: '10px' }}>
            <h4>Bottom: {generatedOutfit.bottom.type}</h4>
            <p> Color: {generatedOutfit.bottom.color}</p>
            <p>Material: {generatedOutfit.bottom.material}</p>
            <p>Season: {generatedOutfit.bottom.season}</p>
          </div>

          <div style = {{ border: '2px solid black', padding: '10px', margin: '10px' }}>
            <h4>Outwear: {generatedOutfit.outwear.type}</h4>
            <p> Color: {generatedOutfit.outwear.color}</p>
            <p>Material: {generatedOutfit.outwear.material}</p>
          </div>
        </div>
      )}
    </div>

    {/* map over the wardrobe array and display each item's type, color, material, and season */}
    <h2>My Wardrobe ({Wardrobe.length} items)</h2>
    <p>You have {Wardrobe.length} items in your wardrobe</p>
    <div>
    {Wardrobe.map((item, index) => (
      <div key= {index} style = {{ border: '5px solid black', padding: '10px', margin: '10px', backgroundColor: 'lightblue' }}>
        <h3>{item.type}</h3>
        <p>Color: {item.color}</p>
        <p>Material: {item.material}</p>
        <p>Season: {item.season}</p>

        <br />
        <button onClick = {() => deleteItem(index)} style = {{ margin: '10px', padding: '10px 20px' }}>
          Delete</button>
      </div>
    ))}
   </div>
  </div>
 );



 }
 export default App;

