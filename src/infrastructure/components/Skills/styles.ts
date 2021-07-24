import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth=270;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            padding: 0,
            
        }, 
        pentagon: {
            width: "250px",
            height: "250px",
            position: "absolute"
          },
        skills: {
            position: "relative",
            display: "block",
            margin: 0,
            marginTop: 20
        },
        carousel: {
            flex: 1,
            flexGrow: 0,
            maxWidth: "100vw",
            overflowY: 'auto', // 'scroll',
            paddingLeft: 5,
            [theme.breakpoints.up("sm")]: {
                width: `calc(100vw - ${drawerWidth}px)`,
                height: 190
            },
            "& .content": {
                display: "flex",
                flexDirection: "row",
                justifyItems: "left",
                gap: 5,
                height: 160
            }
        },
    })
);

export default useStyles;
