import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const handlePetClick = () => {
    let apiUrl = "http://localhost:3001/pets";

    if (filters.type !== "all") {
      apiUrl += `?type=${filters.type}`;
    }

    fetch(apiUrl)
      .then((r) => r.json())
      .then((allPets) => setPets(allPets));
  };

  function handleChange(e) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: e.target.value,
    }));
  }

  function onAdoptPet(id) {
    console.log("onAdoptPet called with id:", id);
    const updatedPets = pets.map((pet) => {
      if (pet.id === id) {
        return { ...pet, isAdopted: true }; // Update the isAdopted property
      }
      return pet;
    });
    setPets(updatedPets);
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={handleChange}
              onFindPetsClick={handlePetClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser setPets={setPets} pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
