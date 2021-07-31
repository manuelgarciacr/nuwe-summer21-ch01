import useStyles from "./styles";
import useStylesItem from "./stylesItem";
import HardSkill from "domain/model/HardSkill";
import SoftSkill from "domain/model/SoftSkill";
import ReactApexChart from "react-apexcharts";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";

const GreenTooltip = withStyles({
    tooltip: {
        backgroundColor: "darkgreen",
        fontSize: 18
    },
    arrow: {
        color: "darkgreen",
    }
})(Tooltip);

interface IItemProps {
    nameHard: string,
    nameSoft: string,
    pointsHard: number,
    pointsSoft: number,
    x: number,
    y: number
}
const StackItem = (props: IItemProps) => {
    const {nameHard, nameSoft, pointsHard, pointsSoft, x, y} = props;
    const offset = getOffset(nameHard);
    const classes = useStylesItem(offset, x, y)();
    return (
        <Paper elevation={0} className={classes.absoluteCard}>
            {nameHard !== "" && <div className={classes.hardSkill}>
                <Typography className={`${classes.message} hard `}>{new Intl.NumberFormat(undefined, {useGrouping: true}).format(pointsHard)}</Typography>
                <GreenTooltip title={nameHard} arrow>
                    <Card className={`${offset[0] !== 1000 ? classes.card : classes.cardEmpty}`} />
                </GreenTooltip>
           </div>}
            {nameSoft !== "" && <div className={classes.softSkill}>
                <Typography className={`${classes.message} soft `}>{new Intl.NumberFormat().format(pointsSoft)}</Typography>
                <Typography className={`${classes.message} soft `}>{nameSoft}</Typography>
            </div>}
        </Paper>
    )
}

interface IProps {
    hard: HardSkill[],
    soft: SoftSkill[]
}

const NftSkills = (props: IProps) => {
    const classes = useStyles();
    const { hard, soft } = props;
    const calcPentagon = (n: number, r: number) => {
        const penta: [x: number, y: number][] = [];
        for (let i = 0; i < n; i++) {
            const x = r * Math.sin(2 * Math.PI * i / n);
            const y = r * Math.cos(2 * Math.PI * i / n);
            penta.push([x, y]);
        }
        return penta;
    }   

    const newArr: {h?: HardSkill, s?: SoftSkill}[] = [];
    const dataH: number[] = [];
    const dataS: number[] = [];
    hard.forEach((v, i) => { 
        newArr.push({h: v});
        dataH.push(v.points);
        dataS.push(0);
    });
    soft.forEach((v, i) => {
        if (newArr[i]) {
            newArr[i] = {h: newArr[i].h, s: v};
            dataS[i] = v.points;
        } else {
            newArr.push({s: v});
            dataH.push(0);
            dataS.push(v.points);
        }
    });
    const lengthMax =newArr.length;
    const offsetX = 150; 
    const radio = 160;
    const penta = calcPentagon(lengthMax, radio/1.35);
    const type: 'radar' = 'radar';
    const data = {
        series: [{
            name: 'Hard',
            data: dataH,
        }, {
            name: 'Soft',
            data: dataS,
        }],
          
        options: {
            legend: {
                show: true,
                position: "bottom" as "bottom",
                labels: {
                    colors: ['#FFFFFF']
                }
            },
            yaxis: {
                show: false
            },
            tooltip: {
                enabled: false
            },
            chart: {
                toolbar:{
                    show: false
                },
                height: 200,
                width: 250,
                type: type,
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                }
            },
            colors: ['#66DA26', '#FF9800', '#2E93fA', '#546E7A', '#E91E63'],
            title: {
                text: ''
            },
            stroke: {
                width: 3
            },
            fill: {
                opacity: 0.1
            },
            
            markers: {
                size: 0,
                strokeWidth: 0,
                colors: ['#FFFFFF']
            },
            xaxis: {
                categories: ["", "", "", "", ""] // ['2011', '2012', '2013', '2014', '2015', '2016']
            }
        }
    };
