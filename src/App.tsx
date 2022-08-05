import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ActionCable from 'actioncable';

interface Message {
  id: number;
  body: string;
  created_at: string;
  updated_at: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
  const channel = cable.subscriptions.create('ChatChannel', {
    connected: () => {
      console.log('コネクト成功');
    },
    received: (data) => {
      // idが同じものだったら即リターンする
      const existingMessages = messages.filter((message) => {
        message.id === data.message.id;
      });
      if (existingMessages.length !== 0) return;
      console.log(data);
      setMessages([...messages, data.message]);
      setInputText('');
    },
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    await axios
      .get('http://localhost:3000/test/tests/index')
      .then((res) => {
        setMessages(res.data.messages);
      })
      .catch((e) => console.log(e));
  };

  const changeInputText = (e: any) => {
    setInputText(e.target.value);
  };

  const clickSendMessage = async () => {
    channel.perform('speak', {
      message: inputText,
    });
  };

  return (
    <div className="App">
      <h1>ChatRoom</h1>
      <ul>{messages !== [] ? messages.map((message) => <li key={message.id}>{message.body}</li>) : null}</ul>
      <label htmlFor="">Say Something</label>
      <input type="text" value={inputText} onChange={changeInputText} />
      <button onClick={clickSendMessage}>送信</button>
    </div>
  );
}

export default App;
