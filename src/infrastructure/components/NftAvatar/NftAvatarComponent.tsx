import { createRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { putPersonalProfile, resetStatus } from "../Profile/slices/personalProfileSlice";
import useStyles from "./styles";

import { useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
//import useStyles from "./styles";

// const useStyles = makeStyles((theme: Theme) =>
//     ({
//         root: {
//             display: "flex",
//             jutifyContent: "center"
//         },
//         container: {
//             display: "flex",
//             flex: 1,
//             [theme.breakpoints.down("sm")]: {
//                 width: "100%",
//                 height: "calc(100vh - 60px)"
//             },
//             [theme.breakpoints.up("sm")]: {
//                 width: "calc(100vw - 300px)",
//                 height: "calc(100vh - 148px)"
//             },
//         }
//     })
// );

const NftAvatar = () => {
    //const theme = useTheme();
    const classes = useStyles();
    const history = useHistory();
    //const [avatar, setAvatar] = useState<string[]>([])
    const [isReady, setReady] = useState<boolean>(false)
    const ref = createRef<HTMLIFrameElement>();

    // Redux
    // const personalProfile = useAppSelector(selectPersonalProfile) as PersonalProfile;
    const personalProfileStatus = useAppSelector(state => state.personalProfile.status)
    const personalProfileError = useAppSelector(state => state.personalProfile.error)
    const dispatch = useAppDispatch()
    /* const triggerDownload = (imgURI: string) => {
        var evt = new MouseEvent('click', {
            view: window,
            bubbles: false,
            cancelable: true
        });

        var a = document.createElement('a');
        a.setAttribute('download', 'MY_COOL_IMAGE.png');
        a.setAttribute('href', imgURI);
        a.setAttribute('target', '_blank');

        a.dispatchEvent(evt);
    }; */
    const toPng = (svg: string, width: number, height: number): Promise<string> => {
        const canvas = document.getElementById('canvasId') as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const DOMURL = window.URL || window.webkitURL || window;
        const img = new Image();
        const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        const url = DOMURL.createObjectURL(svgBlob);
        
        return new Promise((resolve, reject) => {
            try {
                img.onload = () => {
                    ctx?.drawImage(img, 0, 0);
                    DOMURL.revokeObjectURL(url);

                    var imgURI = canvas
                        .toDataURL('image/png')
                        .replace('image/png', 'image/octet-stream');
                    // triggerDownload(imgURI);
                    resolve(imgURI);
                };

                img.src = url;
            } catch (error) {
                reject(error);
            }

        });
    };

    useEffect(() => {
        const handleMessage = (ev: any) => {
            if (!ev.data.source || !ev.data.source.startsWith("charactercreator"))
                return;
            const av: string[] = [];
            toPng(ev.data.payload[0], 560, 560)
                .then(val => { av.push(val); return toPng(ev.data.payload[1], 560, 560) })
                .then(val => { av.push(val); return toPng(ev.data.payload[2], 560, 560) })
                .then(val => { 
                    av.push(val); 
                    dispatch(putPersonalProfile({avatar: av[2], avatarMedium: av[1], avatarFull: av[0]}));
                })
                .then()
                .catch(error => alert(error));
        }

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    });

    useEffect(() => {
        const constructor = async () => {
            try {
                dispatch(resetStatus());
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

    if (personalProfileStatus === "loading")
        return (<div className={classes.loadingError}>
                    <CircularProgress />
                    <Typography variant="h4">Guardando...</Typography>
                </div>);
    else if (personalProfileStatus === "failed")
        return(<div className={classes.loadingError}>{personalProfileError}</div>);
    else if (personalProfileStatus === "succeeded")
        history.push("/profile");

    return (
        <div className={classes.container}>
            <canvas id="canvasId" width={600} height={600} style={{ display: "none" }}></canvas>
            <iframe ref={ref} width="100%" title="Character Creator" src="http://manuelgc.eu/charactercreator"></iframe>
        </div>
    );

}
export default NftAvatar;

