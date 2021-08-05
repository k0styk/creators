import React from 'react';
import s from './Chat.module.scss';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import {
    Divider,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    IconButton,
} from '@material-ui/core';

// @inject(({ChatStore}) => {
//     return {
//         price: ChatStore.price
//     };
// })
class DialogsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: -1,
        };
    }

    handleListItemClick(event, selectedIndex) {
        this.setState({
            selectedIndex,
        });
    }

    render() {
        const { selectedIndex } = this.state;
        const { dialogs } = this.props;

        return (
            <List className={s.dialogsList}>
                {dialogs.map((d, i) => {
                    return (
                        <React.Fragment key={d.chatId}>
                            <ListItem
                                button
                                selected={selectedIndex === i}
                                onClick={(event) =>
                                    this.handleListItemClick(event, i)
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={d.userName}
                                    secondary={true ? d.caseName : null}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton disabled edge="end">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    );
                })}
            </List>
        );
    }
}

export default DialogsView;
