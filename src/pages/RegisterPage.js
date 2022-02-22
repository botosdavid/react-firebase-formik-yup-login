import { useContext, useState } from 'react';
import Input from '../components/Input';
import { Box, FormGroup, Button, CircularProgress, Typography, Alert } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik'
import useYup from '../hooks/useYup';

const RegisterPage = () => {
    const { signUp } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const { registerSchema } = useYup();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            if(values.password !== values.repeatPassword){
                setError(true);
                return;
            }
            signUp(values.email, values.password);
            navigate('/');
        }
    })

    return (
        <Box sx={{width: '100vw', height: '100vh', backgroundColor: '#e8eaf6', pt: '5rem'}}>
        <Box spacing={2} sx={{width: 1/4, mx: 'auto', backgroundColor: 'white', p: '5rem'}}>
            <Typography  variant="h3" component="h1" sx={{mb: '2rem'}}>Sign Up</Typography>
            <form onSubmit={formik.handleSubmit}>
                <FormGroup onFocus={() => setError(false)}>
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
                    <Input 
                        label='Repeat Password' 
                        name='repeatPassword' 
                        type='password'
                        onChange={formik.handleChange} 
                        value={formik.values.repeatPassword} 
                        error={formik.errors.repeatPassword}/>
                    {error && <Alert severity="error">Passwords must match</Alert>}
                    <Button 
                        disabled={!formik.isValid || formik.isSubmitting} 
                        variant='contained' 
                        sx={{ mt: '3rem' }} 
                        type='submit'>
                        {formik.isSubmitting ? <CircularProgress/> : 'Register'}
                    </Button>
                    <Typography variant='p' sx={{mt: 2}}>
                        Already have an account? <Link to="/login">Sign In</Link>
                    </Typography>
                </FormGroup>
            </form>
        </Box>
        </Box>
    )
}

export default RegisterPage;