import { useState, ReactElement } from 'react';
import useStyles from './styles';
import { PersonalProfile } from 'domain/model/PersonalProfile';
import { IdName } from 'domain/model/IdName';
import { GithubIcon, LinkedInIcon, GitlabIcon, BehanceIcon } from "../Icons/Icons";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

interface IProps {
    profile: PersonalProfile, 
    specialities: IdName[],
    specialityLevels: IdName[],
    handleSave: Function
}

const RenderInput = (props: {id: string, label: string, value: string, hc: Function, lines?: number, icon?: ReactElement}) => {
    const { id, label, value, hc, lines, icon } = props;
    const inputProps: {startAdornment?: JSX.Element} = {};

    if (icon) 
        inputProps.startAdornment = (
            <InputAdornment position="start">
                {icon}
            </InputAdornment>
        );

    return (
        <FormControl variant="outlined">{/* // className={classes.formControl}> */}
            <TextField
                id={id}
                defaultValue={value}
                onChange={ev => hc(id, ev.target.value)}
                label={label}
                InputProps={inputProps}
                multiline = {lines !== undefined}
                rows={lines || 1}
                variant="outlined"
            >
            </TextField>
        </FormControl>
    )
}

const PersonalData = (props: IProps) => {
    const theme = useTheme();
    const { profile, specialities, specialityLevels, handleSave } = props;
    const classes = useStyles(theme);
    const [values, setValues] = useState<{[k: string]: any}>(profile);
    const handleChange = (id: string, value: any) => {
        setValues(v => ({...v, [id]: value}));
    };

    const RenderSelect = (props: {id: string, label: string, items: IdName[]}) => {
        const { id, label, items } = props;
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id={id + "-label"}>{label}</InputLabel>
                <Select
                    labelId={id + "-label"}
                    id={id}
                    defaultValue={values[id]}
                    onChange={ev => handleChange(id, ev.target.value)}
                    label={label}
                >
                    <MenuItem value={0}>
                        <em style={{opacity: ".5"}}>None</em>
                    </MenuItem>
                    {items.map(v => <MenuItem value={v.id}>{v.name}</MenuItem>) }
                </Select>
            </FormControl>
        )
    }
      
    return (
        <Paper className={classes.container}>
            <form className={classes.form}>

                <TextField label="Avatar" onChange={ev => handleChange("avatar", ev)} variant="outlined" placeholder="http://" value={values["avatar"]} />
                <div className={classes.inlineControls}>
                    <RenderInput id="email" label="Email" value={values["email"]} hc={handleChange} />
                    <RenderInput id="tel" label="Teléfono" value={values["tel"]} hc={handleChange} />
                </div>
                <div className={classes.inlineControls}>
                    <RenderSelect id="speciality" label="Especialidad" items={specialities} />
                    <RenderSelect id="specialityLevel" label="Nivel" items={specialityLevels} />
                </div>
                <div className={classes.inlineControls}>
                    <RenderInput id="country" label="País" value={values["country"]} hc={handleChange} />
                    <RenderInput id="city" label="Ciudad" value={values["city"]} hc={handleChange} />
                </div>
                <Typography variant="subtitle2">Aquí podrás añadir información personal que creas relevante. 
                    Comentanos quién eres, que cosas te gustan, etc.</Typography>
                <RenderInput id="biography" label="Biografía" value={values["biography"]} hc={handleChange} lines={4} />
                <div className={classes.inlineControls}>
                    <RenderInput id="github" label="GitHub" value={values["github"]} hc={handleChange} icon={<GithubIcon className="icon" viewBox="0 0 150 150" />} />
                    <RenderInput id="linkedin" label="Linkedin" value={values["linkedin"]} hc={handleChange} icon={<LinkedInIcon className="icon" viewBox="0 0 150 150" />} />
                </div>
                <div className={classes.inlineControls}>
                    <RenderInput id="gitlab" label="Gitlab" value={values["gitlab"]} hc={handleChange} icon={<GitlabIcon className="icon" viewBox="0 0 150 150" />} />
                    <RenderInput id="behance" label="Behance" value={values["behance"]} hc={handleChange} icon={<BehanceIcon style={{fontSize: 30, marginLeft: -4}} className="icon" viewBox="0 0 64 64" />} />
                </div>
                <Typography variant="subtitle2">URL de tu portfolio personal:</Typography>
                <RenderInput id="website" label="https://" value={values["website"]} hc={handleChange} />
                <Button onClick={() => handleSave(values)} style={{color: theme.palette.primary.contrastText}}className={classes.button}>GUARDAR</Button>
            </form >
        </Paper>
    )
}

export default PersonalData;
