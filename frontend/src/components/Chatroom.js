import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
const moment = require('moment')

const postInitialState = {
  text: ''
}

const errorInitialState = {
  errors: ''
}

const Chatroom = ({ postcode }) => {

  const [chatroom, setChatroom] = useState([])
  const [post, setPost] = useState(postInitialState)
  const [error, setError] = useState(errorInitialState)

  useEffect(() => {
    getData()
  }, [])

  function getData() {
    axios.get(`/api/chatrooms/${postcode}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => {
        setChatroom(resp.data)
      })
      .catch(error => console.log(error))
  }

  function handleInput(e) {
    setPost({ ...post, text: e.target.value })
    setError({ ...error, errors: '' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!post) return
    axios.post(`/api/${chatroom.id}/posts/`, post, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => getData())
      .then(() => setPost({ ...post, text: '' }))
      .catch((err) => setError({ errors: err.resp.data }))
  }

  function handleDelete(e) {
    axios.delete(`/api/posts/${e.target.value}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => getData())
      .catch((err) => setError({ errors: err.response.data }))
  }

  function isOwner(elem) {
    return Auth.getUserId() === elem.user.id
  }

  function formatTimestamp(time) {
    if (!time) return
    const newString = time.substring(0, time.indexOf('.'))
    const newTime = moment(newString).format('LT LL')
    return newTime
  }

  if (chatroom.length === 0) {
    return <div className="title">Loading</div>
  } else if (!chatroom.posts || chatroom.posts === 0) {
    return <div className="section">
      <div className="container">
        <div className="title">Welcome to Food Swap</div>
        <div className="title">Chatroom for {postcode}</div>
        <article className="media">
          <div className="media-content">
            <div className="content">
              <form className='form' onSubmit={e => handleSubmit(e)}>
                <div className='field'>
                  <label className='label'>Post a Comment</label>
                  <input
                    onChange={e => handleInput(e)}
                    type="text"
                    className="input"
                    value={post.text}
                  />
                </div>
                {error.errors && error.errors.message === 'Unauthorized' && <small className="help is-danger">
                  {error.errors.message} - Please log in
                </small>}
                <button className="button is-info ">Post</button>
              </form>
            </div>
          </div>
        </article>
      </div>
    </div>
  }
  return (
    <div className="section">
      <div className="container">
        <div className="title">Welcome to Food Swap</div>
        <div className="title">Chatroom for {postcode}</div>
        <div>
          <div>
            {chatroom.posts.map((elem, i) => {
              return (
                <article className="media" key={i}>
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img src={'https://www.driverhire.co.uk/wp-content/themes/driver-hire/img/placeholder-person.jpeg'} />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>{elem.user.username}</strong>  <small>{formatTimestamp(elem.time_stamp)}</small>
                        <br />
                        {elem.text}
                      </p>
                    </div>
                  </div>
                  {isOwner(elem) &&
                    <div className="media-right">
                      <button value={elem.id} onClick={(e) => handleDelete(e)} className="delete"></button>
                    </div>
                  }
                </article>
              )
            })}
          </div>
          <br />
          <article className="media">
            <div className="media-content">
              <div className="content">
                <form className='form' onSubmit={e => handleSubmit(e)}>
                  <div className='field'>
                    <label className='label'>Post a Comment</label>
                    <input
                      onChange={e => handleInput(e)}
                      type="text"
                      className="input"
                      value={post.text}
                    />
                  </div>
                  {error.errors && error.errors.message === 'Unauthorized' && <small className="help is-danger">
                    {error.errors.message} - Please log in
                  </small>}
                  <button className="button is-info ">Post</button>
                </form>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default Chatroom
