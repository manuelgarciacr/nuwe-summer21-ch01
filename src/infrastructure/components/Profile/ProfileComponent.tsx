import React from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps, useHistory } from 'react-router-dom';

import { LocationIcon, GithubIcon, LinkedInIcon, GitlabIcon, BehanceIcon } from "../Icons/Icons";
import useStyles from "./styles";
import StackItem from "../StackItem/StackItemComponent";
import PersonalData from '../PersonalData/PersonalDataComponent';
import { PersonalProfile } from "domain/model/PersonalProfile";
import { NuweProfile } from "domain/model/NuweProfile";
import { IdName } from "domain/model/IdName";
import { getPeriod } from "app/utils";
import Skills from "../Skills/SkillsComponent";
import StackData from "../StackData/StackDataComponent";

import Card from "@material-ui/core/Card";
import BusinessIcon from '@material-ui/icons/Business';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import LanguageIcon from '@material-ui/icons/Language';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

// Redux
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { fetchPersonalProfile, selectPersonalProfile } from "./slices/personalProfileSlice";
import { fetchNuweProfile, selectNuweProfile } from "./slices/nuweProfileSlice";
import { fetchSpecialities, selectSpecialities } from "./slices/specialitySlice";
import { fetchSpecialityLevels, selectSpecialityLevels } from "./slices/specialityLevelSlice";
import { fetchCompanyTypes, selectCompanyTypes } from "./slices/companyTypeSlice";
import { putPersonalProfile } from './slices/personalProfileSlice';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "@material-ui/core/Link";
import Photo from "../Photo/PhotoComponent";

const buttonStyles = makeStyles((theme) => ({
    nftButton: {
        position: "absolute",
        top: 0,
        left: 5,
        transition: "transform 300ms",
        fontWeight: "bolder",
        borderWidth: 3,
        "&:hover": {
            transform: "translate(0,-15%)",
        },
    }
}));
  
