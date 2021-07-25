import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            jutifyContent: "center"
        },
        container: {
            // width: "80vw",
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
           //padding: theme.spacing(2)
        },
        formControl: {
            flex: 1
        },
        inlineControls: {
            display: "flex",
            gap: theme.spacing(1),
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column"
            },
            [theme.breakpoints.up("sm")]: {
                flexDirection: "row"
            }        
        },
        button: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            transition: "transform 300ms",
            "&:hover": {
                transform: "translate(0,-15%)!important",
                backgroundColor: theme.palette.warning.light
            },       
        }

    })
);

export default useStyles;