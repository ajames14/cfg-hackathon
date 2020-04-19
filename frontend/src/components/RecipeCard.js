
import React from 'react'

const Recipes = ({ props, res }) => {

  return (
    <div className='recipe' onClick={() => null}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={res.image} alt="Placeholder image" />
          </figure>
          <div className="card-title">
            {res.title}
          </div>
        </div>

      </div>

    </div>
  )
}
export default Recipes

