
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const SingleRecipe = (props) => {

  const [recipe, setRecipe] = useState({
    'vegetarian': true
  })

  //temporarily added this since was hidden by navbar
  const styles = {
    marginTop: '100px',
    marginLeft: '100px',
    fontSize: '90px'
  }

  console.log(props.match.params.id)

  useEffect(() => {
    axios.get(`https://api.spoonacular.com/recipes/${props.match.params.id}/information`, {
      params: {
        //make secret - don't commit your key:
        'apiKey': process.env.REACT_APP_SPOON_API_KEY
      }
    })
      .then(resp => console.log(resp) + setRecipe(resp.data))
      .catch(err => console.log(err))
  }, [0])

  return (
    <div className="recipes">
      <h1 style={styles}> {recipe.title} </h1>
      <p>{`Vegeterian: ${recipe.vegeterian ? 'yes' : 'no'}`}</p>
      <p>{`Vegan: ${recipe.vegan ? 'yes' : 'no'}`}</p>
      <p>{`Gluten Free: ${recipe.glutenFree ? 'yes' : 'no'}`}</p>
      <img src={recipe.image}></img>
      <div dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
      <h2>Ingredients:</h2>
      <div>{recipe.extendedIngredients ? recipe.extendedIngredients.map((ing, id) => {
        return <div className='ingredient' key={id} onClick={() => null}>{ing.original}</div>
      }) : null}</div>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
    </div>
  )
}
export default SingleRecipe