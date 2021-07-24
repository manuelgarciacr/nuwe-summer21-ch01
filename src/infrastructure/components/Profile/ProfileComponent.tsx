import React from "react";

import { LocationIcon, GithubIcon, LinkedInIcon, GitlabIcon, BehanceIcon } from "../Icons/Icons";
import useStyles from "./styles";
import StackItem from "../StackItem/StackItemComponent";
import PersonalData from '../PersonalData/PersonalDataComponent';
import { PersonalProfile } from "domain/model/PersonalProfile";
import { NuweProfile } from "domain/model/NuweProfile";
import { IdName } from "domain/model/IdName";
import { getPeriod } from "app/utils";
import Skills from "../Skills/SkillsComponent";

import Card from "@material-ui/core/Card";
import BusinessIcon from '@material-ui/icons/Business';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import LanguageIcon from '@material-ui/icons/Language';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";

// Redux
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { fetchPersonalProfile, selectPersonalProfile } from "./slices/personalProfileSlice";
import { fetchNuweProfile, selectNuweProfile } from "./slices/nuweProfileSlice";
import { fetchSpecialities, selectSpecialities } from "./slices/specialitySlice";
import { fetchSpecialityLevels, selectSpecialityLevels } from "./slices/specialityLevelSlice";
import { fetchCompanyTypes, selectCompanyTypes } from "./slices/companyTypeSlice";

const Profile = () => {
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState<string | null>(null);
    const handleOpen = (component: string) => {
        setOpen(component);
    };

    const handleClose = () => {
        setOpen(null);
    };
    
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

    const getName = (id: number, arr: IdName[]) => 
        arr.find(v => v.id === id)?.name || "";

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
                <Typography variant="h4">Loading...</Typography>
            </div>)
    else if (failed)
        return(<div className={classes.loadingError}>{personalProfileError}{nuweProfileError}</div>)   
    
    //
    // Redux
    //
    ///////////////////////////////////////////////////////////

    return (
        <>
            <Card className={classes.generalCard}>
                {/* 
                //      Header
                */}
                <CardMedia
                    className={classes.generalCardMedia}
                    image={personalProfile.headerImage}
                    title="Imagen de fondo"
                />
                {/* 
                //      Personal information
                */}
                <CardContent className={classes.generalCardContent}>
                    <Avatar className={classes.generalCardAvatar} 
                        alt="Avatar del usuario"
                        style={{width: theme.spacing(21), height: theme.spacing(21)}} // CSS problem. Size lost after first render
                        src={personalProfile.avatar} />
                    <div  className={classes.editIcon} onClick={() => handleOpen("personalData")}>
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
                        {personalProfile.github && <GithubIcon className="icon" viewBox="0 0 150 150" />}
                        {personalProfile.linkedin && <LinkedInIcon className="icon" viewBox="0 0 150 150" />}
                        {personalProfile.gitlab && <GitlabIcon className="icon" viewBox="0 0 150 150" />}
                        {personalProfile.behance && <BehanceIcon className={["icon", "large"]} viewBox="0 0 64 64" />}
                        <div className="iconned">
                            <LocationIcon className="icon" viewBox="0 0 101 100" />
                            <Typography variant="h6">{personalProfile.city}, {personalProfile.country}</Typography>
                        </div>
                        <Typography variant="h6">Última conexión {getPeriod(new Date(), personalProfile.lastConnection)}</Typography>
                    </div>
                    {personalProfile.getOffers &&
                        <Typography variant="h4">Buscando trabajo de {personalProfile.job} en {personalProfile.jobPlace}</Typography>
                    }
                    <Paper className="paper" variant="outlined" >
                        <Hidden smUp implementation="css">
                            <Typography className="caption" variant="h6">Stack</Typography>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Typography className="caption" variant="h6">Stack indicado por el usuario</Typography>
                        </Hidden>
                        <Paper className="container">
                            {personalProfile.stack.map((value, i) => (
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
            <Modal
                open={open !== null}
                onClose={handleClose}
                className={classes.modal}
                >
                <div>
                    {open === "personalData" && <PersonalData/>}
                </div>
            </Modal>
        </>
    )
}

export default Profile;
