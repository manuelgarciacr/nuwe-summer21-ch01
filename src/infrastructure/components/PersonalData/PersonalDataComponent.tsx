import useStyles from './styles';

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const PersonalData = (props: any) => {
    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <Typography className={classes.title} variant="h6">Datos Personales</Typography>
            <form className={classes.form}>

                <TextField label="Avatar" variant="outlined" placeholder="http://"/>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="especialidad-label">Especialidad</InputLabel>
                    <Select
                        labelId="especialidad-label"
                        id="especialidad"
                        // value={especialidad}
                        // onChange={handleChange}
                        label="Especialidad"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                {/* <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>            <TextField label="País" />
            <TextField label="Ciudad" variant="outlined"/>
            <TextField label="Biografía" variant="outlined"/> */}
                <Button type="submit">Submit</Button>
            </form >
        </Paper>
    )
}

export default PersonalData;
