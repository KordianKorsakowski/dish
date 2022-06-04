import ReactDOM from 'react-dom';

import classes from './InformationAboutSendingProcess.module.css';

const Backdrop = ({ backHandler, status }) => {
  return (
    <div
      className={`${classes.backdrop} ${status !== 'Success' && classes.errBackdrop}`}
      onClick={backHandler}
    />
  );
};

const ModalOverlay = ({ backHandler, status }) => {
  return (
    <div className={`${classes.modal} ${status !== 'Success' && classes.err}`}>
      <header className={classes.title}>
        <h2>{status}</h2>
      </header>

      <footer>
        <button
          className={`${classes.btn} ${status !== 'Success' && classes.errBtn}`}
          onClick={backHandler}
        >
          {status !== 'Success' ? 'try leater... ☠️' : 'see you next time 🥳'}
        </button>
      </footer>
    </div>
  );
};
const InformationAboutSendingProcess = ({ backHandler, status }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop backHandler={backHandler} status={status} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay backHandler={backHandler} status={status} />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

export default InformationAboutSendingProcess;
