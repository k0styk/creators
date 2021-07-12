import React from 'react';
import ReadView from './ReadView';
import EditView from './EditView';
import {inject} from 'mobx-react';

@inject(({PersonalPageStore}) => {
    return {
        isEdit: PersonalPageStore.isEdit
    };
})
class PersonalPage extends React.Component {
    render() {
        const {isEdit} = this.props;

        if (isEdit) {
            return <EditView/>
        }

        return <ReadView/>
    }
}

export default PersonalPage;
