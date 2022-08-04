import { useEffect, useState } from 'react';
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
  return (
    <div className="App">
      <ul>{messages !== [] ? messages.map((message) => <li key={message.id}>{message.body}</li>) : null}</ul>
    </div>
  );
}

export default App;
