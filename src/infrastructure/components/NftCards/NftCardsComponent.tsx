import { createRef, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { PersonalProfile } from "domain/model/PersonalProfile";
import { NuweProfile } from "domain/model/NuweProfile";
import { fetchPersonalProfile, selectPersonalProfile } from "../Profile/slices/personalProfileSlice";
import { fetchNuweProfile, selectNuweProfile } from "../Profile/slices/nuweProfileSlice";
import { fetchSpecialities, selectSpecialities } from "../Profile/slices/specialitySlice";
import { fetchSpecialityLevels, selectSpecialityLevels } from "../Profile/slices/specialityLevelSlice";
import { fetchCompanyTypes, selectCompanyTypes } from "../Profile/slices/companyTypeSlice";
import { IdName } from "domain/model/IdName";
import useStyles from "./styles";
import NftSkills from "../NftSkills/NftSkillsComponent";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const NftCards = () => {
    const theme = useTheme();
    const [isShown, setShown] = useState(true);
    const classes = useStyles(); // new Map(...useStyles());

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
        return(<div className={classes.loadingError}>{personalProfileError}{nuweProfileError}</div>)

    return (
        <Card onClick={() => setShown(!isShown)} className={classes.card}>
            <div className={classes.content + ` ${isShown ? "shown" : ""}`}>
                
                <CardContent className={classes.front}>
                    <div>
                        <Avatar style={{position: "absolute"}} variant="rounded" sizes={"width: 70, width: 100"} className={classes.avatarFront} aria-label="avatar" src={personalProfile.avatarMedium}>
                        </Avatar>
                        <div className={classes.inner}>
                            <div style={{marginLeft: 80}}>
                                <Typography variant="h6">{personalProfile.username}</Typography>
                                <Typography>
                                    {getName(personalProfile.speciality, specialities)} |&nbsp;
                                    {getName(personalProfile.specialityLevel, specialityLevels)}
                                </Typography>
                                <Typography variant="subtitle2">{personalProfile.job}</Typography>
                            </div>
                            <Typography variant="h6">{personalProfile.username}</Typography>
                            <Typography variant="h6">{personalProfile.username}</Typography>
                                    
                            <h2>Cozy apartment</h2>
                            <div className="rating">
                                Contenido
                                Contenido
                            </div>
                            <NftSkills title={"El título"}
                                hard={nuweProfile.hardSkills?.slice(0, 5) || []}
                                soft={nuweProfile.softSkills?.slice(0, 5) || []}></NftSkills>
                            {/* <label for="card1" class="button" aria-hidden="true">
                                Details
                            </label> */}
                        </div>
                    </div>
                </CardContent>
                <CardContent className={classes.back}>
                    <div style={{height: "100%"}}>
                        <Avatar style={{position: "absolute"}} variant="rounded" className={classes.avatarBack} aria-label="avatar" src={personalProfile.avatarFull}></Avatar>
                        <div className={classes.inner}>
                            <div style={{marginLeft: 80}}>
                                <Typography variant="h6">{personalProfile.username}</Typography>
                                <Typography>
                                    {getName(personalProfile.speciality, specialities)} |&nbsp;
                                    {getName(personalProfile.specialityLevel, specialityLevels)}
                                </Typography>
                                <Typography variant="subtitle2">{personalProfile.job}</Typography>
                            </div>
                            <Typography variant="h6">{personalProfile.username}</Typography>
                            <Typography variant="h6">{personalProfile.username}</Typography>
                                    
                            <QRCode className={classes.qr} size={200} bgColor={"#000000ff"} fgColor={theme.palette.primary.light} value="http://facebook.github.io/react/" />
                            {/* <label for="card1" class="button" aria-hidden="true">
                                Details
                            </label> */}
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

export default NftCards;

