import * as yup from 'yup';

const useYup = () => {

    let carSchema = yup.object().shape({
        picture: yup.mixed().required(),
        kilometers: yup.number().required().min(0),
        brand: yup.string().required().min(6).max(20),
        model: yup.string().required().min(6).max(20),
        engine: yup.string().required().min(2).max(20),
        year: yup.number().positive().min(1950).max(2022),
        price: yup.number().positive().min(1000),
    });

    let registerSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required().min(6).max(20),
        repeatPassword: yup.string().required().min(6).max(20)
    });

    let loginSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required().min(6).max(20)
    });

    return { 
        carSchema, 
        loginSchema, 
        registerSchema 
    }
}

export default useYup;