import React from "react";

import { LocationIcon, GithubIcon, LinkedInIcon, GitlabIcon, BehanceIcon } from "../Icons/Icons";
import useStyles from "./styles";
import Pentagon from '../../assets/img/pentagon3.svg';
import StackItem from "../StackItem/StackItemComponent";
import SoftSkillItem from "../SoftSkillItem/SoftSkillItemComponent";

import Card from "@material-ui/core/Card";
import BusinessIcon from '@material-ui/icons/Business';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import LanguageIcon from '@material-ui/icons/Language';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";

// Redux
import { useWindowDimensions } from "app/hooks";
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { fetchPersonalProfile, selectPersonalProfile } from "./personalProfileSlice";
import { fetchNuweProfile, selectNuweProfile } from "./nuweProfileSlice";
import { fetchSpecialities, selectSpecialities } from "./specialitySlice";
import { fetchSpecialityLevels, selectSpecialityLevels } from "./specialityLevelSlice";
import { fetchCompanyTypes, selectCompanyTypes } from "./companyTypeSlice";
import { PersonalProfile } from "domain/model/PersonalProfile";
import { NuweProfile } from "domain/model/NuweProfile";
import { IdName } from "domain/model/IdName";

const Profile = () => {
    const theme = useTheme();
    const classes = useStyles();
    const {width } = useWindowDimensions();
    const notMobile = useMediaQuery(theme.breakpoints.up('sm'));
    // TODO: Add to an utility modul
    const getPeriod = (from: Date | string, to: Date | string) => {
        let f: Date, t: Date;
        let res: string;
        
        console.log("FF", typeof from, from)
        console.log("TT", typeof to, to)
        if (typeof from === "string")
            f = new Date(from);
        else
            f = from;
        if (typeof to === "string")
            t = new Date(to);
        else
            t = to;
        const time = f.getTime() - t.getTime();
        if (Math.abs(time) <= 60 * 1000 )
            return "ahora";
        if (time > 0)
            res = "hace ";
        else
            res = "dentro de ";
        const min = Math.round(Math.abs(time) / (60 * 1000));
        if (min < 60) {
            if (min === 1)
                return res + "un minuto";
            else
                return res + min + " minutos";
        }
        const hor = Math.round(min / 60);
        if (hor < 24) {
            if (hor === 1)
                return res + "una hora";
            else
                return res + hor + " horas";
        }
        const dias = Math.round(hor / 24);
        if (dias < 31) {
            if (dias === 1) {
                if (time > 0)
                    return "ayer";
                else
                    return "mañana";
            } else {
                return res + dias + " días";
            }
        }
        const meses = Math.round(dias / 30);
        if (meses < 12) {
            if (meses === 1)
                return res + "un mes";
            else
                return res + hor + " meses";
        }
        return "más de un año";
    }

    // Redux
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
            
    }, [dispatch, isReady]);

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
    // Skills render position calculations
    const calcPentagon = (n: number, r: number) => {
        const penta: [x: number, y: number][] = [];
        for (let i = 0; i < n; i++) {
            const x = r * Math.sin(2 * Math.PI * i / n);
            const y = r * Math.cos(2 * Math.PI * i / n);
            penta.push([x, y]);
        }
        return penta;
    }
    const offsetX = (width - (notMobile ? 290 : 0)) / 2 - 50;
    const radio = offsetX > 250 ? 250 : offsetX
    const offsetY = 70;
    const penta = calcPentagon(5, radio);
    const hardSkillsHeight = nuweProfile.hardSkills.length === 0
        ? 0
        : nuweProfile.hardSkills.length > 2 
        ? 3 * radio + 120 // 3, 4 or 5
        : 2 * radio + 120 // 1 or 2
    const softSkillsHeight = nuweProfile.softSkills.length === 0
        ? 0
        : nuweProfile.softSkills.length > 2 
        ? 3 * radio + 120
        : 2 * radio + 120

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
            <div style={{textAlign: "left"}}>
                {/* <Typography variant="h6" className="caption">Hard skills validadas en NUWE</Typography>             */}
            </div>
            {/* TODO: Put the skills in its own component */}
            <Paper className={classes.skills} style={{height: hardSkillsHeight}} variant="outlined" >
                <div style={{textAlign: "center"}}>
                    <Typography variant="h6">Top 5 hard skills</Typography>
                </div>
                <img className={classes.pentagon}
                    src={Pentagon}
                    alt="Pentágono"
                    style={{
                        width: radio,
                        transform: `translate(
                            ${offsetX - (radio / 2) + 50}px, 
                            ${offsetY + radio - 90}px
                        )`
                    }}>
                </img>
                {nuweProfile.hardSkills.map((value, i) => {
                    if (i > 4)
                        return null;
                    let y: number;
                    if (penta[i][1] >= 0)
                        y = radio - penta[i][1];
                    else {
                        y = penta[i][1] * -1 + radio;
                    }
                    if (i === 0)
                        y -= 50;
                    else if (i === 1 || i === 4)
                        y -= 20
                    return (
                        <StackItem key={i}
                            name={value.name}
                            points={value.points}
                            topPct={value.topPct}
                            x={offsetX + penta[i][0]}
                            y={offsetY + y} />
                    )
                })}
            </Paper>
            <Paper style={{height: 180}} className={classes.carousel}>
                <List className={"content"}>
                    {nuweProfile.hardSkills.map((value, i) => {
                        if (i < 5)
                            return null;
                        return (
                            <StackItem key={i}
                                name={value.name}
                                points={value.points}
                                topPct={value.topPct} />
                        )
                    })}
                </List>
            </Paper>
            {/* 
            //      Soft Skills
            */}
            <div style={{textAlign: "left"}}>
                {/* <Typography variant="h6" className="caption">Soft skills validadas en NUWE</Typography>             */}
            </div>
            <Paper className={classes.skills} style={{height: softSkillsHeight}} variant="outlined" >
                <div style={{textAlign: "center"}}>
                    <Typography variant="h6">Puntuaciones retos grupales</Typography>
                </div>
                {/* <Paper className={ `className="container" ${classes.skills}`} style={{height: 3 * radio}}> */}
                    <img className={classes.pentagon}
                        src={Pentagon}
                        alt="Pentágono"
                        style={{
                            width: radio,
                            transform: `translate(
                                ${offsetX - (radio / 2) + 50}px, 
                                ${offsetY + radio - 90}px
                            )`
                        }}>
                    </img>
                    {nuweProfile.softSkills.map((value, i) => {
                        if (i > 4)
                            return null;
                        let y: number;
                        if (penta[i][1] >= 0)
                            y = radio - penta[i][1];
                        else {
                            y = penta[i][1] * -1 + radio;
                        }
                        if (i === 0)
                            y -= 50;
                        else if (i === 1 || i === 4)
                            y -= 20
                        return (
                            <SoftSkillItem key={i}
                                name={value.name}
                                idx={i}
                                points={value.points}
                                topPoints={value.topPoints}
                                x={offsetX + penta[i][0]}
                                y={offsetY + y} />
                        )
                    })}
                {/* </Paper> */}
            </Paper>
            <Paper style={{height: 180}} className={classes.carousel}>
                <List className={"content"}>
                    {nuweProfile.softSkills.map((value, i) => {
                        if (i < 5)
                            return null;
                        return (
                            <SoftSkillItem key={i}
                                name={value.name}
                                idx={i}
                                points={value.points}
                                topPoints={value.topPoints} 
                            />
                        )
                    })}
                </List>
            </Paper>
        </>
    )
}

export default Profile;
