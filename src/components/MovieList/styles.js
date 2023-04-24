import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    moviesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        // gap: '20px',
        // justifyContent: 'space-between',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        }
    }
}));
