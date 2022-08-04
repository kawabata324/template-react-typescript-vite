import React, { ChangeEvent, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import axios from 'axios';

interface Message {
  id: number;
  body: string;
  created_at: string;
  updated_at: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  useEffect(() => {
    connectTest();
  }, []);

  const connectTest = async () => {
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
    await axios
      .post('http://localhost:3000/test/tests', { message: inputText })
      .then((res) => {
        setInputText('');
        setMessages([...messages, res.data.message]);
      })
      .catch((e) => console.log(e));
  };

  setInterval(() => {
    connectTest();
  }, 1000);

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
