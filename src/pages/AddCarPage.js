import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, FormGroup, Button, CircularProgress } from '@mui/material';
import Input from '../components/Input';
import { useFormik } from 'formik';
import useYup from '../hooks/useYup';
import { CarContext } from '../contexts/CarContext';

const AddCarPage = () => {
    const { carSchema } = useYup();
    const [previewUrl, setPreviewUrl] = useState('');
    const { addCar } = useContext(CarContext);
    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            picture: '',
            kilometers: '',
            brand: '',
            model: '',
            engine: '',
            year: '',
            price: '',
        },
        validationSchema: carSchema,
        onSubmit: async (values) => {
            await addCar(values);
            navigate('/');
        }
    })

    const handleImageUpload = (e) => {
        formik.handleChange(e);
        const picture = e.currentTarget.files[0];
        setPreviewUrl(URL.createObjectURL(picture));
        formik.setFieldValue('picture', picture);
    }

    return (
        <Box style={{minHeight: '100vh'}} sx={{width: '100vw', backgroundColor: '#e8eaf6', pt: '5rem', pb: '5rem'}}>
            <Box spacing={2} sx={{width: 1/4, mx: 'auto', backgroundColor: 'white', p: '5rem'}}>
                <Typography variant='h4'>Add a new Car</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>    
                        <div style={{ display: 'inline-flex' }}>
                            <Input 
                                label='Picture' 
                                name='picture' 
                                type='file'
                                onChange={handleImageUpload} />
                        </div>
                        {previewUrl && <img src={previewUrl} alt="" style={{ width: '20rem',objectFit: 'cover'}} />}
                        <div style={{ display: 'inline-flex' }}>
                            <Input 
                                label='Brand' 
                                name='brand' 
                                type='text'
                                onChange={formik.handleChange} 
                                value={formik.values.brand} 
                                error={formik.errors.brand}/>
                            <Input
                                label='Model' 
                                name='model' 
                                type='text'
                                onChange={formik.handleChange} 
                                value={formik.values.model} 
                                error={formik.errors.model}/>
                        </div>
                        <div style={{ display: 'inline-flex' }}>
                            <Input 
                                label='Kilometers' 
                                name='kilometers' 
                                type='text'
                                onChange={formik.handleChange} 
                                value={formik.values.kilometers} 
                                error={formik.errors.kilometers}/>
                            <Input 
                                label='Engine' 
                                name='engine' 
                                type='text'
                                onChange={formik.handleChange} 
                                value={formik.values.engine} 
                                error={formik.errors.engine}/>
                        </div>
                        <div style={{ display: 'inline-flex' }}>
                            <Input 
                                label='Year' 
                                name='year' 
                                type='number'
                                onChange={formik.handleChange} 
                                value={formik.values.year} 
                                error={formik.errors.year}/>
                            <Input 
                                label='Price' 
                                name='price' 
                                type='number'
                                onChange={formik.handleChange} 
                                value={formik.values.price} 
                                error={formik.errors.price}/>
                        </div>
                    </FormGroup>
                    <Button 
                        type='submit' 
                        variant='contained' 
                        sx={{ mt: '1rem'}}
                        disabled={!formik.isValid || formik.isSubmitting}>
                        {formik.isSubmitting ? <CircularProgress/> : 'Add'}
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default AddCarPage;