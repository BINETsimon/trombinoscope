import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useState } from 'react';
import Loader from '../components/Global/Loader';
import Backdrop from '../components/Global/Backdrop';
import FileUpload from '../components/Profile/FileUpload';
import FileUpdate from '../components/Profile/FileUpdate';
import { PictureState } from '../store/interfaces/trombiState';
import FileDelete from '../components/Profile/FileDelete';

function Profile() {

  const user = useSelector((state: RootState) => state.user);
  const trombi = useSelector((state: RootState) => state.trombi);

  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [overlay, setOverlay] = useState<string>('UPLOAD');
  const [edit, setEdit] = useState<PictureState | null>(null);

  const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    setEdit(trombi.files.find(file => file.id === parseInt(target.value))!);
    setBackdrop(true);
    setOverlay('UPDATE');
  };

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    setEdit(trombi.files.find(file => file.id === parseInt(target.value))!);
    setBackdrop(true);
    setOverlay('DELETE');
  };

  const addPhotoHandler = () => {
    setBackdrop(true);
    setOverlay('UPLOAD');
  };

  return (
    <>
      <div className='main-container'>
        <h1>Salut {user.data?.first_name} {user.data?.last_name} !</h1>
        {/* <h2>Vos infos</h2>
      <div>infos</div> */}
        <div className='display-container'>
          <div className='trombi-container'>
            <h2>Votre trombinoscope :</h2>
            {Array.from(new Set(trombi.files.map(file => file.label))).map(label => (
              <div key={label} className='label-container'>
                <h3>{label}</h3>
                <div className='picture-container'>
                  {trombi.files
                    .filter(file => file.label === label)
                    .map((file, index) => (
                      <div key={index} className='image-item'>
                        <div className='top-image-item'>
                          <div className='picture-card'>
                            {file.local_url ? (
                              <img src={file.local_url} alt={file.first_name} />
                            ) : (
                              <Loader />
                            )}
                          </div>
                        </div>
                        <div className='picture-names'>
                          <div>
                            <b>{file.first_name} </b>
                          </div>
                          <div>
                            {file.last_name}
                          </div>
                          <button className='edit-btn full-btn' onClick={editHandler} value={file.id}>Editer</button>
                          <button className='delete-btn full-btn' onClick={deleteHandler} value={file.id}>Supprimer</button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
            <button className="mt-20" onClick={addPhotoHandler}>ajouter les photos</button>
          </div>
        </div>
      </div>
      <Backdrop show={backdrop} setShow={setBackdrop} >
        {
          {
            'UPLOAD':  <FileUpload setShow={setBackdrop}></FileUpload>,
            'UPDATE':  (
              <>
                {
                  edit ? (
                    <FileUpdate setShow={setBackdrop} file={edit}></FileUpdate>
                  ):
                    (
                      <>test</>
                    )
                }
              </>
            ),
            'DELETE':  (
              <>
                {
                  edit ? (
                    <FileDelete setShow={setBackdrop} file={edit}></FileDelete>
                  ):
                    (
                      <></>
                    )
                }
              </>
            )
          }[overlay]
        }
      </Backdrop>
    </>
  );
}

export default Profile;
