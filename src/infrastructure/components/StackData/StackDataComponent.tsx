import { useState } from 'react';
import useStyles from './styles';

import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

interface IProps {
    stack: string[],
    handleSave: Function
}

const StackData = (props: IProps) => {
    const theme = useTheme();
    const { stack, handleSave } = props;
    const classes = useStyles(theme);
    const [values, setValues] = useState<string[]>(stack);
    const [items, setItems] = useState<string[]>(() => {
        const res: string[] = [];
        stacks.forEach(v => {
            const idx = values.indexOf(v);
            if (idx < 0)
                res.push(v);
        });
        return res;
    });

    const handleDelete = (value: string) => {
        const idx = values.indexOf(value);
        const v = [...values];
        const i = [...items];
        const del = v.splice(idx, 1);
        i.push(del[0]);
        setValues(v);
        setItems(i);
    }

    const handleAdd = (value: string | null) => {
        if (value === null)
            return;
        const idx = items.indexOf(value);
        const v = [...values];
        const i = [...items];
        const del = i.splice(idx, 1);
        v.push(del[0]);
        setValues(v);
        setItems(i);
    }

    return (
        <Paper className={classes.container}>
            <form className={classes.form}>
                <Autocomplete
                    options={items}
                    getOptionLabel={(option: string) => option}
                    onChange={(ev: any, value: string | null) => handleAdd(value)}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="debug" margin="normal" variant="outlined"/>}
                />
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "space-between" }}>
                    {values.map(v => <Chip label={v} onDelete={() => handleDelete(v)} color="primary" />
                    )}
                </div>
                <Button onClick={() => handleSave(values)} style={{ color: theme.palette.primary.contrastText }} className={classes.button}>GUARDAR</Button>
            </form >
        </Paper>
    )
}

export default StackData;

const stacks: string[] = [
    "C#",
    "Golang",
    "GraphQL",
    "Java",
    "Node.js",
    "PHP",
    "Python",
    "Rust",
    "Spring",
    //
    "Ajax",
    "Angular",
    "CSS3",
    "HTML5",
    "Javascript",
    "React",
    "Typescript",
    "VUE",
    //
    "Amazon Web",
    "Azure",
    "Docker",
    "Firebase",
    "Google Cloud",
    "Jenkins",
    "Kubernetes",
    //
    "BoltDB",
    "CassandraDB",
    "CouchDB",
    "MariaDB",
    "Memcache",
    "MongoDB",
    "MS SQL Server",
    "MySQL",
    "PostgreSQL",
    "Redis",
    //
    "Clair",
    "Night Watch",
    "Postman",
    "SonarQube",
    "Visual Studio",
    //
    "Android",
    "Flutter",
    "Jetpack",
    "Kotlin",
    "Objective C",
    "React Native",
    "RXJava",
    "Swift",
    "Xamarin",
    //
    "GitHub",
    "FSO",
    "BitBucket",
    //
    "Figma",
    "Zeplin",
    "Sketch",
    "Maze",
    "Protopie"
]
