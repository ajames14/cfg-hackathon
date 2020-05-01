import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'

import veg from './images/veg.png'
import vegan from './images/vegan.png'
import gluten from './images/glut.png'

const SingleRecipe = (props) => {
  const [recipe, setRecipe] = useState({
    title: 'Issue with Spoonacular api'
    // vegeterian: true,
    // vegan: true,
    // glutenFree: true
  })
  const [saveText, setText] = useState('Save To Favourites')
  const [disabled, setDisable] = useState()
  const [favourited, setFavourite] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    axios
      .get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${props.match.params.id}/information`,
        {
          headers: {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host':
              'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_SPOON_API_KEY
          }
        }
      )
      .then((resp) => console.log(resp) + setRecipe(resp.data) + getUser(resp))
      .catch((err) => console.log(err))
    setTimeout(() => {
      addSweep()
    }, 500)
  }, [0])

  function getUser(recipe) {
    fetch('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setUser(resp)
        checkId(resp.favourites, recipe.data.id)
      })
      .catch((err) => console.log(err))
  }

  function checkId(favs, id) {
    if (favs.includes(id)) {
      // setDisable(true)
      setFavourite(true)
      setText('Remove From Favourites')
    } else if (favs.length >= 20) {
      setFavourite(true)
      setDisable('disabled')
      setText('Too many favourites')
    }
  }

  function save(choice) {
    if (disabled !== 'disabled') {
      // setDisable(choice)
      setFavourite(choice)
      choice ? setText('Remove from favourites') : setText('Save To Favourites')
      const favArray = user.favourites ? [...user.favourites] : []
      if (!choice) {
        const index = favArray.indexOf(recipe.id)
        favArray.splice(index, 1)
      } else {
        favArray.push(recipe.id)
      }
      const form = { favourites: favArray }
      console.log('array after', favArray)

      axios
        .put('/api/profile', form, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err))
    }
  }

  function addSweep() {
    const sweep = document.querySelector('.sweep')
    sweep ? sweep.classList.add('slideActive') : null
  }

  return (
    <div className="section" id="single-recipe">
      <div className="columns is-multiline">
        <div className="column is-half">
          <header>
            <div className="title">{recipe.title}</div>
            <div className="level diets">
              {recipe.vegeterian && <h2>Vegetarian</h2>}
              {recipe.vegan && <h2>Vegan</h2>}
              {recipe.glutenFree && <h2>Gluten Free</h2>}

              {/* {recipe.vegeterian && <img width="60px" src={veg} />}
          {recipe.vegan && <img width="75px" src={vegan} />}
          {recipe.glutenFree && <img width="65px" src={gluten} />} */}
              {/* <p>{`Vegeterian: ${recipe.vegeterian ? '✅' : '❌' }`}</p> */}
              {/* <p>{`Vegan: ${recipe.vegan ? '✅' : '❌' }`}</p> */}
              {/* <p>{`Gluten Free: ${recipe.glutenFree ? '✅' : '❌' }`}</p> */}
            </div>
            <span className="sweep slideBefore"></span>
          </header>
        </div>
        <div className="column is-half" id="column-2">
          {/* <img className="recipeImage" width="500px" src={recipe.image}></img> */}
          <div
            className="dangerHtml"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          ></div>

          <div className="ingredientSection">
            <h2 className="">Ingredients:</h2>
            <div>
              {recipe.extendedIngredients
                ? recipe.extendedIngredients.map((ing, id) => {
                    return (
                      <div className="ingredient" key={id}>
                        {ing.original}
                      </div>
                    )
                  })
                : null}
            </div>
            {!favourited && Auth.isAuthorized() && (
              <button className="favButton" onClick={() => save(true)}>
                {saveText}
              </button>
            )}
            {favourited && Auth.isAuthorized() && (
              <button
                className={'favButton' + ' ' + disabled}
                onClick={() => save(false)}
              >
                {saveText}
              </button>
            )}
            <button className="favButton" id='ingredientButton' onClick={() => props.history.push('/foodswap')}>Missing some Ingredients?</button>
          </div>
          {recipe.analyzedInstructions && (
            <div className="allSteps">
              {recipe.analyzedInstructions[0]
                ? recipe.analyzedInstructions[0].steps.map((step, id) => {
                    return (
                      <div className="stepInfo" key={id}>
                        <p className="stepNum">{`${step.number}.`}</p>
                        <p>{step.step}</p>
                      </div>
                    )
                  })
                : 'No steps provided by this recipe'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default SingleRecipe
