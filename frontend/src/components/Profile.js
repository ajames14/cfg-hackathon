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
  const [favourites, setFav] = useState([{ 'title': 'flapjack', 'image': 'https://bulma.io/images/placeholders/128x128.png' }, { 'title': 'flapjack', 'image': 'https://bulma.io/images/placeholders/128x128.png' }, { 'title': 'flapjack', 'image': 'https://bulma.io/images/placeholders/128x128.png' }, { 'title': 'flapjack', 'image': 'https://bulma.io/images/placeholders/128x128.png' }, { 'title': 'flapjack', 'image': 'https://bulma.io/images/placeholders/128x128.png' }, { 'title': 'flapjack', 'image': 'https://bulma.io/images/placeholders/128x128.png' }, { 'title': 'flapjack', 'image': 'https://bulma.io/images/placeholders/128x128.png' }, { 'title': 'flapjack', 'image': 'https://bulma.io/images/placeholders/128x128.png' }])
  const [image, setImg] = useState()

  useEffect(() => {
    fetch('/api/profile', { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
      .then(resp => resp.json())
      .then((resp) => {
        setUser(resp)
        setImg(resp.image)
        // getFavourites(resp)
      })
      .catch((err) => console.log(err))
    addSweep()
  }, [0])


  function addSweep() {
    // const pic = document.querySelector('.profilePic')
    // console.log(pic)
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
      <header><h1>This is longer</h1><span className='sweep slideBefore'></span></header>

      <div className="">
        <ReactFilestack
          preload={true}
          apikey={process.env.REACT_APP_IMG_API_KEY}
          options={options}
          customRender={({ onPick }) => (
            <div className='picContent' >
              <figure className="image is-128x128 profilePic" >
                <img className="is-rounded" onClick={onPick} src={!image ? 'https://bulma.io/images/placeholders/128x128.png' : image} />
                <div className="middle" onClick={onPick}>
                  <div className="text">Change profile picture</div>
                </div>
              </figure>
              <button onClick={onPick}>Change profile picture</button>
            </div>
          )}
          onSuccess={handleImageUpload}
        />
      </div>

      <h2>Your Favourite Recipes</h2>
      <div className="favourites">{favourites ? favourites.map((fav, id) => {
        return <div className='ingredient' key={id}><h3>{fav.title}</h3><img src={fav.image}></img></div>
      }) : null}</div>
    </div>
  )
}
export default Profile