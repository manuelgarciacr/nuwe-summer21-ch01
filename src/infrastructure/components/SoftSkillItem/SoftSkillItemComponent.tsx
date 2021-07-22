import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

const SoftSkillItem = (props: { name: string, idx: number, points: number, topPoints: number, x?: number, y?: number }) => {
    const {name, idx, points, topPoints, x, y} = props;
    const classes = useStyles(idx, x, y)();
    return (
        <Paper className={classes.content}>
            <Typography variant="h6">{new Intl.NumberFormat().format(points)}/{new Intl.NumberFormat().format(topPoints)}</Typography>
            <Typography variant="subtitle1" className={classes.text}>{name}</Typography>
        </Paper>
    )
}

export default SoftSkillItem;