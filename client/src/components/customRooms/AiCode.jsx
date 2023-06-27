import { usePostAiCodeMutation } from '@/state/api';
import React, { useState } from 'react'
import MessageFormUi from './MessageFormUi'

const AiCode = ({props, activeChat}) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");

  const [trigger] = usePostAiCodeMutation();

  const handleSubmit = async () => {
    const date = new Date().toISOString().replace("T", " ").replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    trigger(form);
    setMessage("");
    setAttachment("");
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  return (
    <MessageFormUi 
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default AiCode;