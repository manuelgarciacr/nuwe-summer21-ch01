import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Glyphs from "infrastructure/assets/img/Glyphs.png";

const useStylesItem = (offset: [number, number], x: number, y: number) => makeStyles(({palette}: Theme) => {
    
    return createStyles({
        root: {
            display: "flex"
        },
        card: {
            width: 100,
            height: 100,
            padding: 0,
            margin: 0,
            // backgroundColor: palette.secondary.dark,
            backgroundImage: `url(${Glyphs})`,
            backgroundPositionX: -116 * offset[0],
            backgroundPositionY: -182 * offset[1],
            transform: "scale(40%) translateX(-55px)",
            flexShrink: 0,
            //color: palette.primary.main,
            backgroundColor: "transparent",
            filter: "brightness(2)"
        },
        cardEmpty: {
            width: 40,
            height: 40,
            padding: 0,
            margin: 0,
            backgroundColor: palette.secondary.dark,
        },
        tooltip: {
            backgroundColor: palette.primary.main
        },
        absoluteCard: {
            position: "absolute",
            transform: `translate(${x}px, ${y}px)`,
            width: "105px",
            backgroundColor: "transparent",
            color: "white"
        },
        content: {
            marginTop: "100%"
        },
        message: {
            padding: "0",
            width: 75,
            overflowWrap: "break-word"
        },
        hardSkill: {
            display: "flex",
            alignItems: "center",
            height: "25px",
            gap: 0,
            color: palette.primary.light,
                filter: "brightness(2)",
                //alignItems: "flex-start",
            // "& .hard": {
            //     color: palette.primary.light,
            //     filter: "brightness(2)",
            //     alignItems: "flex-start"
            // },
            // "& .soft": {
            //     color: palette.warning.light,
            //     alignItems: "none"
            // }
        },
        softSkill: {
            display: "flex",
            alignItems: "flex-start",
            height: "25px",
            gap: 0,
            color: palette.warning.light,
            // "& .hard": {
            //     color: palette.primary.light,
            //     filter: "brightness(2)",
            //     alignItems: "flex-start"
            // },
            // "& .soft": {
            //     color: palette.warning.light,
            //     alignItems: "none"
            // }
        }
    })
});
    
export default useStylesItem;