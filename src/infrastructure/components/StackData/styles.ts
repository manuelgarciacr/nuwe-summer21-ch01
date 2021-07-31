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
        form: {
           display: "flex",
           flexDirection: "column",
           gap: theme.spacing(2),
           //padding: theme.spacing(2)
        },
        button: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            transition: "transform 300ms",
            "&:hover": {
                transform: "translate(0,-15%)",
                backgroundColor: theme.palette.warning.main
            },
        },
    })
);

export default useStyles;