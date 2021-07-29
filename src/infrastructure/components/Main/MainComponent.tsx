import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import SubjectSharpIcon from '@material-ui/icons/SubjectSharp';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { HashRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';

import useStyles from './styles';

import logo from '../../assets/img/Nuwe_Mono_white.png';
import letters from '../../assets/img/Nuwe_Letters_white.png';
import logoGreen from '../../assets/img/Nuwe_Mono.png';
import lettersGreen from '../../assets/img/Nuwe_Letters.png';
import { HomeIcon, WorkIcon, ProfileIcon, ContactIcon } from '../Icons/Icons';

const Another = React.lazy(() => import('../Another/AnotherComponent'));
const Profile = React.lazy(() => import('../Profile/ProfileComponent'));
const Nft = React.lazy(() => import('../NftAvatar/NftAvatarComponent'));

const Main = (props: any) => {
    // const { window } = props;
    const theme = useTheme();
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const notMobile = useMediaQuery(theme.breakpoints.up('sm'));
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const closeDrawer = () => {
        setMobileOpen(false);
    };
    const drawer = (
        <div>
            <div className={classes.toolbar} >
                {notMobile && <>
                    <img className={classes.logo} src={logoGreen} alt="Logo" />
                    <img className={classes.logo} src={lettersGreen} alt="Nuwe" />
                </>}
                {!notMobile && <>
                    <img className={classes.logo} src={logo} alt="Logo" />
                    <img className={classes.logo} src={letters} alt="Nuwe" />
                </>}
            </div>
            <Divider />
            <List>
                <ListItem className={classes.animation} button key={'panel'} onClick={closeDrawer} component={Link} to="/panel">
                    <ListItemIcon><HomeIcon className={classes.icon} viewBox="0 0 101 100" /></ListItemIcon>
                    <ListItemText primary={<Typography variant="subtitle1">Panel</Typography>} />
                </ListItem>
                <ListItem className={classes.animation} button key={'enterprises'} onClick={closeDrawer} component={Link} to="/enterprises">
                    <ListItemIcon><WorkIcon className={classes.icon} viewBox="0 0 101 100" /></ListItemIcon>
                    {/* <ListItemText primary={<Typography variant="subtitle1" style={{ color: '#ff6f00' }}>Empresas</Typography>}/> */}
                    <ListItemText primary={<Typography variant="subtitle1">Empresas</Typography>} />
                </ListItem>
                <ListItem className={classes.animation} button key={'profile'} onClick={closeDrawer} component={Link} to="/profile">
                    <ListItemIcon><ProfileIcon className={classes.icon} viewBox="0 0 101 100" /></ListItemIcon>
                    <ListItemText primary={<Typography variant="subtitle1">Perfil</Typography>} />
                </ListItem>
                <ListItem className={classes.animation} button key={'contact'} onClick={closeDrawer} component={Link} to="/contact">
                    <ListItemIcon><ContactIcon className={classes.icon} viewBox="0 0 101 100" /></ListItemIcon>
                    <ListItemText primary={<Typography variant="subtitle1">Contacto</Typography>} />
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolBar2}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            < SubjectSharpIcon className={classes.menuIcon} />
                        </IconButton>
                        <Hidden smUp implementation="css">
                            <div className="logoContainer">
                                <img src={logo} alt="Logo" />
                                <img src={letters} alt="Nuwe" />
                            </div>
                        </Hidden>
                        <IconButton
                            color="inherit"
                            aria-label="Configuration"
                            edge="end"
                            // onClick={handleDrawerToggle}
                            className={classes.configButton}
                        >
                            <SettingsRoundedIcon className={classes.menuIcon} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            // container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/panel" />
                            </Route>
                            <Route exact path="/nuwe2101">
                                <Redirect to="/panel" />
                            </Route>
                            <Route exact path="/panel">
                                <Redirect to="/other/panel" />
                            </Route>
                            <Route exact path="/enterprises">
                                <Redirect to="/other/enterprises" />
                            </Route>
                            <Route exact path="/profile">
                                <Profile />
                            </Route>
                            <Route exact path="contact">
                                <Redirect to="/other/contact" />
                            </Route>
                            {/* <Route path="/:id">
                                <Another />
                            </Route> */}
                            <Route path="/other/:id">
                                <Another />
                            </Route>
                            <Route exact path="/charactercreator">
                                {/* <Redirect to="/charactercreator/index.html" /> */}
                                {/* <Another /> */}
                                <Nft />
                            </Route>
                        </Switch>
                    </React.Suspense>
                </main>
            </div>
        </Router>
    );
}

export default Main;