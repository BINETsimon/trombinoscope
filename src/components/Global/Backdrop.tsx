interface BackdropProps {
  children: React.ReactNode;
  show: boolean;
  setShow: (event: boolean) => void;
}

const Backdrop: React.FC<BackdropProps> = ({ children, show, setShow: setShow }) => {

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className={show ? 'backdrop-container' : 'display-none' }>
      <div className="card">
        {
          show ? (
            <>
              {children}
            </>
          ):(
            <></>
          )
        }
      </div>
      <div className='backdrop' onClick={handleClose}></div>
    </div>
  );
};

export default Backdrop;
