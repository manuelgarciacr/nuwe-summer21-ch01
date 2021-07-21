import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import { useTheme } from "@material-ui/core/styles";
import useStyles from "./styles";

const StackItem = (props: { name: string, x?: number, y?: number }) => {
    const offset = getOffset(props.name);
    const classes = useStyles(offset, props.x, props.y)();
    const absolute = props.x || props.y || false;
    //const theme = useTheme();
    return (
        <Paper className={`${absolute ? classes.absoluteCard : ''}`}>
            {/* <Card className={`${classes.card} ${absolute ? classes.absoluteCard : ''}`}>
            </Card> */}
            <Card className={classes.card}>
            </Card>            
            {absolute && <>
                <Typography className={classes.message}>1200 pts</Typography>
                <Typography className={classes.message}>Top 10%</Typography>
            </>}
        </Paper>
    )
}

const getOffset = (name: string) => {
    const stacks: { [k: string]: [number, number] } = {
        "C#": [0, 0],
        "GOLANG": [1, 0],
        "GRAPHQL": [2, 0],
        "JAVA": [3, 0],
        "NODE JS": [4, 0],
        "PHP": [5, 0],
        "PYTHON": [6, 0],
        "RUST": [7, 0],
        "SPRING": [8, 0],
        //
        "AJAX": [0, 1],
        "ANGULAR": [1, 1],
        "CSS 3": [2, 1],
        "HTML 5": [3, 1],
        "JAVA SCRIPT": [4, 1],
        "REACT": [5, 1],
        "TYPE SCRIPT": [6, 1],
        "VUE": [7, 1],
        //
        "AMAZON WEB": [0, 2],
        "AZURE": [1, 2],
        "DOCKER": [2, 2],
        "FIREBASE": [3, 2],
        "GOOGLE CLOUD": [4, 2],
        "JENKINS": [5, 2],
        "KUBERNETES": [6, 2],
        //
        "BOLTDB": [0, 3],
        "CASSANDRADB": [1, 3],
        "COUCHDB": [2, 3],
        "MARIADB": [3, 3],
        "MEMCACHE": [4, 3],
        "MONGODB": [5, 3],
        "MS SQL SERVER": [6, 3],
        "MYSQL": [7, 3],
        "POSTGRESQL": [8, 3],
        "REDIS": [9, 3],
        //
        "CLAIR": [0, 4],
        "NIGHT WATCH": [1, 4],
        "POSTMAN": [2, 4],
        "SONAR QUBE": [3, 4],
        "VISUAL STUDIO": [4, 4],
        //
        "ANDROID": [0, 5],
        "FLUTTER": [1, 5],
        "JETPACK": [2, 5],
        "KOTLIN": [3, 5],
        "OBJECTIVE C": [4, 5],
        "REACT NATIVE": [5, 5],
        "RXJAVA": [6, 5],
        "SWIFT": [7, 5],
        "XAMARIN": [8, 5],
        //
        "GITHUB": [0, 6],
        "FSO": [1, 6],
        "BITBUCKET": [2, 6],
        //
        "FIGMA": [0, 7],
        "ZEPLIN": [1, 7],
        "SKETCH": [2, 7],
        "MAZE": [3, 7],
        "PROTOPIE": [4, 7]
    };
    return stacks[name];
}
export default StackItem;