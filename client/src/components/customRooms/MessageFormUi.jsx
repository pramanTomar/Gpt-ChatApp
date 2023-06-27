import React from 'react'
import { PaperAirplaneIcon, PaperClipIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react'
import Dropzone from 'react-dropzone';

const MessageFormUi = ({
    setAttachment, message, handleSubmit, handleChange, handleKeyDown, appendText
}) => {

  const [preview, setPreview] = useState("");

  return (
    <div className='message-form-container'>
      {
        // If we have a image selected than display its preview
        preview && (
            <div className='message-form-preview'>
                <img className='message-form-preview-image' alt="preview-img" src={preview} onLoad={() => URL.revokeObjectURL(preview)} />
                <XMarkIcon
                  className='message-form-icon-x'
                  onClick={() => {
                    setPreview("");
                    setAttachment("");
                  }}
                />
            </div>
        )
      }
      <div className='message-form'>
        <div className='message-form-input-container'>
          <input 
            className='message-form-input'
            type='text'
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='Send Message...'
          /> 
          {
            appendText && (
              <input className='message-form-assist' type='text' disabled="disabled" value={`${message} ${appendText}`}/>
            )
          }
        </div>
        <div className='message-form-icons'>
            <Dropzone
              acceptedFiles='.jpg,.jpeg,.png,.heif'
              multiple={false}
              noClick={true}
              onDrop={(acceptedFiles) => {
                setAttachment(acceptedFiles[0]);
                setPreview(URL.createObjectURL(acceptedFiles[0]));
              }}
            >
                {({ getRootProps, getInputProps, open}) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <PaperClipIcon 
                          className='message-form-icon-clip'
                          onClick={open}
                        />
                    </div>
                )}
            </Dropzone>

            <hr className='vertical-line'/>
            <PaperAirplaneIcon 
              className='message-form-icon-airplane'
              onClick={() => {
                setPreview("");
                handleSubmit();
              }}
            />

        </div>
      </div>
    </div>
  )
}

export default MessageFormUi
