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
  const [favourites, setFav] = useState([
    { title: 'food title', image: 'https://imgur.com/ViVXJFY.png' },
    { title: 'food title', image: 'https://imgur.com/ViVXJFY.png' },
    { title: 'food title', image: 'https://imgur.com/ViVXJFY.png' }
  ])
  const [image, setImg] = useState()

  const [AccForm, updateForm] = useState({ name: '', email: '', postcode: '' })
  const [name, setName] = useState({ username: '' })
  const [email, setEmail] = useState({ email: '' })
  const [postcode, setPostcode] = useState({ postcode: '' })

  const [errors, setError] = useState({})

  useEffect(() => {
    fetch('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setUser(resp)
        setImg(resp.image)
        setName({ username: resp.username })
        setEmail({ email: resp.email })
        setPostcode({ postcode: resp.postcode })
        // updateForm({ name: resp.username, email: resp.email, postcode: resp.postcode })
        // resp.favourites.length > 0 ? getFavourites(resp) : null
      })
      .catch((err) => console.log(err))
    addSweep()
  }, [0])

  function addSweep() {
    const sweep = document.querySelector('.sweep')
    sweep ? sweep.classList.add('slideActive') : null
    const profilePic = document.querySelector('figure')
    // profilePic ? profilePic.classList.add('fadeActive') + console.log(profilePic) : null
    // setTimeout(()=> {
    //   // profilePic ? profilePic.classList.remove('fadeActive') : null
    // }, 4000)
  }

  function getFavourites(resp) {
    console.log('FAVS', resp.favourites.toString())

    axios
      .get(
        'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk',
        {
          headers: {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host':
              'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_SPOON_API_KEY
          },
          params: {
            // 'apiKey': process.env.REACT_APP_SPOON_API_KEY,
            ids: resp.favourites.toString(),
            includeNutrition: false
          }
        }
      )
      .then((resp) => console.log(resp.data) + setFav(resp.data))
      .catch((err) => console.log(err))
  }

  const handleImageUpload = (res) => {
    console.log('UPLOAD', res.filesUploaded[0].url)
    setImg(res.filesUploaded[0].url)
    const form = { postcode: user.postcode, image: res.filesUploaded[0].url }

    axios
      .put('/api/profile', form, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err))
  }

  function handleInput(e) {
    console.log(errors)
    if (e.target.name === 'name') {
      errors.username = ''
      setName({ username: e.target.value })
      updateForm({ username: e.target.value })
    }
    if (e.target.name === 'email') {
      errors.email = ''
      setEmail({ email: e.target.value })
      updateForm({ email: e.target.value })
    }
    if (e.target.name === 'postcode') {
      errors.postcode = ''
      setPostcode({ postcode: e.target.value })
      updateForm({ postcode: e.target.value })
    }
  }

  function handleSubmit(e) {
    if (e.target.name === 'name') {
      makeRequest(name)
    }
    if (e.target.name === 'email') {
      makeRequest(email)
    }
    if (e.target.name === 'postcode') {
      makeRequest(postcode)
    }
  }

  function makeRequest(obj) {
    console.log(Object.keys(obj)[0])
    axios
      .put('/api/profile', obj, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then((resp) => console.log(resp))
      .catch((err) => {
        console.log(err.response.data)
        setError({
          username:
            Object.keys(obj)[0] === 'username'
              ? err.response.data.username
              : '',
          email: Object.keys(obj)[0] === 'email' ? err.response.data.email : '',
          postcode:
            Object.keys(obj)[0] === 'postcode' ? err.response.data.postcode : ''
        })
      })
  }

  return (
    <div className="section has-text-centered" id="profile">
      <header>
        <h1>{user.username}</h1>
        <span className="sweep slideBefore"></span>
      </header>

      <div>
        <ReactFilestack
          preload={true}
          apikey={process.env.REACT_APP_IMG_API_KEY}
          options={options}
          customRender={({ onPick }) => (
            <div className="picContent">
              <figure className="image is-128x128 profilePic">
                <img
                  className="is-rounded"
                  onClick={onPick}
                  src={
                    !image
                      ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRcEQfF7q7j163x2_R6mMHS2qLwq1CSKziwMtOPkTFAz2Zhjcy1&usqp=CAU'
                      : image
                  }
                />
                <div className="middle" onClick={onPick}>
                  <div className="text">Change profile picture</div>
                </div>
              </figure>
              <button className="profileButton" onClick={onPick}>
                Change profile picture
              </button>
            </div>
          )}
          onSuccess={handleImageUpload}
        />
      </div>

      <div className="halves">
        <div className="half">
          <h2 className="favTitle"> Favourite Recipes</h2>
          <div className="favourites">
            {favourites
              ? favourites.map((fav, id) => {
                  return (
                    <div
                      className="recipe"
                      key={id}
                      onClick={() => props.history.push(`/recipe/${fav.id}`)}
                    >
                      <div className="middle">
                        <div className="text">{fav.title}</div>
                      </div>
                      <img src={fav.image}></img>
                    </div>
                  )
                })
              : null}
          </div>
          {user.favourites
            ? user.favourites.length < 1 && (
                <div
                  className="redirect"
                  onClick={() => props.history.push('/recipes')}
                >
                  Go find some favourites!
                </div>
              )
            : null}
        </div>
        <div className="half">
          <h2 className="accountTitle">Account Details</h2>
          <div className="accDetails">
            <div>
              <h3>Username:</h3>
              <input
                value={name.username}
                name="name"
                placeholder="Enter new username"
                onChange={(e) => handleInput(e)}
              ></input>
              <button
                className="submit"
                name="name"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
            <p className="error">{errors.username}</p>
            <div>
              <h3>Email:</h3>
              <input
                type="text"
                value={email.email}
                name="email"
                placeholder="Enter new email"
                onChange={(e) => handleInput(e)}
              ></input>
              <button
                className="submit"
                name="email"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
            <p className="error">{errors.email}</p>
            <div>
              <h3>Postcode:</h3>
              <input
                type="text"
                value={postcode.postcode}
                name="postcode"
                placeholder="Enter new postcode"
                onChange={(e) => handleInput(e)}
              ></input>
              <button
                className="submit"
                name="postcode"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
            <p className="error">{errors.postcode}</p>
            <p className="note">
              note: If you change your postcode you will be moved to a new
              chatroom
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
