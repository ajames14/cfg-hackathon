
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'

import veg from './images/veg.png'
import vegan from './images/vegan.png'
import gluten from './images/glut.png'


const SingleRecipe = (props) => {

  const [recipe, setRecipe] = useState({
    // title: 'Pork belly'
  })
  const [saveText, setText] = useState('Save To Favourites')
  const [disabled, setDisable] = useState()

  useEffect(() => {
    axios.get(`https://api.spoonacular.com/recipes/${props.match.params.id}/information`, {
      params: {
        //make secret - don't commit your key:
        'apiKey': process.env.REACT_APP_SPOON_API_KEY
      }
    })
      .then(resp => console.log(resp) + setRecipe(resp.data) + checkId(props.user.favourites, resp.data.id))
      .catch(err => console.log(err))
  }, [props.user])


  function checkId(favs, id) {
    if (favs.includes(id)) {
      setDisable(true)
      setText('Already Saved')
    }
  }

  function save(choice) {
    setDisable(choice)
    choice ? setText('Saved') : setText('Save To Favourites')
    const favArray = props.user.favourites ? [...props.user.favourites] : []
    if (!choice) {
      const index = favArray.indexOf(recipe.id)
      favArray.splice(index, 1)
    } else {
      favArray.push(recipe.id)
    }
    const form = { 'postcode': props.user.postcode ,'favourites': favArray }
    console.log('array after', favArray)

    axios.put('http://localhost:8000/api/profile', form, { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  }


  return (
    <div className="section has-text-centered" id="single-recipe">
      <h1> {recipe.title} </h1>
      <div className="level diets">
        {recipe.vegeterian && <img width='60px' src={veg} />}
        {recipe.vegan && <img width='75px' src={vegan} />}
        {recipe.glutenFree && <img width='65px' src={gluten} />}
        {/* <p>{`Vegeterian: ${recipe.vegeterian ? '✅' : '❌' }`}</p> */}
        {/* <p>{`Vegan: ${recipe.vegan ? '✅' : '❌' }`}</p> */}
        {/* <p>{`Gluten Free: ${recipe.glutenFree ? '✅' : '❌' }`}</p> */}
      </div>
      <img className="recipeImage" width='500px' src={recipe.image}></img>
      {/* <div className="colum"> */}
      {!disabled && <button className="favButton" disabled={disabled} onClick={() => save(true)}>{saveText}</button>}
      {disabled && <button className="favButton" onClick={() => save(false)}>{'Remove From Favourites'}</button>}
      {/* </div> */}
      <div className="columns is-centered">
        <div className="column is-three-quarters" dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
      </div>
      <div className='ingredientSection'>
        <h2 className=''>Ingredients:</h2>
        <div>{recipe.extendedIngredients ? recipe.extendedIngredients.map((ing, id) => {
          return <div className='ingredient' key={id}>{ing.original}</div>
        }) : null}</div>
      </div>
      {recipe.analyzedInstructions && <div className='allSteps'>{recipe.analyzedInstructions[0] ? recipe.analyzedInstructions[0].steps.map((step, id) => {
        return <div className='stepInfo' key={id}><p className='stepNum'>{`${step.number}.`}</p><p>{step.step}</p></div>
      }) : 'No steps provided by this recipe'}</div>}
    </div>
  )
}
export default SingleRecipe