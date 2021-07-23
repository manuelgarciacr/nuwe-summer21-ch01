import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = (idx: number, x?: number, y?: number) => makeStyles(({palette}: Theme) => {
    if (x === undefined)
        x = 0;
    if (y === undefined)
        y = 0;
    let w = 100;
    if (idx === 0 || idx === 2 || idx === 3) {
        w +=30;
        x -=15;
    }
    return createStyles({
        root: {
            display: "flex"
        },
        content: {
            width: w,
            height: 140,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        },
        absoluteContent: {
            position: "absolute",
            transform: `translate(${x}px, ${y}px)`
        },
        text: {
            width: w,
            wordWrap: "break-word"
        }
    })
});
    
export default useStyles;