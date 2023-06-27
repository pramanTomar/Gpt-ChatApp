import React from 'react'
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced'
import Header from '@/components/customHeader'
import StandardMessageForm from '@/components/customRooms/StandardMessageForm'
import Ai from '@/components/customRooms/AiChat'
import AiCode from '@/components/customRooms/AiCode'
import AiAssist from '@/components/customRooms/AiAssist'

const Chat = ({user, secret}) => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
		user,
		secret
  );

  return (
    <div style={{flexBasis: '100%'}}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow 
        {...chatProps}
        style={{height: '100vh'}}
        renderChatHeader={(chat) => <Header chat={chat} /> }
        renderMessageForm={(props)=>{
          if(chatProps.chat?.title.startsWith("AI_Chat")){
            return <Ai props={props} activeChat={chatProps.chat}/>
          }
          if(chatProps.chat?.title.startsWith("AI_Code")){
            return <AiCode props={props} activeChat={chatProps.chat}/>
          }
          if(chatProps.chat?.title.startsWith("AI_Assist")){
            return <AiAssist props={props} activeChat={chatProps.chat}/>
          }
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          )
        }}
      />
    </div>
  )
}

export default Chat;