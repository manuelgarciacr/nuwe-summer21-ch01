import {  makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
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
                    height: "calc(100vh - 50px)"
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
            },
    
            card: {
                width: "350px",
                height: "620px",
                margin: "1em",
                perspective: "1500px",
                overflow: "visible",
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
                [theme.breakpoints.down("sm")]: {
                    width: "100%",
                    height: "calc(100vh - 55px)",
                    margin: 0
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
                // "&:after": {
                //     content: '',
                //     position: "absolute",
                //     top: 0,
                //     left: 0,
                //     width: "100%",
                //     height: "100%",
                //     display: "block",
                //     borderRadius: "6px",
                //     backfaceVisibility: "hidden",
                //     background: "linear-gradient(40deg, rgba(67, 138, 243, 0.7), rgba(255, 242, 166, 0.7))"
                // },
                "& $inner": {
                    color: "white",
                    fontSize: 8,
                    justifyItems: "center",
            		height: "100%",
            		padding: ".5em",
            		transform: "translateZ(80px) scale(0.94)"
                },
            
                // "&$h2": {
                //     gridRow: 2,
                //     marginBottom: "0.3em",
                //     textTransform: "uppercase",
                //     letterSpacing: "3px",
                //     color: "#fff",
                //     fontWeight: 500,
                //     textShadow: "0 0 6px rgba(0, 0, 0, 0.1)"
                // },
                // "&$rating": {
                //     // grid-row: 3;
                //     // color: rgba(255, 255, 255, 0.8);
                //     // font-size: 14px;
                //     // display: flex;
                //     // flex-flow: row nowrap;
                //     // i {
                //     //     margin: 0 1px;
                //     // }
                // }
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
                //overflowY: "hidden",
                position: "absolute",

                backgroundSize: "cover",
                backgroundPosition: "center center",
                // "&:after": {
                //     content: '',
                //     position: "absolute",
                //     top: 0,
                //     left: 0,
                //     width: "100%",
                //     height: "100%",
                //     display: "block",
                //     borderRadius: "6px",
                //     backfaceVisibility: "hidden",
                //     background: "linear-gradient(40deg, rgba(67, 138, 243, 0.7), rgba(255, 242, 166, 0.7))"
                // },
            	"& $inner": {
                    color: "white",
                    fontSize: 8,
                    justifyItems: "center",
            		height: "100%",
            		padding: ".5em",
            		transform: "translateZ(80px) scale(0.94)",
                    position: "relative"
                    // height: "100%",
            		// padding: "1.5em",
                    // transform: "translateZ(80px) scale(0.94)"
            	}
            },
            avatarFront: {
                width: "120px!important",
                height: "120px!important",
                marginLeft: "-1.5em",
                marginTop: "-.75em",
                // border: "2px solid black",
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
                marginTop: "12.50em",
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
                    fontSize: 90,
                    //lineHeight: "100px"
                }
            }
        })
);
export default useStyles;