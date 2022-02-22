import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const CarPreview = (props) => {
    return (
            <Grid item >
                <Link to={`/cars/${props.car.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <Box sx={{backgroundColor: 'white', p: '1rem', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',borderRadius: '0.3rem'}}>
                        <img src={props.car.picture} alt='' style={{height: '15rem', width:'30rem', borderRadius: '0.3rem', objectFit: 'cover'}} /> 
                        <h2>{props.car.brand}</h2>
                        <h3>{props.car.model}</h3>
                    </Box>
                </Link>
            </Grid>
    )
}

export default CarPreview;