import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trombiServiceUploadOne } from '../../services/trombiServices';
import { RootState } from '../../store';
import { PictureState } from '../../store/interfaces/trombiState';

interface FileUploadProps {
  setShow: (e: boolean) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setShow: setShow }) => {

  const dispatch = useDispatch();

  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const trombi = useSelector((state: RootState) => state.trombi);

  const closeHandler = () => {
    setShow(false);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setLoading(true);
    e.preventDefault();
  
    let currentIndex = 0;
    const updatedFiles = [];
  
    for (const file of Array.from(files!)) {
      try {
        const response = await trombiServiceUploadOne(file);
        console.log(response);
  
        const imageUrlPromise = new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target?.result as string;
            resolve(imageUrl);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
  
        const imageUrl = await imageUrlPromise;
  
        const payload: PictureState = {
          ...response!,
          local_url: imageUrl
        };
  
        updatedFiles.push(payload);
        currentIndex++;
        setIndex(currentIndex);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier :', error);
      }
    }
    await dispatch({ type: 'SET_TROMBI', payload: trombi.files.concat(updatedFiles)});
  };
  

  return (
    <div>
      <button onClick={closeHandler}>close</button>
      <h2>Ajouter des images à votre trombinoscope</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleChange}></input>
        {loading ? (
          <div>Status : {index} / {files?.length}</div>
        ) : (
          <button>Sauvegarder</button>
        )}
      </form>
    </div>
  );
};  

export default FileUpload;