import React, { useState } from 'react';
import { List, ListItem, makeStyles, Theme, Collapse, ListItemText, ListItemIcon } from "@material-ui/core";
import { Folder, FolderOpen, ExpandLess, ExpandMore, Image } from '@material-ui/icons';
import { DirectoryTree } from "directory-tree";
import { useApp } from '../hooks';

const useStyles = makeStyles<{ index: number }>((theme: Theme) => ({
    container: {
      border: '2px solid #eee',
      borderRadius: '2px',
      marginTop: theme.spacing(2),
    },
    nestedDirectory: {
      paddingLeft: ({ index }) => theme.spacing(3 * index),
    },
    nestedFile: {
      paddingLeft: ({ index }) => theme.spacing(3 * (index + 1)),
    },
}));

const Directory: React.FC<{ directory: DirectoryTree, index: number }> = ({ directory, index }) => {
    const classes = useStyles({ index });
    const [open, setOpen] = useState(false);
    const { image } = useApp();

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <ListItem button onClick={handleClick} className={classes.nestedDirectory}>
                <ListItemIcon>
                    { open ? <FolderOpen /> : <Folder /> }
                </ListItemIcon>
                <ListItemText primary={directory.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                    {
                        directory.children?.map((child) => {
                            if (child.type === 'directory') {
                                return <Directory directory={child} index={index + 1} />
                            }
        
                            return (
                                <ListItem button onClick={() => image.setUrl(child.path.replace('public', ''))} className={classes.nestedFile}>
                                    <ListItemIcon>
                                        <Image />
                                    </ListItemIcon>
                                    <ListItemText primary={child.name} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Collapse>
        </React.Fragment>
    );
}

export const FileBrowser: React.FC<{ screenshots: DirectoryTree }> = ({ screenshots }) => {
    const styles = useStyles();

    return (
        <List className={styles.container}>
            <Directory directory={screenshots} index={1} />
        </List>
    );
}