import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'


import UserContext from './UserContext'

const Profile = (props) => {

  const [user, setUser] = useState({})
  // const { userInfo, setUserInfo } = useContext(UserContext)
  const [ favourites, setFav ] = useState([])

  useEffect(() => {
    fetch('/api/profile', { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
      .then(resp => resp.json())
      .then((resp) => {
        console.log('dataaa', resp)
        setUser(resp)
        // getFavourites(resp)
      })
      .catch((err) => console.log(err))
    addSweep()
  }, [0])

  function addSweep() {
    const sweep = document.querySelector('.sweep')
    sweep ? sweep.classList.add('slideActive') : null
  }

  function getFavourites(resp) {
    console.log('FAVS', resp.favourites.toString())

    axios.get('https://api.spoonacular.com/recipes/informationBulk', {
      params: {
        'apiKey': process.env.REACT_APP_SPOON_API_KEY,
        'ids': resp.favourites.toString(),
        'includeNutrition': false
      }
    })
      .then(resp => console.log(resp.data) + setFav(resp.data))
      .catch(err => console.log(err))
  }


  return (
    <div className='section has-text-centered' id='profile'>
      <header>{user.username}<span className='sweep slideBefore'></span></header>
      <h2>Favourites</h2>
      <div>{favourites ? favourites.map((fav, id) => {
        return <div className='ingredient' key={id}><h3>{fav.title + console.log(fav)}</h3><img src={fav.image}></img></div>
      }) : null}</div>
    </div>
  )
}
export default Profile