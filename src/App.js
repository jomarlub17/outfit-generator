import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [Wardrobe, setWardrobe] = useState(() => {
    const saved = localStorage.getItem('wardrobe');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { type: 'Shirt', color: 'Black', material: 'Cotton', season: 'Summer'},
      { type: 'Pants', color: 'Blue', material: 'Denim', season: 'All'},
      { type: 'Jacket', color: 'Brown', material: 'Leather', season: 'Winter'}
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
    localStorage.setItem('wardrobe', JSON.stringify(Wardrobe));
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

  const clearWardrobe = () => {
    if (window.confirm('Are you sure you want to delete all items?')) {
      setWardrobe([]);
      setGeneratedOutfit(null);
    }
  };

  const generateOutfit = () => {
    const tops = Wardrobe.filter(item => 
      item.type === 'Shirt' || item.type === 'Sweater' || item.type === 'Hoodie' || item.type === 'blouse'
      || item.type === 'Dress Shirt'
    );
    const bottoms = Wardrobe.filter(item => 
      item.type === 'Pants' || item.type === 'Shorts' || item.type === 'Skirt'
      || item.type === 'Dress Pants'
    );
    const outerwear = Wardrobe.filter(item => 
      item.type === 'Jacket' || item.type === 'Coat' || item.type === 'Vest'
      || item.type === 'Sweater'
    );

    if (tops.length === 0 || bottoms.length === 0) {
      alert('You need at least one top and one bottom to generate an outfit!');
      return;
    }

    const randomTop = tops[Math.floor(Math.random() * tops.length)];
    const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
    const randomOuterwear = outerwear.length > 0 
      ? outerwear[Math.floor(Math.random() * outerwear.length)]
      : null;

    setGeneratedOutfit({
      top: randomTop,
      bottom: randomBottom,
      outerwear: randomOuterwear
    });
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="app-header">
        <h1>The OutFit Generator</h1>
        <p>Your personal wardrobe</p>
      </div>

      {/* Add Item Section */}
      <div className="add-item-section">
        <h2>➕ Add New Item</h2>
        <div className="form-grid">
          {/* Dropdown For Type */}
          <select name="type" value={newItem.type} onChange={handleInputChange}>
            <option value="">Select Type</option>
            <option value="Shirt">Shirt</option>
            <option value="Pants">Pants</option>
            <option value="Jacket">Jacket</option>
            <option value="Sweater">Sweater</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Shorts">Shorts</option>
            <option value="Skirt">Skirt</option>
            <option value="Dress Pants">Dress Pants</option>
            <option value="Coat">Coat</option>
            <option value="Blouse">Blouse</option>
            <option value="Vest">Vest</option>
            <option value="Dress Shirt">Dress Shirt</option>
          </select>

          <input
            type="text"
            name="color"
            placeholder="Color"
            value={newItem.color}
            onChange={handleInputChange}
          />
        {/* Dropdown For Material */}
         <select name = "material" value = {newItem.material} onChange = {handleInputChange}>
            <option value = "">Select Material</option>
            <option value = "Cotton">Cotton</option>
            <option value = "Polyester">Polyester</option>
            <option value = "Denim">Denim</option>
            <option value = "Leather">Leather</option>
            <option value = "Silk">Silk</option>
            <option value = "Wool">Wool</option>
            <option value = "Fleece">Fleece</option>
            <option value = "Spandex">Spandex</option>
            <option value = "Linen">Linen</option>
            <option value = "cotton-polyester blend">Cotton-Polyester Blend</option>
         </select>

          {/* Dropdown For Season */}
          <select name="season" value={newItem.season} onChange={handleInputChange}>
            <option value="">Select Season</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
          </select>
        </div>

        <div className="button-group">
          <button onClick={addItem} className="btn btn-primary">
            Add to Wardrobe
          </button>
          <button onClick={clearWardrobe} className="btn btn-danger">
            Clear All Items
          </button>
        </div>
      </div>

      {/* Outfit Generator Section */}
      <div className="generator-section">
        <h2>🎲 Generate Random Outfit</h2>
        <button onClick={generateOutfit} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '15px 40px' }}>
          Generate Outfit
        </button>

        {generatedOutfit && (
          <div className="generated-outfit">
            <h3>Your Perfect Outfit</h3>
            <div className="outfit-items">
              <div className="outfit-item">
                <h4>Top</h4>
                <p><strong>Type:</strong> {generatedOutfit.top.type}</p>
                <p><strong>Color:</strong> {generatedOutfit.top.color}</p>
                <p><strong>Material:</strong> {generatedOutfit.top.material}</p>
                <p><strong>Season:</strong> {generatedOutfit.top.season}</p>
              </div>

              <div className="outfit-item">
                <h4>Bottom</h4>
                <p><strong>Type:</strong> {generatedOutfit.bottom.type}</p>
                <p><strong>Color:</strong> {generatedOutfit.bottom.color}</p>
                <p><strong>Material:</strong> {generatedOutfit.bottom.material}</p>
                <p><strong>Season:</strong> {generatedOutfit.bottom.season}</p>
              </div>

              {generatedOutfit.outerwear && (
                <div className="outfit-item">
                  <h4>Outerwear</h4>
                  <p><strong>Type:</strong> {generatedOutfit.outerwear.type}</p>
                  <p><strong>Color:</strong> {generatedOutfit.outerwear.color}</p>
                  <p><strong>Material:</strong> {generatedOutfit.outerwear.material}</p>
                  <p><strong>Season:</strong> {generatedOutfit.outerwear.season}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Wardrobe Display */}
      <div className="wardrobe-section">
        <h2>My Wardrobe</h2>
        <p className="item-count">You have {Wardrobe.length} items in your wardrobe</p>
        
        <div className="wardrobe-grid">
          {Wardrobe.map((item, index) => (
            <div key={index} className="clothing-card">
              <h3>{item.type}</h3>
              <p><strong>Color:</strong> {item.color}</p>
              <p><strong>Material:</strong> {item.material}</p>
              <p><strong>Season:</strong> {item.season}</p>
              <button onClick={() => deleteItem(index)} className="btn btn-delete">
                Delete Item
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;