import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'

import jsonOptions from '../db/top-1k-ingredients.json'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const FilteredRecipeForm = ({ setRecipes }) => {

  const [form, updateForm] = useState()
  const [error, setError] = useState()

  const [tags, setTags] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {
    console.log(jsonOptions)
    const newOptions = jsonOptions.map(option => {
      return { value: option.ingredient, label: option.ingredient }
    })
    setOptions(newOptions)
  }, [])

  // function handleInput(e) {
  //   updateForm({ ...form, [e.target.name]: e.target.value })
  // }

  function handleSubmit(e) {
    e.preventDefault()
    // console.log(form)
    // const foodArray = []
    // for (const food in form) {
    //   form[food] ? foodArray.push(form[food]) : null
    // }
    const ingredients = tags.toString()
    console.log(ingredients)

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

  function handleSelect(selectedItems) {
    console.log(selectedItems)
    if (selectedItems === null) return setTags([])
    const newSelection = selectedItems.map(item => item.value)
    setTags(newSelection)
  }

  return (
    <div>
      {console.log('OPTIONS', options)}
      {console.log('SELECTION', tags)}
      <div className="search-title">
        Enter up to five ingredients from your cupboard...
      </div>
      <form className="form">
        {/* <input className="ingredient-input" type="text" name="food1" onChange={(e) => handleInput(e)} />
        <input className="ingredient-input" type="text" name="food2" onChange={(e) => handleInput(e)} />
        <input className="ingredient-input" type="text" name="food3" onChange={(e) => handleInput(e)} />
        <input className="ingredient-input" type="text" name="food4" onChange={(e) => handleInput(e)} />
        <input className="ingredient-input" type="text" name="food5" onChange={(e) => handleInput(e)} /> */}
        <div className="field">
          <div className="control">
            <Select 
              isMulti
              options={options} 
              onChange={handleSelect}
            />         
          </div>
        </div>
      </form>
      <button className="button searchbutton is-primary" onClick={(e) => handleSubmit(e)}><i className="fas fa-search"></i></button>
    </div>

  )
}
export default FilteredRecipeForm