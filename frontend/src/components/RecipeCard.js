
import React from 'react'

const Recipes = ({ props, res }) => {

  function handleClick(id) {
    props.history.push(`/recipe/${id}`)
  }

  return (
    <div className="recipe" onClick={() => handleClick(res.id)}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={res.image} alt="Placeholder image" />
          </figure>
          <div className="card-title">
            <div className="title-text">
              {res.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Recipes

