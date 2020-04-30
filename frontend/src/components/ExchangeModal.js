import React from 'react'
import emailjs from 'emailjs-com'

const ExchangeModal = ({ toggleExchangeModal, exchangeModal, userInfo }) => {

  function handleExchange(e) {
    e.preventDefault()
    console.log(e.target.value)
    const templateParams = {
      email_to: e.target.value,
      reply_to: userInfo.email
    }
    emailjs.send('gmail', 'wnwn', templateParams, 'user_EztaAzroFrBYKpE9JXBMJ')
    toggleExchangeModal(e, '', '')
  }

  return (< div className="modal is-active" id="delete-modal" >
    {/* {console.log(exchangeModal.post.user.username)} */}
    < div className="modal-background" onClick={toggleExchangeModal} ></div>
    <div className="modal-content">
      <div className="text is-size-5 question">
        To arrange food delivery, your email address will be shared with {exchangeModal.postUser}. Would you like to continue?
      </div>
      <button className="button is-primary" value={exchangeModal.postEmail} onClick={e => handleExchange(e)}>Yes!</button>
      <button className="button is-warning" onClick={toggleExchangeModal}>No...</button>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleExchangeModal}></button>
  </div >
  )

}


export default ExchangeModal
