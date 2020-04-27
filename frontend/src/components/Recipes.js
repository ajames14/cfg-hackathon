
import React, { useState, useEffect } from 'react'
import FilterForm from './FilterForm'
import RecipeCard from './RecipeCard'

const pageNum = 3
let pageArray = []

const Recipes = (props) => {

  const [recipes, setRecipes] = useState()
  const [page, setPage] = useState(1)

  //temporarily added this since was hidden by navbar
  const styles = {
    marginTop: '100px',
    marginLeft: '100px',
    fontSize: '90px'
  }

  useEffect(() => {
    pageArray = []
    for (let i = 1; i <= pageNum; i++) {
      pageArray.push(i)
    }
  }, [])

  function filterRecipes(allRecipes) {
    const start = 0 + (page - 1) * 12
    return allRecipes.filter((recipe, index) => (start <= index) && (index < start + 12))
  }

  function handlePage(pageNumber) {
    setPage(pageNumber)
  }

  function handleNext() {
    if (page < pageNum) {
      setPage(page + 1)
    }
  }

  function handlePrevious() {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <div className="section" id="recipes-search">
      <div className="container">
        <div className="columns">

          <div className="column is-one-quarter" id="searchbar">
            <FilterForm setRecipes={setRecipes} pageNum={pageNum} />
          </div>

          <div className="column is-one-quarter" id="image"></div>

          <div className={'column' + `${recipes ? '' : ' empty-placeholder'}`} id="recipe-results">
            {recipes ? 
              <>
              {filterRecipes(recipes).map((res, id) => {
                return <RecipeCard key={id} res={res} props={props} />
              })}
              <div className="level" id="recipe-pages">
                <nav className="level-item pagination is-centered is-small" role="navigation" aria-label="pagination">
                  <a className="pagination-previous" onClick={() => handlePrevious()}><i className="fas fa-chevron-left"></i></a>
                  
                  <ul className="pagination-list">
                    {pageArray.map((pageNumber, i) => {
                      return <li key={i}><a className={'pagination-link' + `${page === pageNumber ? ' is-current' : ''}`} onClick={() => handlePage(pageNumber)}>{pageNumber}</a></li>
                    })}
                  </ul>
                  <a className="pagination-next" onClick={() => handleNext()}><i className="fas fa-chevron-right"></i></a>
                </nav>

              </div>
              </>
              : <div className="recipes-placeholder is-size-4">Search for some ingredients and recipes will appear here...</div>}
          </div>

        </div>
      </div>
    </div>

  )
}
export default Recipes

