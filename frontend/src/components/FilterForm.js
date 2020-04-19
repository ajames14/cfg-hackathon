import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FilteredRecipeForm = ({ setRecipes }) => {

  const [form, updateForm] = useState()
  const [error, setError] = useState()

  function handleInput(e) {
    updateForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(form)
    const foodArray = []
    for (const food in form) {
      form[food] ? foodArray.push(form[food]) : null
    }
    const ingredients = foodArray.toString()

    axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        //make secret - don't commit your key:
        'apiKey': process.env.REACT_APP_SPOON_API_KEY,
        'ingredients': ingredients,
        'number': 12 // number of recipes you want returned
      }
    })
      .then(resp => console.log(resp) + setRecipes(resp.data))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="search-title">
        Enter up to five ingredients from your cupboard...
      </div>
      <form className="form">
        <input className="ingredient-input" type="text" name="food1" onChange={(e) => handleInput(e)} />
        <input className="ingredient-input" type="text" name="food2" onChange={(e) => handleInput(e)} />
        <input className="ingredient-input" type="text" name="food3" onChange={(e) => handleInput(e)} />
        <input className="ingredient-input" type="text" name="food4" onChange={(e) => handleInput(e)} />
        <input className="ingredient-input" type="text" name="food5" onChange={(e) => handleInput(e)} />
      </form>
      <button className="button searchbutton is-primary" onClick={(e) => handleSubmit(e)}><i className="fas fa-search"></i></button>
    </div>

  )
}
export default FilteredRecipeForm