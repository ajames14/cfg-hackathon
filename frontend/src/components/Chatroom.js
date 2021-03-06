import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import moment from 'moment'

import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import SwapModal from './SwapModal'
import ExchangeModal from './ExchangeModal'
import { animateScroll } from 'react-scroll'

const postInitialState = {
  text: ''
}

const errorInitialState = {
  errors: ''
}

const modalInitialState = {
  state: false,
  type: null,
  postId: null,
  commentId: null
}


const Chatroom = ({ postcode, showInstructions, toggleInstructions, userInfo }) => {

  const [chatroom, setChatroom] = useState([])
  const [post, setPost] = useState(postInitialState)
  const [comment, setComment] = useState(postInitialState)
  const [error, setError] = useState(errorInitialState)
  const [activeThread, setActiveThread] = useState(null)
  const [deleteModal, setDeleteModal] = useState(modalInitialState)
  const [editModal, setEditModal] = useState(modalInitialState)
  const [swapModal, setSwapModal] = useState({ state: false, postId: null, postText: '' })
  const [exchangeModal, setExchangeModal] = useState({ state: false, postEmail: null, postUser: null })


  useEffect(() => {
    getData(true)
  }, [])

  function getData(scroll) {
    axios.get(`/api/chatrooms/${postcode}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => {
        setChatroom(resp.data)
      })
      .then(() => {
        scroll === true ? scrollToBottom() : null
      })
      .catch(error => setError({ ...error.message }))
  }

  function handleInput(e) {
    if (e.target.id === 'post') {
      setPost({ ...post, text: e.target.value })
    } else if (e.target.id === 'comment') {
      setComment({ ...comment, text: e.target.value })
    }

    setError({ ...error, errors: '' })
  }

  function handleEditSubmit(e, type, postId, commentId) {
    e.preventDefault()
    if (type === 'post') {
      if (!post.text) return
      axios.put(`/api/posts/${postId}/`, post, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(() => {
          getData()
          setEditModal({ ...editModal, state: false })
        })
        .then(() => setPost({ ...post, text: '' }))
        .catch((err) => setError({ errors: err.resp.data }))
    } else if (type === 'comment') {
      if (!comment.text) return
      axios.put(`/api/posts/${postId}/comments/${commentId}/`, comment, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(() => {
          getData()
          setEditModal({ ...editModal, state: false })
        })
        .then(() => setComment({ ...comment, text: '' }))
        .catch((err) => setError({ errors: err.resp.data }))
    }
  }

  function toggleEditModal(e, type, postId, commentId, text) {
    e.preventDefault()
    setEditModal({ state: !editModal.state, type, postId, commentId })

    if (text) {
      if (type === 'post') {
        setPost({ ...post, text })
      } else if (type === 'comment') {
        setComment({ ...comment, text })
      }
    } else {
      setPost(postInitialState)
      setComment(postInitialState)
    }

  }

  //********************  POST FEATURES

  function handleSubmit(e) {
    e.preventDefault()
    if (!post.text) return
    axios.post(`/api/${chatroom.id}/posts/`, post, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => getData(true))
      .then(() => setPost({ ...post, text: '' }))
      // .then(() => scrollToBottom())
      .catch((err) => setError({ errors: err.resp.data }))
  }

  function handleDelete(e, postId) {
    // TODO: Add modal for asking whether sure
    e.preventDefault()
    axios.delete(`/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        getData()
        setDeleteModal({ ...deleteModal, state: false })
      })
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
    // TODO: Add modal for asking whether sure
    e.preventDefault()
    axios.delete(`/api/posts/${postId}/comments/${commentId}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        getData()
        setDeleteModal({ ...deleteModal, state: false })
      })
      .catch((err) => setError({ errors: err.response.data }))
  }

  //********************  GENERAL UTILS

  function isOwner(elem) {
    return Auth.getUserId() === elem.user.id
  }

  function formatTimestamp(time) {
    if (!time) return
    const newString = time.substring(0, time.indexOf('.'))
    const newTime = moment(newString).add(1, 'hours').fromNow()
    return newTime
  }

  function toggleDelete(e, type, postId, commentId) {
    e.preventDefault()
    setDeleteModal({ state: !deleteModal.state, type, postId, commentId })
  }


  //********************  ACCORDION FEATURES
  function handleAccordion(postId) {
    if (activeThread === postId) {
      setActiveThread(null)
    } else {
      setActiveThread(postId)
    }
  }

  function toggleSwapModal(e, postId, postText) {
    if (e !== 'modal') {
      e.preventDefault()
    }
    setSwapModal({ state: !swapModal.state, postId, postText })
  }

  function toggleExhangeModal(e, postEmail, postUser) {
    e.preventDefault()
    setExchangeModal({ state: !exchangeModal.state, postEmail, postUser })

  }

  function scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: 'chatroom-posts'
    })
  }


  if (chatroom.length === 0) {
    return <div className="title">Loading</div>

  } else {
    return (

      <div className="post-container">
        {console.log(comment)}
        <div className="level is-mobile" id="chatroom-title">
          <div className="level-left">
            <div className="leve-item">
              {!showInstructions && (
                <i
                  className="info fas fa-info-circle is-size-5"
                  onClick={() => toggleInstructions()}
                ></i>
              )}
            </div>
            <div className="level-item">
              <button className="button is-small is-primary" onClick={() => getData(true)}><i className="icon refresh fas fa-sync-alt" onClick={() => getData(true)}></i></button>
            </div>
          </div>
          <div className="level-right">{postcode && <span className="level-postcode is-size-4 is-family-secondary">Chatroom for {postcode}</span>}</div>
        </div>

        <section className="accordions" id="chatroom-posts">
          {chatroom.posts.length === 0 && <div className="no-posts label is-size-6">No posts yet, be the first to make a request in your area!</div>}
          {chatroom.posts.length > 0 && chatroom.posts.map((elem, i) => {
            return <div className={'accordion' + `${activeThread === i ? ' is-active' : ''}` + `${elem.is_swapped ? ' swapped' : ''}`} key={i}>

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
                        <div className="post-info"><span className="has-text-weight-bold">{elem.user.username} </span><span className="is-size-7">{formatTimestamp(elem.time_stamp)} ({elem.comments.length} {elem.comments.length === 1 ? 'comment' : 'comments'})</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="media-right">
                    {elem.is_swapped ?
                      <button className="button is-large swapped" disabled><i className="icon fas fa-exchange-alt"></i></button>
                      :
                      isOwner(elem) ?
                        <>
                          <button className="button is-small is-warning" onClick={(e) => toggleSwapModal(e, elem.id, elem.text)}><i className="icon fas fa-exchange-alt not-swapped" onClick={(e) => toggleSwapModal(e, elem.id, elem.text)} ></i></button>
                          <button className="button is-small is-warning" onClick={(e) => toggleEditModal(e, 'post', elem.id, null, elem.text)}><i className="icon fas fa-pencil-alt" onClick={(e) => toggleEditModal(e, 'post', elem.id, null, elem.text)} ></i></button>
                          <button className="button is-small is-warning" onClick={(e) => toggleDelete(e, 'post', elem.id, null)}><i className="icon far fa-trash-alt" onClick={(e) => toggleDelete(e, 'post', elem.id, null)} ></i></button>
                        </>
                        :
                        <button className="button is-small is-warning" onClick={(e) => toggleExhangeModal(e, elem.user.email, elem.user.username)}><i className="icon fas fa-envelope"></i></button>
                    }

                  </div>
                </article>
              </div>

              <div className="accordion-body">
                <div className="accordion-content">
                  {elem.comments.length === 0 && <div className="no-comments is-size-7">No one has commented yet, be the first to respond!</div>}
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
                          !elem.is_swapped && isOwner(comment) &&
                          <div className="media-right">
                            {<button className="button is-small is-primary" onClick={(e) => toggleEditModal(e, 'comment', comment.post, comment.id, comment.text)}><i className="icon fas fa-pencil-alt" onClick={(e) => toggleEditModal(e, 'comment', comment.post, comment.id, comment.text)} ></i></button>}
                            {<button className="button is-small is-primary" onClick={(e) => toggleDelete(e, 'comment', comment.post, comment.id)}><i className="icon far fa-trash-alt" onClick={(e) => toggleDelete(e, 'comment', comment.post, comment.id)} ></i></button>}
                          </div>
                        }
                      </article>
                    )
                  })}
                  {!elem.is_swapped && <div className="post-comment">
                    <form className='form' onSubmit={e => addComment(e, elem.id)}>
                      <div className='field'>
                        <input
                          onChange={e => handleInput(e)}
                          type="text"
                          className="input is-small"
                          placeholder="Write your comment here"
                          id="comment"
                          value={editModal.state ? '' : comment.text}
                        />
                      </div>
                      {error.errors && error.errors.message === 'Unauthorized' && <small className="help is-danger">
                        {error.errors.message} - Please log in
                      </small>}
                      <button className="button is-primary is-small">Comment</button>
                    </form>
                  </div>}
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
                  value={editModal.state ? '' : post.text}
                  placeholder="Post a new request"
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
        {editModal.state && <EditModal toggleEditModal={toggleEditModal} editModal={editModal} error={error} handleInput={handleInput} post={post} comment={comment} handleEditSubmit={handleEditSubmit} />}
        {deleteModal.state && <DeleteModal toggleDelete={toggleDelete} deleteModal={deleteModal} deleteComment={deleteComment} handleDelete={handleDelete} />}
        {swapModal.state && <SwapModal toggleSwapModal={toggleSwapModal} swapModal={swapModal} getData={getData} />}
        {exchangeModal.state && <ExchangeModal toggleExchangeModal={toggleExhangeModal} exchangeModal={exchangeModal} userInfo={userInfo} />}
      </div>
    )
  }
}

export default Chatroom
