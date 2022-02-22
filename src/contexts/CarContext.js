import { createContext, useContext, useEffect, useState } from 'react';
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore"; 
import { db, storage } from '../authentication/firebase';
import { AuthContext } from './AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const CarContext = createContext();

export const CarProvider = ({children}) => {
    const { user } = useContext(AuthContext);
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'cars'), (doc) => {
            getCars();
        });
        return unsub;
    },[])

    const getCar = (id) => {
        return cars.find(car => car.id === id); 
    }

    const getCars = async () => {
        setIsLoading(true);
        const data = await getDocs(collection(db, 'cars'));
        const result = [];
        data.forEach((doc) => {
            result.push(doc.data());
        });
        setCars(result);
        setIsLoading(false);
    }

    const addCar = async (values) => {
        try {
        const metadata = { contentType: 'image/jpeg' };
        const storageRef = ref(storage, 'pictures/' + values.picture.name);
        const uploadTask = uploadBytesResumable(storageRef, values.picture, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
                default: break;
            }}, (error) => {
            switch (error.code) {
                case 'storage/unauthorized':
                break;
                case 'storage/canceled':
                break;        
                case 'storage/unknown':
                break;
                default: break;
            }}, () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                console.log('File available at', downloadURL);
                const userEmail = JSON.stringify(user.email);
                await addDoc(collection(db, "cars"), {
                    ...values,
                    picture: downloadURL,
                    owner: userEmail,
                    id: uuidv4()
                });
            });
            }
        );  
        }catch (e){console.log('error: '+ e)}
    }    

    return (
        <CarContext.Provider value={{addCar, getCars, cars, isLoading, getCar}}>
            {children}
        </CarContext.Provider>
    )
}