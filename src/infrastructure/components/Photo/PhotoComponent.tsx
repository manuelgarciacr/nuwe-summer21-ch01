import ImageList from "@material-ui/core/ImageList";
// import ImageListItem from "@material-ui/core/ImageListItem";
import React from "react";
import useStyles from "./styles";

interface IProps {
    handleSave: Function
}

const Photo = (props: IProps) => {
    const classes = useStyles();
    const [isReady, setReady] = React.useState(false);
    
    React.useEffect(() => {
        const constructor = async () => {
            try {
                fetch("https://api.unsplash.com/search/photos?query=data&client_id=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {

                })
            } catch (e) {
                // ignore error
            } finally {
                setReady(true);
            }
        };
        if (!isReady)
            constructor();
    }, [isReady]);

    if (!isReady)
        return null;


    return (
        <ImageList rowHeight={160} className={classes.imageList} cols={3}>
            {/* {items.map((item) => (
                null
                // <ImageListItem key={item.img} cols={item.cols || 1}>
                //     <img src={item.img} alt={item.title} />
                // </ImageListItem>
            ))} */}
        </ImageList>
    )
}
export default Photo;
