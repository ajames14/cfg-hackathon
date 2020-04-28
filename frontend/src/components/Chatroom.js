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
  const [reply, setReply] = useState(false)
  const [id, setId] = useState('')

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

  function addComment(e) {
    e.preventDefault()
    console.log(id)
    if (!post) return
    axios.post(`/api/${id}/comments`, post, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => getData())
      .then(() => setPost({ ...post, text: '' }))
      .then(() => setReply(!reply))
      .catch((err) => setError({ errors: err.resp.data }))
  }

  function handleDelete(e) {
    axios.delete(`/api/posts/${e.target.value}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => getData())
      .catch((err) => setError({ errors: err.response.data }))
  }

  function deleteComment(e) {
    console.log(e.target.name)
    console.log(e.target.value)
    axios.delete(`/api/posts/${e.target.name}/comments/${e.target.value}/`, {
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
    const newTime = moment(newString).fromNow()
    return newTime
  }

  function commentsExist(post) {
    return post.comments.length !== 0
  }


  function toggleReply(e) {
    const id = e.target.value
    setId(id)
    setReply(!reply)
  }

  function handleAccordion(postId) {
    setActiveThread(postId)
  }

  if (chatroom.length === 0) {
    return <div className="title">Loading</div>

  } else {
    return (
      <div className="post-container">

        {console.log(chatroom)}
        <section className="accordions">
          {chatroom.posts.length > 0 && chatroom.posts.map((elem, i) => {
            return <div className={'accordion' + `${activeThread === i ? ' is-active' : ''}`} key={i} onClick={() => handleAccordion(i)}>

              <div className="accordion-header" onClick={() => handleAccordion(i)}>
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64 photo-box">
                      <img className="profile-pic is-rounded" src={elem.user.image  || orange} />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <div className="post-content">
                        <strong className="username">{elem.user.username}</strong>  <small className="time">{formatTimestamp(elem.time_stamp)}</small> {elem.is_swapped ? <i className="fas fa-sync-alt"></i> : <i className="fas fa-sync-alt"></i>}
                        <br />
                        <p className="post-text">
                          {elem.text}
                        </p>
                      </div>
                    </div>
                  </div>
                  {isOwner(elem) &&
                  <div className="media-right">
                    <button value={elem.id} onClick={(e) => handleDelete(e)} className="delete"></button>
                  </div>}
                </article>
              </div>

              <div className="accordion-body">
                <div className="accordion-content">
                  {elem.comments.length > 0 && elem.comments.map((comment, i) => {
                    return (
                      <article className="media" key={i}>
                        <figure className="media-left">
                          <p className="image is-64x64 photo-box">
                            <img className="profile-pic is-rounded" src={comment.user.image || orange} />
                          </p>
                        </figure>
                        <div className="media-content">
                          <div className="content">
                            <div className="post-content">
                              <strong className="username">{comment.user.username}</strong>  <small className="time">{formatTimestamp(comment.time_stamp)}</small>
                              <br />
                              <p className='post-text'>
                                {comment.text}
                              </p>
                            </div>
                            <br />
                          </div>
                        </div>
                        {
                          isOwner(comment) &&
                          <div className="media-right">
                            <button value={comment.id} name={comment.post} onClick={(e) => deleteComment(e)} className="delete"></button>
                          </div>
                        }
                      </article>
                    )
                  })}
                  <form className='form' onSubmit={e => addComment(e)}>
                    <div className='field'>
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
                    <button className="button post-button is-small">Post</button>
                  </form>
                </div>
              </div>


            </div>
          })}
        </section>
        
        <article className="media">
          <div className="media-content">
            <div className="content">
              <form className='post-form form' onSubmit={e => handleSubmit(e)}>
                <div className='field'>
                  <label className='post-label label'>Post a Comment</label>
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
                <button className="post-button button is-small">Post</button>
              </form>
            </div>
          </div>
        </article>

        {/* <div className={reply === true ? 'modal is-active' : 'modal'}>
          <div className="modal-background" onClick={toggleReply}></div>
          <div className="modal-content">
            <article className="media">
              <div className="media-content">
                <div className="content">
                  <form className='form' onSubmit={e => addComment(e)}>
                    <div className='field'>
                      <label className='post-label label'>Post a Comment</label>
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
                    <button className="button post-button is-small">Post</button>
                  </form>
                </div>
              </div>
            </article>
          </div>
          <button className="modal-close is-large" aria-label="close"></button>
        </div> */}
      </div>
    )
  }
}

export default Chatroom
