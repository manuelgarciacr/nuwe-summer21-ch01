import useStyles from "./styles";
import Pentagon from '../../assets/img/pentagon3.svg';
import HardSkill from "domain/model/HardSkill";
import SoftSkill from "domain/model/SoftSkill";
import StackItem from "../StackItem/StackItemComponent";
import SoftSkillItem from "../SoftSkillItem/SoftSkillItemComponent";
import { useWindowDimensions } from "app/hooks";

import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

interface IProps {
    title: string,
    skills: HardSkill[] | SoftSkill[]
}

const Skills = (props: IProps) => {
    const theme = useTheme();
    const classes = useStyles();
    const { title, skills } = props;
    const {width } = useWindowDimensions();
    const notMobile = useMediaQuery(theme.breakpoints.up('sm'));
    const calcPentagon = (n: number, r: number) => {
        const penta: [x: number, y: number][] = [];
        for (let i = 0; i < n; i++) {
            const x = r * Math.sin(2 * Math.PI * i / n);
            const y = r * Math.cos(2 * Math.PI * i / n);
            penta.push([x, y]);
        }
        return penta;
    }   


    const offsetX = (width - (notMobile ? 290 : 0)) / 2 - 50;
    const radio = offsetX > 250 ? 250 : offsetX
    const penta = calcPentagon(5, radio);
    const offsetY = 70;
    const height = skills.length === 0
        ? 0
        : skills.length > 2 
        ? 3 * radio + 120 // 3, 4 or 5
        : 2 * radio + 120 // 1 or 2
   
    return (
        <>
            <Paper className={classes.skills} style={{ height: height }} variant="outlined" >
                <div style={{ textAlign: "center" }}>
                    <Typography variant="h6">{title}</Typography>
                </div>
                <img className={classes.pentagon}
                    src={Pentagon}
                    alt="Pentágono"
                    style={{
                        width: radio,
                        transform: `translate(
                            ${offsetX - (radio / 2) + 50}px, 
                            ${offsetY + radio - 90}px
                        )`
                    }}>
                </img>
                {skills.map((value, i) => {
                    if (i > 4)
                        return null;
                    let y: number;
                    if (penta[i][1] >= 0)
                        y = radio - penta[i][1];
                    else {
                        y = penta[i][1] * -1 + radio;
                    }
                    if (i === 0)
                        y -= 50;
                    else if (i === 1 || i === 4)
                        y -= 20;
                    if (value.type === "HardSkill")
                        return (
                            <StackItem key={i}
                                name={value.name}
                                points={value.points}
                                topPct={(value as HardSkill).topPct}
                                x={offsetX + penta[i][0]}
                                y={offsetY + y} 
                            />
                         );
                     else
                        return (
                            <SoftSkillItem key={i}
                                name={value.name}
                                idx={i}
                                points={value.points}
                                topPoints={(value as SoftSkill).topPoints}
                                x={offsetX + penta[i][0]}
                                y={offsetY + y} />
                        )
                })}
            </Paper>
            <Paper style={{ height: 180 }} className={classes.carousel}>
                <List className={"content"}>
                    {skills.map((value, i) => {
                        if (i < 5)
                            return null;
                        if (value.type === "HardSkill")
                            return (
                                <StackItem key={i}
                                    name={value.name}
                                    points={value.points}
                                    topPct={(value as HardSkill).topPct} />
                            );
                        else
                        return (
                            <SoftSkillItem key={i}
                                name={value.name}
                                idx={i}
                                points={value.points}
                                topPoints={(value as SoftSkill).topPoints} 
                            />
                        )
                    })}
                </List>
            </Paper>
        </>
    )
}

export default Skills;
