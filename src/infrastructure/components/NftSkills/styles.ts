import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth=270;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            padding: 0,
            
        }, 
        pentagon: {
            width: "100px",
            height: "100px",
            position: "absolute"
          },
        skills: {
            position: "relative",
            display: "block",
            margin: 0,
            marginTop: 20
        },
        
    })
);

export default useStyles;