const Profile = () => {
    const theme = useTheme();
    const classes = useStyles(); // new Map(...useStyles());
    const buttonClasses = buttonStyles();
    const [open, setOpen] = React.useState<string | null>(null);
    const history = useHistory();
       
    const handleAvatar = () => {
        history.push("/charactercreator");
    };

    const getName = (id: number, arr: IdName[]) =>
        arr.find(v => v.id === id)?.name || "";
    
    const handleOpen = (component: string) => {
        setOpen(component);
    };

    const handleClose = () => {
        setOpen(null);
    };
    
    const handleSave = (values: {[k: string]: any}) => {
        const changes = JSON.stringify(values) !== JSON.stringify(personalProfile);
        if (changes)
            dispatch(putPersonalProfile(values));
        handleClose();
    }

    const handleSaveStack = (values: string[]) => {
        const v = personalProfile.stack;
        const changes = v.some(val => values.indexOf(val) < 0);
        if (changes ||  v.length !== values.length)
            dispatch(putPersonalProfile({...personalProfile, stack: values}));
        handleClose();
    }
    
    const handleSavePhoto = (value: string) => {
        alert(value)
        // const v = personalProfile.stack;
        // const changes = v.some(val => values.indexOf(val) < 0);
        // if (changes ||  v.length !== values.length)
        //     dispatch(putPersonalProfile({...personalProfile, stack: values}));
        handleClose();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((props, ref) => (
    //     <RouterLink ref={ref} to="/charactercreator" {...props} />
    // ));

    ///////////////////////////////////////////////////////////
    // Redux
    //

    const dispatch = useAppDispatch()
    const personalProfile = useAppSelector(selectPersonalProfile) as PersonalProfile;
    const nuweProfile = useAppSelector(selectNuweProfile) as NuweProfile;
    const specialities = useAppSelector(selectSpecialities) as IdName[];
    const specialityLevels = useAppSelector(selectSpecialityLevels) as IdName[];
    const companyTypes = useAppSelector(selectCompanyTypes) as IdName[];
    
    const personalProfileStatus = useAppSelector(state => state.personalProfile.status)
    const nuweProfileStatus = useAppSelector(state => state.nuweProfile.status)
    const specialityStatus = useAppSelector(state => state.speciality.status)
    const specialityLevelStatus = useAppSelector(state => state.specialityLevel.status)
    const companyTypeStatus = useAppSelector(state => state.companyType.status)
    
    const personalProfileError = useAppSelector(state => state.personalProfile.error)
    const nuweProfileError = useAppSelector(state => state.nuweProfile.error)

    const [isReady, setReady] = React.useState(false);
    
    React.useEffect(() => {
        const constructor = async () => {
            try {
                dispatch(fetchPersonalProfile());
                dispatch(fetchNuweProfile());
                dispatch(fetchSpecialities());
                dispatch(fetchSpecialityLevels());
                dispatch(fetchCompanyTypes());
            } catch (e) {
                // ignore error
            } finally {
                setReady(true);
            }
        };
        if (!isReady)
            constructor();
    }, [isReady, dispatch]);

    if (!isReady)
        return null;

    const loading = personalProfileStatus === "loading"
        || nuweProfileStatus === "loading"
        || specialityStatus === "loading"
        || specialityLevelStatus === "loading"
        || companyTypeStatus === "loading";
    const failed = personalProfileStatus === "failed"
        || nuweProfileStatus === "failed";
        // Even if specialities, speciality levels or company types failed the app continues
    
    if (loading)
        return (<div className={classes.loadingError}>
                <CircularProgress />
                <Typography variant="h4">Cargando...</Typography>
            </div>)
    else if (failed)
        return(<div className={classes.loadingError}>{personalProfileError}{nuweProfileError}</div>)
    
    //
    // Redux
    //
    ///////////////////////////////////////////////////////////
    const imageAux = personalProfile.headerImage || "https://nuwe.io/banner_default.png";
    return (
        <>
            <Card className={classes.generalCard}>
                {/*
                //      Header
                */}
                <div style={{marginTop: 55, marginRight: 15}} className={classes.editIcon} onClick={() => handleOpen("Imagen de Cabecera")}>
                        <EditOutlinedIcon />
                </div>
                <CardMedia
                    className={classes.generalCardMedia}
                    image={imageAux}
                    title="Imagen de fondo"
                />
                {/*
                //      Personal information
                */}
                <CardContent className={classes.generalCardContent}>
                    <Avatar className={classes.generalCardAvatar}
                        alt="Avatar del usuario"
                        style={{width: theme.spacing(21), height: theme.spacing(21)}} // CSS problem. Size lost after first render
                        src={personalProfile.avatar} 
                        onDoubleClick={handleAvatar}/>
                    
                    <Button className={buttonClasses.nftButton} color="primary" component={RouterLink} to="/nftcards" variant="outlined">
                        VER NUWE NFT
                    </Button>
                    
                    <div  className={classes.editIcon} onClick={() => handleOpen("Datos Personales")}>
                        <EditOutlinedIcon />
                    </div>

                    <Typography variant="h4" className={classes.generalCardName}>{personalProfile.username}</Typography>
                    <div className={classes.inline}>
                        <Typography variant="h6">{personalProfile.email} | {personalProfile.tel}</Typography>
                    </div>
                    <div className={classes.inline}>
                        <Typography variant="h4">{getName(personalProfile.speciality, specialities)} - {getName(personalProfile.specialityLevel, specialityLevels)}</Typography>
                    </div>
                     <Typography variant="h6">{personalProfile.biography}</Typography>
                    <div className={classes.inline} >
                        {personalProfile.github &&
                            <Link className={classes.animation} href={personalProfile.github} target="_blank" >
                                <GithubIcon className="icon" viewBox="0 0 150 150" />
                            </Link>
                        }
                        {personalProfile.linkedin && 
                            <Link className={classes.animation} href={personalProfile.linkedin} target="_blank" >
                                <LinkedInIcon className="icon" viewBox="0 0 150 150" />
                            </Link>
                        }
                        {personalProfile.gitlab &&
                            <Link className={classes.animation} href={personalProfile.gitlab} target="_blank" >
                                <GitlabIcon className="icon" viewBox="0 0 150 150" />
                            </Link>
                        }
                        {personalProfile.behance &&
                            <Link className={classes.animation} href={personalProfile.behance} target="_blank" >
                                <BehanceIcon className={"icon long"} viewBox="0 0 64 64" />
                            </Link>
                        }
                        <div className="iconned">
                            <LocationIcon className="icon" viewBox="0 0 101 100" />
                            <Typography variant="h6">{personalProfile.city}, {personalProfile.country}</Typography>
                        </div>
                        {personalProfile.lastConnection !== "" &&
                            <Typography variant="h6">Última conexión {getPeriod(new Date(), personalProfile.lastConnection)}</Typography>
                        }
                    </div>
                    {personalProfile.getOffers &&
                        <Typography variant="h4">Buscando trabajo de {personalProfile.job} en {personalProfile.jobPlace}</Typography>
                    }
                    {/*
                    //      Stack
                    */}
                    <Paper style={{position: "relative"}} className="paper" variant="outlined" >
                        <div style={{marginRight: -5, marginTop: 20}} className={classes.editIcon} onClick={() => handleOpen("Stack")}>
                            <EditOutlinedIcon/>
                        </div>
                        <Hidden smUp implementation="css">
                            <Typography className="caption" variant="h6">Stack</Typography>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Typography className="caption" variant="h6">Stack indicado por el usuario</Typography>
                        </Hidden>
                        <Paper className="container">
                            {personalProfile.stack && personalProfile.stack.map((value, i) => (
                                <StackItem name={value} key={i}/>
                            ))}
                        </Paper>
                    </Paper>
                </CardContent>
            </Card>
            {/*
            //      Job
            */}
            <Card className={classes.generalCard}>
                <CardContent className={classes.generalCardContent}>
                    <Typography variant="h4" className={classes.generalCardName}>Sobre el puesto que busca {personalProfile.username}:</Typography>
                    <div className={classes.inline} >
                        <div className="iconned">
                            <LocationIcon className="icon" viewBox="0 0 101 100" />
                            <Typography variant="h6">{personalProfile.jobPlace}</Typography>
                        </div>
                        <div className="iconned">
                            <BusinessIcon className="icon" />
                            <Typography variant="h6">{getName(personalProfile.companyType, companyTypes)}</Typography>
                        </div>
                        <div className="iconned">
                            <MonetizationOnIcon className="icon" />
                            <Typography variant="h6">{new Intl.NumberFormat().format(personalProfile.minimumSalary)} a {new Intl.NumberFormat().format(personalProfile.optimalSalary)} €/a</Typography>
                        </div>
                    </div>
                    <div className={classes.separator}></div>
                    <div className={classes.inline} >
                        {personalProfile.tripAvailability &&
                            <div className="iconned">
                                <FlightTakeoffIcon className="icon" />
                                <Typography variant="h6">Disponibilidad para viajar</Typography>
                            </div>
                        }
                        {personalProfile.remotelyWork &&
                            <div className="iconned">
                                <LanguageIcon className="icon" />
                                <Typography variant="h6">Disponibilidad para trabajar en remoto</Typography>
                            </div>
                        }
                        {personalProfile.immediateIncorporation &&
                            <div className="iconned">
                                <DateRangeIcon className="icon" />
                                <Typography variant="h6">Incorporación inmediata</Typography>
                            </div>
                        }
                    </div>
                </CardContent>
            </Card>
            {/*
            //      Tab menu
            */}
            <div className={classes.inline} >
                <Typography variant="h6" style={{ color: theme.palette.primary.dark, textDecorationLine: "underline" }}>Perfil Nuwe</Typography>
                <Typography variant="h6" style={{ marginLeft: "2rem" }}>Timeline CV</Typography>
                <Typography variant="h6" style={{ marginLeft: "2rem" }}>Social</Typography>
            </div>
            <div className={classes.separator}></div>
            {/*
            //      Score
            */}
            <Hidden xsDown implementation="css">
                <div style={{textAlign: "center"}}>
                    <Typography variant="h6">Perfil validado en NUWE de {personalProfile.username}:</Typography>
                    <div className={classes.inline} >
                        <div className="iconned">
                            <InsertChartOutlinedIcon className="icon" />
                            <Typography variant="h6">{new Intl.NumberFormat().format(nuweProfile.rankingPosition)}/{new Intl.NumberFormat().format(nuweProfile.totalUsers)}u | {new Intl.NumberFormat().format(nuweProfile.points)}pts</Typography>
                        </div>
                    </div>
                </div>
            </Hidden>
            {/*
            //      Hard Skills
            */}
            <Skills title="Top 5 hard skills" skills={nuweProfile.hardSkills} />
            {/*
            //      Soft Skills
            */}
            <Skills title="Puntuaciones retos grupales" skills={nuweProfile.softSkills} />
            <Dialog
                open={open !== null}
                onClose={handleClose}
                className={classes.dialog}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                disableEnforceFocus
                >
                <DialogTitle id="scroll-dialog-title">{open}</DialogTitle>
                <DialogContent dividers={true}>
                    {open === "Datos Personales" &&
                        <PersonalData profile={personalProfile}
                            specialities={specialities} specialityLevels={specialityLevels}
                            handleSave={(values: { [k: string]: any; }) => handleSave(values)}/>
                    }
                    {open === "Stack" &&
                        <StackData stack={personalProfile.stack}
                            handleSave={(values: string[]) => handleSaveStack(values)}/>
                    }
                    {open === "Imagen de Cabecera" &&
                        <Photo handleSave={(value: string) => handleSavePhoto(value)}/>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Profile;
