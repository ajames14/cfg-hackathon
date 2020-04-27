import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import ReactFilestack from 'filestack-react'


import UserContext from './UserContext'

const options = {
  accept: 'image/*',
  transformations: {
    crop: true,
    circle: true,
    rotate: true
  }
}

const Profile = (props) => {

  const [user, setUser] = useState({})
  // const { userInfo, setUserInfo } = useContext(UserContext)
  const [favourites, setFav] = useState([])
  const [image, setImg] = useState()

  useEffect(() => {
    fetch('/api/profile', { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
      .then(resp => resp.json())
      .then((resp) => {
        setUser(resp)
        setImg(resp.image)
        getFavourites(resp)
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

  const handleImageUpload = (res) => {
    console.log('UPLOAD', res.filesUploaded[0].url)
    setImg(res.filesUploaded[0].url)
    const form = { 'postcode': user.postcode, 'image': res.filesUploaded[0].url }

    axios.put('http://localhost:8000/api/profile', form, { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  }


  return (
    <div className='section has-text-centered' id='profile'>
      <header><h1>{user.username}</h1><span className='sweep slideBefore'></span></header>
      <h2>Favourites</h2>
      <div>{favourites ? favourites.map((fav, id) => {
        return <div className='ingredient' key={id}><h3>{fav.title}</h3><img src={fav.image}></img></div>
      }) : null}</div>

      <div className="hero-body group-page">
        <ReactFilestack
          preload={true}
          apikey={process.env.REACT_APP_IMG_API_KEY}
          options={options}
          customRender={({ onPick }) => (
            <div id="profile-banner-center" onClick={onPick}>
              <figure className="image is-128x128">
                <img className="is-rounded" src={!image ? 'https://bulma.io/images/placeholders/128x128.png' : image} />
              </figure>
              <div className={scroll < 100 ? 'down-arrow down bounce' : 'down-arrow down gone'}></div>
            </div>
          )}
          onSuccess={handleImageUpload}
        />
      </div>
    </div>
  )
}
export default Profile