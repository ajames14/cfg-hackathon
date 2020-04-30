import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'

import jsonOptions from '../db/top-1k-ingredients.json'

const FilteredRecipeForm = ({ setRecipes, pageNum }) => {

  // const [form, updateForm] = useState()
  const [error, setError] = useState()

  const [tags, setTags] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {
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
    const ingredients = tags.toString()
    console.log(ingredients)

    axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients', {
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_SPOON_API_KEY
      }, 
      params: {
        'ingredients': ingredients,
        'ranking': 1, // 1 = maximise used ingredients , 2 = minimise missing ingredients
        'ignorePantry': true,
        'number': 12 * pageNum // number of recipes you want returned
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

  function handleRanking(e) {
    setRanking(e.target.id)
  }

  return (
    <div>
      {console.log('OPTIONS', options)}
      {console.log('SELECTION', tags)}
      <div className="search-title is-size-5">
        Enter some ingredients from your cupboard...
      </div>
      <form className="form">
        <div className="field">
          <div className="control">
            <Select 
              isMulti 
              options={options} 
              onChange={handleSelect}
              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#ffd6a5',
                  primary: '#fa9012',
                  danger: '#fa9012',
                  dangerLight: '#ffd6a5',
                  neutral10: '#ffd6a5'                }
              })}
            />         
          </div>
        </div>
      </form>
      <button className="button searchbutton is-primary" onClick={(e) => handleSubmit(e)}><i className="fas fa-search"></i></button>
    </div>

  )
}
export default FilteredRecipeForm