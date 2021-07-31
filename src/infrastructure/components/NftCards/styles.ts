import {  makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
        ({
            root: {
                display: "flex",
                jutifyContent: "center",
                overflowX: "hidden",
                width: "100vw"
            },
            container: {
                display: "flex",
                flexShrink: 0,
                flexGrow: 0,
                justifyContent: "space-evenly",
                width: "100%",
                transform: "scaleY(90%)",
                marginTop: "-2rem",
                [theme.breakpoints.up("sm")]: {
                    width: "calc(100vw - 300px)",
                    height: "calc(100vh - 64px - 48px)",
                    justifyContent: "space-between",
                    transform: "scale(70%)",
                    alignItems: "center"
                },
            },
            loadingError: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 400,
            },
            miniCard: {
                width: "150px",
                height: "210px",
            	borderRadius: "6px",
                backgroundColor: "#023502",
                borderWidth: ".5em",
                borderColor: theme.palette.primary.main,
                borderStyle: "solid",
                color: "white",
                padding: 5,
                flexShrink: 0,
                flexGrow: 0,
                position: "relative",
                "& .avatar": {
                    bottom: 0,
                    height: "80%",
                    width: "65%",
                    transform: "scale(0.95)",
                    left: 0
                },
                "& $emblemaFront": {
                    marginTop: "4.5em",
                    marginLeft: "3.5em"
                },
                "& .footer": {
                    flex: 1, 
                    width: "50%", 
                    justifyContent: "flex-end",
                    position: "absolute",
                    bottom: 0,
                    right: 5,
                    height: 50,
                    color: theme.palette.primary.light,
                    "& .position": {
                        fontWeight: "bolder",
                        display: "flex",
                        "justifyContent": "flex-end"
                    }
                }
            }, 
            card: {
                width: "350px",
                height: "620px",
                perspective: "1500px",
                overflow: "visible",
                flexShrink: 0,
                flexGrow: 0,
                margin: 0,
                marginTop: "20px",
                "& $content": {
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.8s cubic-bezier(0.75, 0, 0.85, 1)",
                    "&.shown": {
                        transform: "rotateY(180deg)"
                    }
                },
            },
            content: {},
            
            front: {
                backgroundSize: "cover",
                backgroundPosition: "center center",
            	position: "absolute",
            	top: 0,
            	left: 0,
            	width: "100%",
            	height: "100%",
            	backfaceVisibility: "hidden",
            	transformStyle: "preserve-3d",
            	borderRadius: "6px",
                backgroundColor: "#023502",
                borderWidth: ".5em",
                borderColor: theme.palette.primary.main,
                borderStyle: "solid",
                "& $inner": {
                    color: "white",
                    fontSize: 8,
                    justifyItems: "center",
            		height: "100%",
            		padding: ".5em",
            		transform: "translateZ(80px) scale(0.94)"
                },
            },
            inner: {},
            back: {
            	top: 0,
            	left: 0,
            	width: "100%",
            	height: "100%",
            	backfaceVisibility: "hidden",
            	transformStyle: "preserve-3d",
            	borderRadius: "6px",
                backgroundColor: "#023502",
                borderWidth: ".5em",
                borderColor: theme.palette.primary.main,
                borderStyle: "solid",
                transform: "rotateY(180deg)",
                padding: "2em",
                position: "absolute",

                backgroundSize: "cover",
                backgroundPosition: "center center",
            	"& $inner": {
                    color: "white",
                    fontSize: 8,
                    justifyItems: "center",
            		height: "100%",
            		padding: ".5em",
            		transform: "translateZ(80px) scale(0.94)",
                    position: "relative"
            	}
            },
            avatarFront: {
                width: "120px!important",
                height: "120px!important",
                marginLeft: "-1.5em",
                marginTop: "-.75em",
                position: "absolute",
                transform: "translateZ(40px) scale(0.94)"
            },
            emblemaFront: {
                width: "50px!important",
                height: "50px!important",
                marginLeft: "2em",
                marginTop: "3.5em",
                position: "absolute",
                transform: "translateZ(80px) scale(0.94)"
            },
            avatarBack: {
                height: "100%!important",
                border: "2px solid transparent",
                width: "160%!important",
                position: "absolute",
                transform: "translateX(-40%) translateZ(40px) scale(0.94)",
                "&.hide": {
                    transform: "translateX(0)"
                }
            },
            emblemaBack: {
                width: "50px!important",
                height: "50px!important",
                marginLeft: "5em",
                marginTop: "14em",
                position: "absolute",
                transform: "translateZ(80px) scale(0.94)",
                "&.emblema01": {
                    marginLeft: "7.2em"
                },
                "&.emblema02": {
                    marginLeft: "9.4em"
                },
                "&.emblema03": {
                    marginLeft: "11.6em"
                }            
            },
            qr: {
                position: "absolute",
                width: "80%",
                bottom: "0",
                right: "0",
                marginRight: "-2.5em",
                marginBottom: "-2.5em",
                filter: "brightness(2)",
                borderColor: "#023502",
                borderStyle: "solid",
                borderWidth: "1em",
                transform: "translateZ(80px) scale(0.94)"
            },
            fallback: {
                display: "none"
            },
            rootAvatar: {
                width: "auto",
                height: "auto"
            },
            footer: {
                position: "absolute", 
                bottom: 0, 
                color: "white",
                display: "flex",
                flexDirection: "column",
                width: "90%",
                "& div": {
                    display: "flex",
                    justifyContent: "space-between"
                }
            },
            position: {
                color: theme.palette.primary.light,
                fontSize: 120,
                lineHeight: "120px",
                fontWeight: "bolder",
                "&.centenas": {
                    fontSize: 90
                }
            }
        })
);
export default useStyles;