import { Grid } from '@mui/material'

const CarProperty = ({name, value, owner}) => {
    return (
        <Grid item xs={12} sm={6} md={4} style={!owner ? {borderBottom: '1px solid black'} : {}}>
            <b>{name}</b>
            {owner ? <h3>{value}</h3> : <h2>{value}</h2>}
        </Grid>
    )
}

export default CarProperty;