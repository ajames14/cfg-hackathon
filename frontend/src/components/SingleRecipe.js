
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'


const SingleRecipe = (props) => {

  const [recipe, setRecipe] = useState({})
  const [saveText, setText] = useState('Save Recipe To Favourites')
  const [disabled, setDisable] = useState()

  //temporarily added this since was hidden by navbar
  const styles = {
    marginTop: '100px',
    marginLeft: '100px',
    fontSize: '90px'
  }

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
    const favArray = [...props.user.favourites]
    if (!choice) {
      const index = favArray.indexOf(recipe.id)
      favArray.splice(index, 1)
    } else {
      props.user.favourites ? favArray.push(recipe.id) : [recipe.id]
    }
    const form = { 'favourites': favArray }
    console.log('array after', favArray)

    axios.put('http://localhost:8000/api/profile', form, { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  }


  return (
    <div className="recipes">
      <h1 style={styles}> {recipe.title} </h1>
      <button disabled={disabled} onClick={() => save(true)}>{saveText}</button>
      { disabled && <button onClick={() => save(false)}>{'remove'}</button>}
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