import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth=270;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            padding: 0,
            
        }, 
        separator: {
            borderWidth: 1,
            borderStyle: "solid",
            width: "100%",
            opacity: .3,
            borderColor: theme.palette.primary.main,
            marginTop: theme.spacing(2)
        },
        loadingError: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400
        },
        generalCard: {
            padding: 0
        },
        generalCardMedia: {
            height: "200px",
        },
        generalCardAvatar: {
            marginTop: theme.spacing(-15),
            backgroundColor: "blue",
            width: theme.spacing(21),
            height: theme.spacing(21)
        },
        generalCardName: {
            marginTop: theme.spacing(2),
        },
        generalCardContent: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            [theme.breakpoints.up("sm")]: {
                width: "95%",
                margin: "2em"
            },
            "& .paper": {
                minHeight: 50,
                textAlign: "left",
                marginTop: theme.spacing(5),
                marginLeft: "-15px",
                marginRight: "-15px",
                [theme.breakpoints.up("sm")]: {
                    width: "95%",
                    marginLeft: 0,
                    marginRight: 0
                },
                "& .caption": {
                    marginTop: theme.spacing(-2.3),
                    marginLeft: 10,
                    backgroundColor: "white",
                    width: "fit-content",
                },
                "& .container": {
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "5px",
                    justifyContent: "center",
                    backgroundColor: "green",
                    paddingTop: 15,
                    paddingBottom: 15,
                    [theme.breakpoints.up("sm")]: {
                        padding: 15,
                        gap: "15px",
                    }
                },
            },
        },
        inline: {
            marginTop: theme.spacing(4),
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: theme.spacing(1),
            "& .icon": {
                fontSize: 30,
                marginLeft: 5,
            },
            "& .icon.large": {
                fontSize: 30,
                marginLeft: 0,
            },
            "& .iconned": {
                paddingLeft: 30,
                paddingRight: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "5px"
            },
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
        }
    })
);

export default useStyles;
