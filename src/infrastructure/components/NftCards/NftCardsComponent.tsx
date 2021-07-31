import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { PersonalProfile } from "domain/model/PersonalProfile";
import { NuweProfile } from "domain/model/NuweProfile";
import { fetchPersonalProfile, selectPersonalProfile } from "../Profile/slices/personalProfileSlice";
import { fetchNuweProfile, selectNuweProfile } from "../Profile/slices/nuweProfileSlice";
import { fetchSpecialities, selectSpecialities } from "../Profile/slices/specialitySlice";
import { fetchSpecialityLevels, selectSpecialityLevels } from "../Profile/slices/specialityLevelSlice";
import { fetchCompanyTypes } from "../Profile/slices/companyTypeSlice";
import { IdName } from "domain/model/IdName";
import useStyles from "./styles";
import NftSkills from "../NftSkills/NftSkillsComponent";
import image2 from "../../assets/img/image2.png";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

function getWindowSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
        width,
        height,
        portrait: height > width
    };
}

const NftCards = (props: any) => {
    const theme = useTheme();
    const [isShown, setShown] = useState(false);
    const classes = useStyles();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPortrait, setPortrait] = useState(getWindowSize().portrait);
    
    const dispatch = useAppDispatch()
    const personalProfile = useAppSelector(selectPersonalProfile) as PersonalProfile;
    const specialities = useAppSelector(selectSpecialities) as IdName[];
    const specialityLevels = useAppSelector(selectSpecialityLevels) as IdName[];
    const nuweProfile = useAppSelector(selectNuweProfile) as NuweProfile;
    const QRCode = require('qrcode.react');
    const getName = (id: number, arr: IdName[]) =>
        arr.find(v => v.id === id)?.name || "";

    const personalProfileStatus = useAppSelector(state => state.personalProfile.status)
    const nuweProfileStatus = useAppSelector(state => state.nuweProfile.status)
    const specialityStatus = useAppSelector(state => state.speciality.status)
    const specialityLevelStatus = useAppSelector(state => state.specialityLevel.status)
    const companyTypeStatus = useAppSelector(state => state.companyType.status)

    const personalProfileError = useAppSelector(state => state.personalProfile.error)
    const nuweProfileError = useAppSelector(state => state.nuweProfile.error)


    const ok = Object.keys(personalProfile).length > 0
        && Object.keys(nuweProfile).length > 0

    const [isReady, setReady] = useState(ok);

    useEffect(() => {
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
        return (<div className={classes.loadingError}>{personalProfileError}{nuweProfileError}</div>)

    const centenas = nuweProfile.global > 99;
    const miles = nuweProfile.global > 999;

    return (
        <div className={classes.container}>
            

            {isWidthUp('sm', props.width) && <Card className={classes.miniCard}>
                <div>
                    <Avatar style={{ position: "absolute" }} variant="rounded" sizes={"width: 70, width: 100"} className={"avatar"} aria-label="avatar" src={personalProfile.avatarMedium}>
                    </Avatar>
                    <Avatar style={{ position: "absolute" }} variant="rounded" sizes={"width: 50, width: 50"} className={classes.emblemaFront} aria-label="avatar" src={image2}>
                    </Avatar>
                    <Typography variant="h6" style={{fontSize: 16}}>{personalProfile.username}</Typography>
                    <Typography variant="body1" style={{fontSize: 8}}>
                        {getName(personalProfile.speciality, specialities)} |&nbsp;
                        {getName(personalProfile.specialityLevel, specialityLevels)}
                    </Typography>
                    <div className="footer">
                        <Typography variant={miles ? "h4" : "h3"} className={"position"}>{nuweProfile.global}</Typography>
                    </div>
                </div>
            </Card>}
            <Card onClick={() => setShown(!isShown)} className={`${classes.card} on`}>
                <div className={classes.content + ` ${isShown ? "shown" : ""}`}>

                    <CardContent className={classes.front}>
                        <div>
                            <Avatar style={{ position: "absolute" }} variant="rounded" sizes={"width: 70, width: 100"} className={classes.avatarFront} aria-label="avatar" src={personalProfile.avatarMedium}>
                            </Avatar>
                            <Avatar style={{ position: "absolute" }} variant="rounded" sizes={"width: 50, width: 50"} className={classes.emblemaFront} aria-label="avatar" src={image2}>
                            </Avatar>
                            <div className={classes.inner}>
                                <div style={{ marginLeft: 65 }}>
                                    <Typography variant="subtitle1">{personalProfile.username}</Typography>
                                    <Typography>
                                        {getName(personalProfile.speciality, specialities)} |&nbsp;
                                        {getName(personalProfile.specialityLevel, specialityLevels)}
                                    </Typography>
                                    <Typography style={{ right: 0, alignSelf: "flex-end" }} variant="subtitle2">{personalProfile.job}</Typography>
                                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 5, marginTop: ".2rem" }}>
                                        <div style={{ display: "flex", gap: 5, alignItems: "baseline" }}>
                                            <Typography variant="subtitle1">{nuweProfile.position}º</Typography>
                                            <Typography variant="subtitle2"> {nuweProfile.country}</Typography>
                                        </div>
                                        <div style={{ display: "flex", gap: 5, alignItems: "baseline" }}>
                                            <Typography variant="subtitle1">{nuweProfile.europe}º </Typography>
                                            <Typography variant="subtitle2"> Gral. Europa</Typography>
                                        </div>
                                    </div>
                                </div>
                                <NftSkills
                                    hard={nuweProfile.hardSkills?.slice(0, 5) || []}
                                    soft={nuweProfile.softSkills?.slice(0, 5) || []}></NftSkills>
                            </div>
                            <div className={classes.footer}>
                                <div style={{ height: 8 }}> </div>
                                <Divider style={{ backgroundColor: "white", opacity: .5, marginTop: 8 }} />
                                <div style={{ display: "flex", gap: 5, flex: 1 }}>
                                    <div style={{ marginTop: 8, flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
                                        <div>
                                            <Typography variant="subtitle2">Hackathons</Typography>
                                            <Typography variant="subtitle2">{nuweProfile.hackathons}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant="subtitle2">Challenges</Typography>
                                            <Typography variant="subtitle2">{nuweProfile.challenges}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant="subtitle2">Proyectos OS</Typography>
                                            <Typography variant="subtitle2">{nuweProfile.projectsOS}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant="subtitle2">Emblemas</Typography>
                                            <Typography variant="subtitle2">{nuweProfile.pins}</Typography>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1, justifyContent: "center" }}>
                                        <Typography variant="h1" className={`${classes.position} ${centenas ? "centenas" : ""}`}>{nuweProfile.global}</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardContent className={classes.back}>
                        <div style={{ height: "100%" }}>
                            <Avatar style={{ position: "absolute" }} variant="rounded" className={classes.avatarBack} aria-label="avatar" src={personalProfile.avatarFull}></Avatar>
                            <div className={classes.inner}>
                                <Avatar style={{ position: "absolute" }} variant="rounded" sizes={"width: 50, width: 50"} className={classes.emblemaBack} aria-label="avatar" src={image2}>
                                </Avatar>
                                <Avatar style={{ position: "absolute" }} variant="rounded" sizes={"width: 50, width: 50"} className={`${classes.emblemaBack} emblema01`} aria-label="avatar" src={image2}>
                                </Avatar>
                                <Avatar style={{ position: "absolute" }} variant="rounded" sizes={"width: 50, width: 50"} className={`${classes.emblemaBack} emblema02`} aria-label="avatar" src={image2}>
                                </Avatar>
                                <Typography style={{ marginTop: "-1em" }} variant="subtitle1">{personalProfile.username}</Typography>
                                <Typography>
                                    {getName(personalProfile.speciality, specialities)} |&nbsp;
                                    {getName(personalProfile.specialityLevel, specialityLevels)}
                                </Typography>
                                <Typography style={{ right: 0, alignSelf: "flex-end" }} variant="subtitle2">{personalProfile.job}</Typography>
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: 5, marginTop: "12rem" }}>
                                    <div style={{ display: "flex", gap: 5, alignItems: "baseline" }}>
                                        <Typography variant="subtitle1">{nuweProfile.position}º</Typography>
                                        <Typography variant="subtitle2"> {nuweProfile.country}</Typography>
                                    </div>
                                    <div style={{ display: "flex", gap: 5, alignItems: "baseline" }}>
                                        <Typography variant="subtitle1">{nuweProfile.europe}º </Typography>
                                        <Typography variant="subtitle2"> Gral. Europa</Typography>
                                    </div>
                                </div>
                                <QRCode className={classes.qr} size={200} bgColor={"#000000ff"} fgColor={theme.palette.primary.light} value={"https://nuwe.io/users/" + personalProfile.username} />
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default withWidth()(NftCards);

