import { useEffect, useRef, useState } from "react";
import "./App.css";

const API_ID = "e5dd7957";
const API_KEY = "d27f570dbfe58680e5067d1ddb4b0334";

function App() {
  const [ingredientList, setIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef();

  const search = () => {
    const input = searchRef.current.value;
    searchForRecipe(input);
    searchRef.current.value = "";
  };

  const searchForRecipe = (query) => {
    setLoading(true);
    fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIngredientList(data.hits);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    searchForRecipe("chicken");
  }, []);

  return (
    <div className="app">
      <div className="app_search">
        <input ref={searchRef} type="text" placeholder="Search for recipe..." />
        <button onClick={search}>Search</button>
      </div>
      {loading && <p style={{ color: "red" }}>Loading...</p>}
      <div className="app_ingredientWrapper">
        {ingredientList.map(({ recipe }, index) => {
          const { label, image, ingredientLines } = recipe;
          return (
            <div key={index} className="app_ingredient">
              <span>{label}</span>
              <img src={image} alt="recipe" />
              <div className="app_steps">
                {ingredientLines.map((step, index) => {
                  return (
                    <p key={index}>
                      {index + 1}: {step}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
