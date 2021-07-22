import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Glyphs from "infrastructure/assets/img/Glyphs.png";

const useStyles = (offset: [number, number], x?: number, y?: number) => makeStyles(({palette}: Theme) => {
    if (x === undefined)
        x = 0;
    if (y === undefined)
        y = 0;
    return createStyles({
        root: {
            display: "flex"
        },
        card: {
            width: 100,
            height: 100,
            padding: 0,
            margin: 0,
            backgroundColor: palette.secondary.dark,
            backgroundImage: `url(${Glyphs})`,
            backgroundPositionX: -116 * offset[0],
            backgroundPositionY: -182 * offset[1]
        },
        cardEmpty: {
            width: 100,
            height: 100,
            padding: 0,
            margin: 0,
            backgroundColor: palette.secondary.dark,
        },
        tooltip: {
            backgroundColor: palette.primary.main
        },
        absoluteCard: {
            position: "absolute",
            transform: `translate(${x}px, ${y}px)` 
        },
        content: {
            marginTop: "100%"
        },
        message: {
            padding: "0 5px"
        }
    })
});
// const useStyles = (offset: [number, number]) => makeStyles(({palette}: Theme) => {
//     console.log("PPPP", palette.secondary)
//         return createStyles({
//             root: {
//                 display: "flex",
//             },
//             card: {
//                 width: 100,
//                 height: 100,
//                 padding: 0,
//                 margin: 0,
//                 backgroundColor: palette.secondary.dark,
//                 backgroundImage: `url(${Glyphs})`,
//                 backgroundPositionX: -115 * offset[0],
//                 backgroundPositionY: -115 * offset[1] 
//             }
//         })
//     });
    
export default useStyles;