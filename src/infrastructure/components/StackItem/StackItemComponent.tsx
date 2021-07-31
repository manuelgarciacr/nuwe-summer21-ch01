import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

const GreenTooltip = withStyles({
    tooltip: {
        backgroundColor: "darkgreen",
        fontSize: 18
    },
    arrow: {
        color: "darkgreen",
    }
})(Tooltip);

const StackItem = (props: { name: string, points?: number, topPct?: number, x?: number, y?: number }) => {
    const {name, points, topPct, x, y} = props;
    const offset = getOffset(name);
    const classes = useStyles(offset, x, y)();
    const absolute = x || y || false;
    return (
        <Paper className={`${absolute ? classes.absoluteCard : ''}`}>
            <GreenTooltip title={name} arrow>
                <Card className={`${offset[0] !== 1000 ? classes.card : classes.cardEmpty}`} />
            </GreenTooltip>
            {points &&
                <Typography className={classes.message}>{new Intl.NumberFormat().format(points)} pts</Typography>
            }
            {topPct &&
                <Typography className={classes.message}>Top {new Intl.NumberFormat().format(topPct)}%</Typography>
            }
        </Paper>
    )
}

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
export default StackItem;