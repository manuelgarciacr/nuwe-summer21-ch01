import Card from "@material-ui/core/Card";

import banner from '../../assets/img/banner_default.png';
import avatar from '../../assets/img/Nuwe_Gradient 1.png';
import { LocationIcon, GithubIcon, LinkedInIcon, GitlabIcon, BehanceIcon } from "../Icons/Icons";
import useStyles from "./styles";
import Pentagon from '../../assets/img/pentagon3.svg';

import BusinessIcon from '@material-ui/icons/Business';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import LanguageIcon from '@material-ui/icons/Language';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import StackItem from "../StackItem/StackItemComponent";
import Hidden from "@material-ui/core/Hidden";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Profile = () => {
    const theme = useTheme();
    const classes = useStyles();
    const {width } = useWindowDimensions();
    const notMobile = useMediaQuery(theme.breakpoints.up('sm'));

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

    return (
        <>
            <Card className={classes.generalCard}>
                <CardMedia
                    className={classes.generalCardMedia}
                    image={banner}
                    title="Imagen de fondo"
                />
                <CardContent className={classes.generalCardContent}>
                    <Avatar className={classes.generalCardAvatar} alt="Avatar del usuario" src={avatar} />
                    <Typography variant="h4" className={classes.generalCardName}>Manuel</Typography>
                    <div className={classes.inline}>
                        <Typography variant="h6">johnnd@micorreo.com | +34 666 666 666</Typography>
                    </div>
                    <Typography variant="h6">Fullstack. Más de 15 años programando software de gestión para grandes empresas. Estos últimos años he estado reciclando mis conocimientos: Angular, React, React native, Cordova, Java, Android, Nodejs, BBDD, etc</Typography>
                    <div className={classes.inline} >
                        <GithubIcon className="icon" viewBox="0 0 150 150" />
                        <LinkedInIcon className="icon" viewBox="0 0 150 150" />
                        <GitlabIcon className="icon" viewBox="0 0 150 150" />
                        <BehanceIcon className={["icon", "large"]} viewBox="0 0 64 64" />
                        <div className="iconned">
                            <LocationIcon className="icon" viewBox="0 0 101 100" />
                            <Typography variant="h6">Barcelona, España</Typography>
                        </div>
                        <Typography variant="h6">Última conexión hace 2 horas</Typography>
                    </div>
                    <Typography variant="h4">Buscando trabajo de fullstack sénior</Typography>
                    <Paper className="paper" variant="outlined" >
                        <Hidden smUp implementation="css">
                            <Typography className="caption" variant="h6">Stack</Typography>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Typography className="caption" variant="h6">Stack indicado por el usuario</Typography>
                        </Hidden>
                        <Paper className="container">
                            {["JAVA", "ANGULAR", "CSS 3", "HTML 5", "JAVA SCRIPT",
                                "REACT", "TYPE SCRIPT", "MARIADB", "MONGODB",
                                "MYSQL", "ANDROID", "REACT NATIVE", "GITHUB", "FIGMA"].map(value => (
                                    <StackItem name={value} />
                                ))}
                        </Paper>
                    </Paper>
                </CardContent>
            </Card>
            <Card className={classes.generalCard}>
                <CardContent className={classes.generalCardContent}>
                    <Typography variant="h4" className={classes.generalCardName}>Sobre el puesto que busca Manuel:</Typography>
                    <div className={classes.inline} >
                        <div className="iconned">
                            <LocationIcon className="icon" viewBox="0 0 101 100" />
                            <Typography variant="h6">Barcelona, España</Typography>
                        </div>
                        <div className="iconned">
                            <BusinessIcon className="icon" />
                            <Typography variant="h6">Startup</Typography>
                        </div>
                        <div className="iconned">
                            <MonetizationOnIcon className="icon" />
                            <Typography variant="h6">40.000 a 45.000 €/a</Typography>
                        </div>
                    </div>
                    <div className={classes.separator}></div>
                    <div className={classes.inline} >
                        <div className="iconned">
                            <FlightTakeoffIcon className="icon" />
                            <Typography variant="h6">Disponibilidad para viajar</Typography>
                        </div>
                        <div className="iconned">
                            <LanguageIcon className="icon" />
                            <Typography variant="h6">Disponibilidad para trabajar en remoto</Typography>
                        </div>
                        <div className="iconned">
                            <DateRangeIcon className="icon" />
                            <Typography variant="h6">Incorporación inmediata</Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className={classes.inline} >
                <Typography variant="h6" style={{ color: theme.palette.primary.dark, textDecorationLine: "underline" }}>Perfil Nuwe</Typography>
                <Typography variant="h6" style={{ marginLeft: "2rem" }}>Timeline CV</Typography>
                <Typography variant="h6" style={{ marginLeft: "2rem" }}>Social</Typography>
            </div>
            <div className={classes.separator}></div>
            {/* <Hidden smUp implementation="css">
                <Typography className="caption" variant="h6">Hard skills validadas en NUWE</Typography>
            </Hidden> */}
            <Hidden xsDown implementation="css">
                <div style={{textAlign: "center"}}>
                    <Typography variant="h6">Perfil validado en NUWE de Manuel:</Typography>
                    <Typography variant="h6">17/2500u/6000pts</Typography>
                </div>
            </Hidden>
            <div style={{textAlign: "center"}}>
                <Typography variant="h6" className="caption">Hard skills validadas en NUWE</Typography>            
            </div>
            <Paper className={classes.skills} style={{height: 3 * radio + 100}} variant="outlined" >
                <div style={{textAlign: "center"}}>
                    <Typography variant="h6">Top 5 hard skills</Typography>
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
                    {["JAVA", "ANGULAR", "CSS 3", "HTML 5", "MYSQL"].map((value, i) => {

                        if (penta[i][1] >= 0)
                            penta[i][1] = radio - penta[i][1];
                        else {
                            penta[i][1] *= -1;
                            penta[i][1] += radio;
                        }
                        if (i === 0)
                            penta[i][1] -= 50;
                        return (
                            <StackItem name={value}
                                x={offsetX + penta[i][0]}
                                y={offsetY + penta[i][1]} />
                        )
                    })}
                {/* </Paper> */}
            </Paper>
        </>
    )
}

export default Profile;
