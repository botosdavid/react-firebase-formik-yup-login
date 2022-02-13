import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Input from '../components/Input';
import { Box, FormGroup, Button, Typography, Alert, CircularProgress } from '@mui/material';
import * as yup from 'yup';

const LoginPage = () => {
    const { signIn } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    let schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required().min(6).max(20)
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            const isSuccess = await signIn(values.email, values.password);
            if(isSuccess) return navigate('/');
            return setError(true);
        }
    })

    return (
        <Box sx={{width: '100vw', height: '100vh', backgroundColor: '#e8eaf6', pt: '5rem'}} lg={{backgroundColor: 'black'}}>
            <Box spacing={2} sx={{width: 1/4, mx: 'auto', backgroundColor: 'white', p: '5rem'}}>
                <Typography  variant="h3" component="h1" sx={{mb: '2rem'}}>Sign In</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <Input 
                            label='Email' 
                            name='email' 
                            type='email'
                            onChange={formik.handleChange} 
                            value={formik.values.email} 
                            error={formik.errors.email}/>
                        <Input 
                            label='Password' 
                            name='password' 
                            type='password'
                            onChange={formik.handleChange} 
                            value={formik.values.password} 
                            error={formik.errors.password}/>
                        {error && <Alert severity="error">Failed to Login</Alert>}
                        <Button 
                            disabled={!formik.isValid || formik.isSubmitting} 
                            variant='contained' 
                            sx={{ mt: '3rem' }} 
                            type='submit'>
                            {formik.isSubmitting ? <CircularProgress/> : 'Login'}
                        </Button>
                        <Typography variant='p' sx={{mt: 2}}>
                            Don't have an account yet? <Link to="/register">Create an account</Link>
                        </Typography>
                    </FormGroup>
                </form>
            </Box>
        </Box>
    )
}

export default LoginPage;