import React from 'react';
import s from './Chat.module.scss';
import { inject } from 'mobx-react';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from '../../shared/Loader';

import { chatEnum } from '../../enums';

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
    loadDialogsStatus: ChatStore.loadDialogsStatus,
  };
})
class DialogsView extends React.Component {
  render() {
    const { dialogs, selectDialog, selectedDialog, loadDialogsStatus } =
      this.props;

    return (
      <>
        {loadDialogsStatus === chatEnum.IS_CHECKING ? (
          <Loader />
        ) : dialogs.length ? (
          <List className={s.dialogsList}>
            {dialogs.map((d, i) => (
              <React.Fragment key={d.id}>
                <ListItem
                  button
                  selected={selectedDialog === d.id}
                  onClick={() => selectDialog(d.id)}
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
