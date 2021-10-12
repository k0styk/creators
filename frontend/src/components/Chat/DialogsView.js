import React from 'react';
import s from './Chat.module.scss';
import { inject } from 'mobx-react';

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

@inject(({ ChatStore }) => {
  return {
    selectDialog: ChatStore.selectDialog,
    selectedDialog: ChatStore.selectedDialog,
  };
})
class DialogsView extends React.Component {
  render() {
    const { dialogs, selectDialog, selectedDialog } = this.props;

    return (
      <>
        {dialogs.length ? (
          <List className={s.dialogsList}>
            {dialogs.map((d, i) => (
              <React.Fragment key={d.chatId}>
                <ListItem
                  button
                  selected={selectedDialog === d.chatId}
                  onClick={() => selectDialog(d.chatId)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={d.caseName}
                    secondary={true ? d.userName : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton disabled edge="end">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <div className={s.emptyDialogs}>У вас пока нет чатов</div>
        )}
      </>
    );
  }
}

export default DialogsView;
