import React from 'react'

const DeleteModal = ({ toggleDelete, deleteModal, deleteComment, handleDelete }) => (
 
  <div className="modal is-active" id="delete-modal">
    {console.log(deleteModal)}
    <div className="modal-background" onClick={toggleDelete}></div>
    <div className="modal-content">
      <div className="text is-size-5 question">
        Are you sure you want to delete this {deleteModal.type}?
      </div>
      <button className="button is-primary" onClick={deleteModal.type === 'post' ? (e) => handleDelete(e, deleteModal.postId) : (e) => deleteComment(e, deleteModal.commentId, deleteModal.postId)}>Yes!</button>
      <button className="button is-warning" onClick={toggleDelete}>No...</button>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleDelete}></button>
  </div>


)

export default DeleteModal
