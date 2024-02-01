import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trombiServiceUpdateOne } from '../../services/trombiServices';
import { PictureState } from '../../store/interfaces/trombiState';
import { RootState } from '../../store';

interface FileUploadProps {
  setShow: (e: boolean) => void;
  file: PictureState;
}

const FileUpdate: React.FC<FileUploadProps> = ({ setShow: setShow, file: file }) => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState<PictureState>({
    ...file
  });
  const trombi = useSelector((state: RootState) => state.trombi);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    trombiServiceUpdateOne(formData).then(() => {

      dispatch({ type: 'SET_TROMBI', payload: trombi.files.filter(file => file.id !== formData.id).concat([formData])});
      setShow(false);
    }
    );
  };

  const closeHandler = () => {
    setShow(false);
  };

  return (
    <div>
      <button onClick={closeHandler}>close</button>
      <h2>Modifier</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Prénom</label>
        <input type="text" onChange={handleChange} name="first_name" value={formData.first_name}></input>
        <label htmlFor="">Nom</label>
        <input type="text" onChange={handleChange} name="last_name" value={formData.last_name}></input>
        <label htmlFor="">Label</label>
        <input type="text" onChange={handleChange} name="label" value={formData.label}></input>
        <button>Sauvegarder</button>
      </form>
    </div>
  );
};  

export default FileUpdate;


// CONNEXION EN PREMIER A L'API