import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'


const SwapModal = ({ toggleSwapModal, swapModal, getData }) => {

  const [error, setError] = useState({ errors: '' })

  function confirmSwap() {

    const data = { text: swapModal.postText, is_swapped: true }
    axios.put(`/api/posts/${swapModal.postId}/`, data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        getData()
        toggleSwapModal('modal', null, null)
      })
      .catch((err) => setError({ errors: err.resp.data }))
  }
 
  return (<div className="modal is-active" id="swap-modal">
    {console.log(swapModal)}
    <div className="modal-background" onClick={toggleSwapModal}></div>
    <div className="modal-content">
      <div className="text is-size-5 swapquestion">
        Can you please confirm that you successfully swapped the item relevant to this post? 
        <br />
        <div className="is-size-7">(note that this cannot be undone)</div>
      </div>
      <button className="button is-primary" onClick={(e) => confirmSwap(e)}>Yes!</button>
      <button className="button is-warning" onClick={toggleSwapModal}>Not yet.</button>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleSwapModal}></button>
    {error.errors && <small className="help is-danger">{error.errors.message}</small>}
  </div>)

}


export default SwapModal
