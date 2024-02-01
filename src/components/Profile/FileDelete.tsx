import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trombiServiceDeleteOne } from '../../services/trombiServices';
import { PictureState } from '../../store/interfaces/trombiState';
import { RootState } from '../../store';

interface FileDeleteProps {
  setShow: (e: boolean) => void;
  file: PictureState;
}

const FileDelete: React.FC<FileDeleteProps> = ({ setShow: setShow, file: file }) => {
  const dispatch = useDispatch();

  const trombi = useSelector((state: RootState) => state.trombi);

  const [deleted, setDeleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteHandler = () => {
    setLoading(true);
    trombiServiceDeleteOne(file).then(()=> {
      setDeleted(true);
      dispatch({ type: 'SET_TROMBI', payload: trombi.files.filter((tfile) => tfile.id !== file.id)});

    });
  };

  const closeHandler = () => {
    setShow(false);
  };

  return (
    <div>
      <button onClick={closeHandler}>close</button>
      {loading ? (
        <>
          {deleted ? (
            <>
              <p>Image supprimmée</p>
            </>
          ):(
            <>
              <p>suppression en cours ...</p>
            </>
          )}
        </>
      ):(
        <>
        
          <h2>Supprimer</h2>

          <p>Êtes-vous sûrs de vouloir supprimer l'image de {file.first_name} {file.last_name} ?</p>
          <button onClick={deleteHandler}>oui</button>
          <button onClick={closeHandler}>non</button>
        </>
      )
      }
    </div>
  );
};  

export default FileDelete;