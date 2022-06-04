import Confetti from 'react-confetti';
import { useState } from 'react';
import { useWindowSize } from 'react-use';
import axios from 'axios';

import Form from './components/form/Form';
import InformationAboutSendingProcess from './components/modal/InformationAboutSendingProcess';

import './App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const { width, height } = useWindowSize();

  const sendDataHandler = async (data) => {
    setSending(true);
    try {
      const resp = await axios.post('https://frosty-wood-6558.getsandbox.com:443/dishes', {
        ...data,
      });

      if (resp.status === 200) {
        console.log(resp.data);
        setStatus('Success');
        setShowModal(true);
      } else if (resp.status === 400) {
        setStatus('Bad Request');
        setShowModal(true);
      } else if (resp.status === 500) {
        setStatus('Internal Server Error');
        setShowModal(true);
      } else {
        setStatus('Error');
        setShowModal(true);
      }
    } catch (e) {
      setStatus(e.message);
      setShowModal(true);
      console.log(e);
    }
    setSending(false);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Form sendData={sendDataHandler} sending={sending} />
      {showModal && (
        <InformationAboutSendingProcess backHandler={closeModalHandler} status={status} />
      )}
      {showModal && status === 'Success' && (
        <Confetti height={height} width={width} numberOfPieces={200} />
      )}
    </div>
  );
};

export default App;
