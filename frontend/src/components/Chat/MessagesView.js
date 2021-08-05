import React from 'react';
import s from './Chat.module.scss';

import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// @inject(({ChatStore}) => {
//     return {
//         price: ChatStore.price
//     };
// })
class MessagesView extends React.Component {
    render() {
        const { messages } = this.props;
        const Row = ({ data, index, style }) => (
            <div
                // className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                style={style}
            >
                {data[index].message}
            </div>
        );

        return (
            <>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            className="List"
                            height={height}
                            itemSize={35}
                            width={width}
                            itemCount={messages.length}
                            itemData={messages}
                        >
                            {Row}
                        </List>
                    )}
                </AutoSizer>
                {/* {messages.map((m, i) => (
                    <div key={m.messageId}>{m.message}</div>
                ))} */}
            </>
        );
    }
}

export default MessagesView;
