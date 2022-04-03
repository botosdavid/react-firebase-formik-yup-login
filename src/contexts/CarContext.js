import { createContext, useContext, useEffect, useState } from 'react';
import { collection, addDoc, getDocs, onSnapshot, doc, updateDoc,arrayUnion,arrayRemove, where, query } from "firebase/firestore"; 
import { db, storage } from '../authentication/firebase';
import { AuthContext } from './AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const CarContext = createContext();

export const CarProvider = ({children}) => {
    const { user } = useContext(AuthContext);
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const toggleCarWishList = async (id, isWish) => {
        const carRef = doc(db, "cars", id);
        const method = isWish ? arrayRemove : arrayUnion;
        await updateDoc(carRef, {
            wishLists: method(user.email)
        });
    }

    const giveRating = async (id, rating) => {
        const carRef = doc(db, "cars", id);
        await updateDoc(carRef, {
            ratings: arrayUnion( Number(rating))
        })
    }

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
            result.push({ 
                id: doc.id, 
                ...doc.data()
            });
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
                    wishLists: [],
                    ratings: [],
                });
            });
            }
        );  
        }catch (e){console.log('error: '+ e)}
    }   

    const getRatingWithEmailAndCarId = async (carId, email) => {
        let result = [];
        const ratingsRef = collection(db, "ratings");
        const q = query(ratingsRef, 
            where("carId", "==", carId), 
            where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push({id: doc.id, ...doc.data()});
        });
        return result;
    }
    
    const addRating = async (carId, rating, email) => {
        const searchedRatings = await getRatingWithEmailAndCarId(carId, email);
        if ( searchedRatings.length > 0 ) {
            // update
            const id = searchedRatings[0].id
            const ratingRef = doc(db, "ratings", id);
            await updateDoc(ratingRef, {
                rating: rating
            });
        } else {
            // add
            await addDoc(collection(db, "ratings"), {
                rating, email, carId
            });
        }
    }

    const getRatingsOfCar = async (carId) => {
        const ratingsRef = collection(db, "ratings");
        const result = [];
        const q = query(ratingsRef, where("carId", "==", carId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push({...doc.data()});
        });
        return result;
    }

    const getCarRating = async (carId) => {
        const carRatings = await getRatingsOfCar(carId);
        const numberOfRatings = carRatings.length;
        const ratingSum = carRatings.reduce((sum, rating)=> {
            return sum + rating.rating;
        },0)
        if (numberOfRatings == 0) return 0;
        return ratingSum / numberOfRatings;
    }

    return (
        <CarContext.Provider 
            value={{
                cars, 
                addCar, 
                getCars, 
                getCar, 
                isLoading,
                giveRating, 
                addRating, 
                getCarRating,
                getRatingsOfCar, 
                toggleCarWishList, 
            }}>
            {children}
        </CarContext.Provider>
    )
}