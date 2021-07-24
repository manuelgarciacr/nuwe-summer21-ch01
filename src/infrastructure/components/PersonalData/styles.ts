import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            jutifyContent: "center"
        },
        container: {
            width: "80vw",
            maxWidth: theme.spacing(60)
        },
        title: {
            marginLeft: 20, 
            fontWeight: "bolder"
        },
        form: {
           display: "flex",
           flexDirection: "column",
           gap: theme.spacing(2),
           padding: theme.spacing(2)
        },
        formControl: {

        }
        // drawer: {
        //     [theme.breakpoints.up("sm")]: {
        //         width: drawerWidth,
        //         flexShrink: 0,
        //     },
        // },
        // appBar: {
        //     [theme.breakpoints.up("sm")]: {
        //         width: `calc(100vw - ${drawerWidth}px)`,
        //         marginLeft: drawerWidth,
        //         backgroundColor: "transparent"
        //     },
        //     //backgroundColor: "transparent",
        //     border: "none",
        //     boxShadow: "none",
        // },
        // toolBar2: {
        //     flex: 1,
        //     flexDirection: "row",
        //     justifyContent: "space-between",
        //     [theme.breakpoints.up("sm")]: {
        //         justifyContent: "flex-end"
        //     },
        //     '& div.logoContainer': {
        //         '& img': {
        //             height: "30px",
        //             margin: 5
        //         }
        //     },
        // },
        // menuButton: {
        //     marginRight: theme.spacing(2),
        //     fontSize: 64,
        //     [theme.breakpoints.up("sm")]: {
        //         display: "none",
        //     },
        // },
        // menuIcon: {
        //     fontSize: 36,
        // },
        // configButton: {
        //     [theme.breakpoints.up("sm")]: {
        //         color: theme.palette.primary.main
        //     },
        // },
        // // necessary for content to be below app bar
        // toolbar: theme.mixins.toolbar,
        // logo: {
        //     height: "40px",
        //     margin: 20
        // },
        // icon: {
        //     fontSize: 32
        // },
        // drawerPaper: {
        //     width: drawerWidth,
        // },
        // content: {
        //     flexGrow: 1,
        //     [theme.breakpoints.up("sm")]: {
        //         padding: theme.spacing(3)
        //     },
        // },
    })
);

export default useStyles;