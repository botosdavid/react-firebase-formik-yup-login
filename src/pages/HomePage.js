import { AuthContext } from '../contexts/AuthContext';
import { CarContext } from '../contexts/CarContext';
import { useContext, useRef } from 'react';
import { Box, Typography, Button, Tooltip, Grid } from '@mui/material';
import Model from '../components/Model';
import CarPreview from '../components/CarPreview';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const HomePage = () => {
    const { user, signOut } = useContext(AuthContext);
    const { cars, isLoading } = useContext(CarContext);
    const ref = useRef(null);

    return (
        <>
            <Box spacing={2} sx={{pl: '10rem',pr: '10rem', pb: '10rem', height: '70vh'}}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: '2rem'}}>
                    <Link to='/add' style={{textDecoration: 'none'}}>
                        <Button sx={{mr: '2rem'}}>Add Car</Button>
                    </Link>
                    <Tooltip title={user ? JSON.stringify(user.email) : ''}>
                        <Button onClick={signOut}>Logout</Button>
                    </Tooltip>
                </Box>
                <Box sx={{ mx: 'auto', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Box sx={{ width: '40vw', height: '60vh', display:'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <Typography variant='h2' style={{ fontWeight: 600 }}>Welcome to Visionity</Typography>
                        <Typography variant='h6'>Your favorite custom car gallery</Typography>
                        <Box><Button onClick={() => ref.current.scrollIntoView({behavior: 'smooth'})} variant='contained' sx={{mt: '2rem'}}>Go to cars</Button></Box>
                    </Box>
                    <Model />
                </Box>
            </Box>

            <Box sx={{ backgroundColor: '#e8eaf6', pt: '5rem', pb: '5rem'}} style={{minHeight: '100vh',display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <Grid ref={ref} container spacing={4} style={{width: '80vw'}}>
                {isLoading ? (<Loading />) : cars.map( (car, index) => (
                    <CarPreview car={car} key={index}/>
                ))}
                </Grid>
            </Box>
        </>
    )
}

export default HomePage;