console.log("DADA", hard, soft, dataH, dataS)
    return (
        <>
            <Divider style={{backgroundColor: "white", opacity: .5, marginTop: 8}}/>
            <Paper className={classes.skills} style={{ width: 200, backgroundColor: "transparent" }} variant="outlined" >
                <ReactApexChart style={{
                        width: radio ,
                        // transform: `translate(
                        //     ${offsetX - (radio / 2)}px, 
                        //     ${offsetY + radio - 90}px
                        // )`
                        transform: `translate(
                            ${offsetX - (radio / 2) - 5}px, 
                            -10px
                        )`,
                        position: "absolute",
                        color: "white"

                    }} options={data.options} series={data.series} type="radar" height={310} />
                {/* <img className={classes.pentagon}
                    src={Pentagon}
                    alt="Pentágono"
                    style={{
                        width: radio,
                        transform: `translate(
                            ${offsetX - (radio / 2) + 50}px, 
                            ${offsetY + radio - 90}px
                        )`
                    }}>
                </img> */}
                {newArr.map((value, i) => {
                    if (i > 4)
                        return null;
                    let y: number;
                    if (penta[i][1] >= 0)
                        y = radio - penta[i][1];
                    else {
                        y = penta[i][1] * -1 + radio;
                    }
                    if (i === 0)
                        y -= 0;
                    else if (i === 1 || i === 4)
                        y -= 10;
                    else
                        y -= 20;
                    return (StackItem({
                        nameHard: value.h?.name || "",
                        nameSoft: value.s?.name || "",
                        pointsHard: value.h?.points || 0,
                        pointsSoft: value.s?.points || 0,
                        x: 95 + penta[i][0],
                        y: -50 + y
                    }))
                })}
            </Paper>
        </>
    )
}

export default NftSkills;

const getOffset = (name: string) => {
    const stacks: { [k: string]: [number, number] } = {
        "C#": [0, 0],
        "Golang": [1, 0],
        "GraphQL": [2, 0],
        "Java": [3, 0],
        "Node.js": [4, 0],
        "PHP": [5, 0],
        "Python": [6, 0],
        "Rust": [7, 0],
        "Spring": [8, 0],
        //
        "Ajax": [0, 1],
        "Angular": [1, 1],
        "CSS3": [2, 1],
        "HTML5": [3, 1],
        "Javascript": [4, 1],
        "React": [5, 1],
        "Typescript": [6, 1],
        "VUE": [7, 1],
        //
        "Amazon Web": [0, 2],
        "Azure": [1, 2],
        "Docker": [2, 2],
        "Firebase": [3, 2],
        "Google Cloud": [4, 2],
        "Jenkins": [5, 2],
        "Kubernetes": [6, 2],
        //
        "BoltDB": [0, 3],
        "CassandraDB": [1, 3],
        "CouchDB": [2, 3],
        "MariaDB": [3, 3],
        "Memcache": [4, 3],
        "MongoDB": [5, 3],
        "MS SQL Server": [6, 3],
        "MySQL": [7, 3],
        "PostgreSQL": [8, 3],
        "Redis": [9, 3],
        //
        "Clair": [0, 4],
        "Night Watch": [1, 4],
        "Postman": [2, 4],
        "SonarQube": [3, 4],
        "Visual Studio": [4, 4],
        //
        "Android": [0, 5],
        "Flutter": [1, 5],
        "Jetpack": [2, 5],
        "Kotlin": [3, 5],
        "Objective C": [4, 5],
        "React Native": [5, 5],
        "RXJava": [6, 5],
        "Swift": [7, 5],
        "Xamarin": [8, 5],
        //
        "GitHub": [0, 6],
        "FSO": [1, 6],
        "BitBucket": [2, 6],
        //
        "Figma": [0, 7],
        "Zeplin": [1, 7],
        "Sketch": [2, 7],
        "Maze": [3, 7],
        "Protopie": [4, 7]
    };
    return stacks[name] || [1000, 1000];
}