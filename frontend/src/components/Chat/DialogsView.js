import React from 'react';
import s from './Chat.module.scss';
import { inject } from 'mobx-react';

import PersonIcon from '@material-ui/icons/Person';
// import DeleteIcon from '@material-ui/icons/Delete';
import Loader from '../../shared/Loader';

import { chatEnum } from '../../enums';

import {
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  // ListItemSecondaryAction,
  // IconButton,
} from '@material-ui/core';

@inject(({ ChatStore }) => {
  return {
    selectDialog: ChatStore.selectDialog,
    selectedDialog: ChatStore.selectedDialog,
    loadDialogsStatus: ChatStore.loadDialogsStatus,
    dialogs: ChatStore.dialogs,
  };
})
class DialogsView extends React.Component {
  dialogHandler = (id) => {
    const { selectDialog, selectedDialog } = this.props;
    if (selectedDialog === id) return;
    selectDialog(id);
  };

  render() {
    const { dialogs, selectedDialog, loadDialogsStatus } = this.props;

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
                  onClick={() => this.dialogHandler(d.id)}
                >
                  <ListItemAvatar>
                    {d.userPhotoPath ? (
                      <Avatar variant="square" src={d.userPhotoPath} />
                    ) : (
                      <Avatar variant="square">
                        <PersonIcon />
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={d.caseName}
                    secondary={true ? d.userName : null}
                  />
                  {/* TODO: MAKE SOME SECOND ACTION OF DIALOGS */}
                  {/* <ListItemSecondaryAction>
                    <IconButton disabled edge="end">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction> */}
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
