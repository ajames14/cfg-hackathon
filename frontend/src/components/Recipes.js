
import React, { useState, useEffect } from 'react'
import FilterForm from './FilterForm'

const Recipes = (props) => {

  const [recipes, setRecipes] = useState()

  //temporarily added this since was hidden by navbar
  const styles = {
    marginTop: '100px',
    marginLeft: '100px',
    fontSize: '90px'
  }

  return (
    <div className="recipes">
      <h1 style={styles}> Recipes </h1>
      <div>
        <FilterForm setRecipes={setRecipes} />
      </div>
      <div className='recipeAll'>{recipes ? recipes.map((res, id) => {
        return <div className='recipe' key={id} onClick={() => null}><h2>{res.title}</h2><img className='recipeImage' src={res.image}></img></div>
      }) : null}</div>
    </div>
  )
}
export default Recipes

