import React from 'react'

const EditModal = ({ toggleEditModal, editModal, error, handleInput, post, comment, handleEditSubmit }) => (
 
  <div className="modal is-active" id="edit-modal">
    <div className="modal-background" onClick={toggleEditModal}></div>
    <div className="modal-content">
      <form className='post-form form' onSubmit={e => handleEditSubmit(e, editModal.type, editModal.postId, editModal.commentId)}>
        <div className="control">
          <div className='field'>
            <textarea
              onChange={e => handleInput(e)}
              type="text"
              className="textarea"
              value={editModal.type === 'post' ? post.text : editModal.type === 'comment' ? comment.text : 'something went wrong'}
              placeholder={`Type your ${editModal.type} here`}
              id={editModal.type}
            />
          </div>
        </div>
        {error.errors && error.errors.message === 'Unauthorized' && <small className="help is-danger">
          {error.errors.message} - Please log in
        </small>}
        <button className="button is-primary">Submit</button>
      </form>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleEditModal}></button>
  </div>


)

export default EditModal
