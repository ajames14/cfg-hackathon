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

const Chatroom = ({ postcode, showInstructions, toggleInstructions }) => {

  const [chatroom, setChatroom] = useState([])
  const [post, setPost] = useState(postInitialState)
  const [comment, setComment] = useState(postInitialState)
  const [error, setError] = useState(errorInitialState)
  const [activeThread, setActiveThread] = useState(null)

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
    if (e.target.id === 'post') {
      setPost({ ...post, text: e.target.value })
    } else if (e.target.id === 'comment') {
      setComment({ ...comment, text: e.target.value })
    }
    
    setError({ ...error, errors: '' })
  }

  //********************  POST FEATURES

  function handleSubmit(e) {
    e.preventDefault()
    if (!post.text) return
    axios.post(`/api/${chatroom.id}/posts/`, post, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => getData())
      .then(() => setPost({ ...post, text: '' }))
      .catch((err) => setError({ errors: err.resp.data }))
  }

  function handleDelete(e, postId) {
    e.preventDefault()
    axios.delete(`/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => getData())
      .catch((err) => setError({ errors: err.response.data }))
  }

  //********************  COMMENT FEATURES

  function addComment(e, postId) {
    e.preventDefault()
    if (!comment.text) return
    axios.post(`/api/${postId}/comments`, comment, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => getData())
      .then(() => setComment({ ...comment, text: '' }))
      .catch((err) => setError({ errors: err.resp.data }))
  }

  function deleteComment(e, commentId, postId) {
    e.preventDefault()
    axios.delete(`/api/posts/${postId}/comments/${commentId}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => getData())
      .catch((err) => setError({ errors: err.response.data }))
  }

  //********************  GENERAL UTILS
  
  function isOwner(elem) {
    return Auth.getUserId() === elem.user.id
  }

  function formatTimestamp(time) {
    if (!time) return
    const newString = time.substring(0, time.indexOf('.'))
    const newTime = moment(newString).fromNow()
    return newTime
  }


  //********************  ACCORDION FEATURES
  function handleAccordion(postId) {
    setActiveThread(postId)
    
  }
  
  function handleSwap(postId) {
    console.log(postId)
  }

  function handleExchange(postId) {
    console.log(postId)
    // THIS IS WHERE THE EMAIL MECHANISM WILL NEED TO GO
  }

  if (chatroom.length === 0) {
    return <div className="title">Loading</div>

  } else {
    return (
      
      <div className="post-container">
        {console.log(activeThread)}
        <div className="level is-mobile" id="chatroom-title">
          <div className="level-left">
            <div className="leve-item">
              {!showInstructions && (
                <i
                  className="fas fa-info-circle is-size-5"
                  onClick={() => toggleInstructions()}
                ></i>
              )}
            </div>
          </div>
          <div className="level-right">{postcode && <span className="level-postcode">Chatroom for {postcode}</span>}</div>
        </div>

        {console.log(chatroom)}
        <section className="accordions" id="chatroom-posts">
          {chatroom.posts.length > 0 && chatroom.posts.map((elem, i) => {
            return <div className={'accordion' + `${activeThread === i ? ' is-active' : ''}` + `${elem.is_swapped ? ' swapped' : ''}`} key={i} onClick={() => handleAccordion(i)}>

              <div className="accordion-header" onClick={() => handleAccordion(i)}>

                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64 photo-box">
                      <img className="profile-pic is-rounded" src={elem.user.image} />
                    </p>
                  </figure>

                  <div className="media-content">
                    <div className="content">
                      <div className="post-content">
                        <p className="post-text">
                          {elem.text}
                        </p>
                        <br />
                        <div className="post-info"><span className="has-text-weight-bold">{elem.user.username} </span><span className="is-size-7">{formatTimestamp(elem.time_stamp)}</span></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="media-right">
                    {elem.is_swapped ? <i className="fas fa-sync-alt swapped"></i> : isOwner(elem) ? <i className="fas fa-sync-alt not-swapped" onClick={() => handleSwap(elem.id)} ></i> : <i className="fas fa-envelope" onClick={() => handleExchange(elem.id)}></i>}
                    {isOwner(elem) && <button value={elem.id} onClick={(e) => handleDelete(e, elem.id)} className="delete"></button>}
                  </div>
                </article>
              </div>

              <div className="accordion-body">
                <div className="accordion-content">
                  {elem.comments.length > 0 && elem.comments.map((comment, i) => {
                    return (
                      <article className="comment media" key={i}>
                        <figure className="media-left">
                          <p className="image is-64x64 photo-box">
                            <img className="profile-pic is-rounded" src={comment.user.image} />
                          </p>
                        </figure>
                        <div className="media-content">
                          <div className="content">
                            <div className="post-content">
                              <p className='post-text'>
                                {comment.text}
                              </p>
                              <br />
                              <div className="comment-info"><span className="has-text-weight-bold">{comment.user.username} </span><span className="is-size-7">{formatTimestamp(comment.time_stamp)}</span></div>                            </div>
                            <br />
                          </div>
                        </div>
                        {
                          isOwner(comment) &&
                          <div className="media-right">
                            <button onClick={(e) => deleteComment(e, comment.id, comment.post)} className="delete"></button>
                          </div>
                        }
                      </article>
                    )
                  })}
                  <div className="post-comment">
                    <form className='form' onSubmit={e => addComment(e, elem.id)}>
                      <div className='field'>
                        <input
                          onChange={e => handleInput(e)}
                          type="text"
                          className="input is-small"
                          placeholder="Write your comment here"
                          id="comment"
                          value={comment.text}
                        />
                      </div>
                      {error.errors && error.errors.message === 'Unauthorized' && <small className="help is-danger">
                        {error.errors.message} - Please log in
                      </small>}
                      <button className="button is-primary is-small">Comment</button>
                    </form>
                  </div>
                </div>
              </div>


            </div>
          })}
        </section>
        
        <div className="level is-mobile" id="chatroom-comment">
          <div className="level-item">
            <form className='post-form form' onSubmit={e => handleSubmit(e)}>
              <div className='field'>
                <input
                  onChange={e => handleInput(e)}
                  type="text"
                  className="input"
                  value={post.text}
                  placeholder="Post a request"
                  id="post"
                />
              </div>
              {error.errors && error.errors.message === 'Unauthorized' && <small className="help is-danger">
                {error.errors.message} - Please log in
              </small>}
              <button className="button is-primary">Post</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Chatroom
