import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CarContext } from '../contexts/CarContext';
import Loading from '../components/Loading';
import CarProperty from '../components/CarProperty';

const CarPage = () => {
    const { id } = useParams();
    const { getCar, cars }  = useContext(CarContext);
    const [car, setCar] = useState({});

    useEffect( () => {
        const newCar = getCar(id);
        setCar(newCar);
    },[cars])

    if(!car) return <Loading />
    return (
        <Box style={{minHeight: '100vh'}} sx={{width: '100vw', backgroundColor: '#e8eaf6', pt: '5rem', pb: '5rem'}}>
            <Box spacing={2} sx={{width: 1/2, mx: 'auto', backgroundColor: 'white', p: '2rem', borderRadius: '0.3rem'}}>
                <img src={car.picture} style={{width: '50vw', paddingBottom: '2rem', borderRadius: '0.3rem'}} alt=''/>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 12 }}>
                    <CarProperty name='Brand' value={car.brand}/>
                    <CarProperty name='Model' value={car.model}/>
                    <CarProperty name='Kilometers' value={car.kilometers}/>
                    <CarProperty name='Year' value={car.year}/>
                    <CarProperty name='Engine' value={car.engine}/>
                    <CarProperty name='Price' value={car.price}/>
                    <CarProperty name='Owner' value={car.owner} owner={true} />
                </Grid>
            </Box>
        </Box>
    )
}

export default CarPage;