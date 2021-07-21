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

import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';

import useStyles from './styles';
import Another from '../Another/AnotherComponent';
import Profile from '../Profile/ProfileComponent';

import logo from '../../assets/img/Nuwe_Mono 1.png';
import letters from '../../assets/img/Nuwe_Letters.png';
import { HomeIcon, WorkIcon, ProfileIcon, ContactIcon, MenuIcon } from '../Icons/Icons';

const Main = (props: any) => {
    // const { window } = props;
    const theme = useTheme();
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} >
                <img className={classes.logo} src={logo} alt="Logo" />
                <img className={classes.logo} src={letters} alt="Nuwe" />
            </div>
            <Divider />
            <List>
                <ListItem button key={'panel'} component={Link} to="/panel">
                    <ListItemIcon><HomeIcon className={classes.icon} viewBox="0 0 101 100" /></ListItemIcon>
                    <ListItemText primary={<Typography variant="subtitle1">Panel</Typography>} />
                </ListItem>
                <ListItem button key={'enterprises'} component={Link} to="/enterprises">
                    <ListItemIcon><WorkIcon className={classes.icon} viewBox="0 0 101 100" /></ListItemIcon>
                    {/* <ListItemText primary={<Typography variant="subtitle1" style={{ color: '#ff6f00' }}>Empresas</Typography>}/> */}
                    <ListItemText primary={<Typography variant="subtitle1">Empresas</Typography>} />
                </ListItem>
                <ListItem button key={'profile'} component={Link} to="/profile">
                    <ListItemIcon><ProfileIcon className={classes.icon} viewBox="0 0 101 100" /></ListItemIcon>
                    <ListItemText primary={<Typography variant="subtitle1">Perfil</Typography>} />
                </ListItem>
                <ListItem button key={'contact'} component={Link} to="/contact">
                    <ListItemIcon><ContactIcon className={classes.icon} viewBox="0 0 101 100" /></ListItemIcon>
                    <ListItemText primary={<Typography variant="subtitle1">Contacto</Typography>} />
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    // const container = window !== undefined ? () => window().document.body : undefined;

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
                            onClick={handleDrawerToggle}
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
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/panel" />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/:id">
                            <Another />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default Main;