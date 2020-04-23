
import React, { useState, useEffect } from 'react'
import FilterForm from './FilterForm'
import RecipeCard from './RecipeCard'

const Recipes = (props) => {

  const [recipes, setRecipes] = useState()

  //temporarily added this since was hidden by navbar
  const styles = {
    marginTop: '100px',
    marginLeft: '100px',
    fontSize: '90px'
  }

  return (
    <div className="section" id="recipes-search">
      <div className="columns">

        <div className="column is-one-quarter" id="searchbar">
          <FilterForm setRecipes={setRecipes} />
        </div>

        <div className="column is-one-quarter" id="image"></div>

        <div className="column" id="recipe-results">
          {recipes ? recipes.map((res, id) => {
            return <RecipeCard key={id} res={res} props={props} />
          }) : <div className="recipes-placeholder is-size-4">Search for some ingredients and recipes will appear here...</div>}
        </div>

      </div>

    </div>

  )
}
export default Recipes

