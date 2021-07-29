import {  makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    ({
        root: {
            display: "flex",
            jutifyContent: "center"
        },
        container: {
            display: "flex",
            flex: 1,
            paddingTop: 20,
            [theme.breakpoints.down("sm")]: {
                width: "100%",
                height: "calc(100vh - 60px)"
            },
            [theme.breakpoints.up("sm")]: {
                width: "calc(100vw - 300px)",
                height: "calc(100vh - 64px - 48px)"
            }
        },
        loadingError: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
        }
    })
);

export default useStyles;