import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [testMessage, setTestMessage] = useState();
  useEffect(() => {
    connectTest();
  }, []);

  const connectTest = async () => {
    await axios
      .get('http://localhost:3000/test/tests/index')
      .then((res) => setTestMessage(res.data.test))
      .catch((e) => console.log(e));
  };
  return (
    <div className="App">
      <p>{testMessage}</p>
    </div>
  );
}

export default App;
