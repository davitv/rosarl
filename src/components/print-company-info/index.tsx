import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as types from '../../types';
import { RouteComponentProps } from 'react-router-dom';
import { loadCompanyInfo, UIAction } from '../../ui/actions';
import { CompanyInfo } from '../../ui/types';

import PrintCompanyInfo, { InfoType } from './PrintCompanyInfo';

export interface Props  extends RouteComponentProps<{infoType: InfoType}> {
    companyInfo: CompanyInfo;
    loadCompanyInfo: () => Promise<any>;
}

const mapStateToProps = (state: types.AppState) => ({
    companyInfo: state.ui.companyInfo,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, UIAction>) => ({
    loadCompanyInfo: () => dispatch(loadCompanyInfo()),
});

export class HeaderContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        props.loadCompanyInfo();
    }

    public render() {
        const {
            companyInfo: {
                about,
                payment,
                contacts,
            },
            match: {
                params: {
                    infoType
                }
            }
        } = this.props;
        console.log(this.props);

        return (
            !!about ?
                <PrintCompanyInfo
                    infoType={infoType}
                    paymentText={payment.text}
                    paymentImageURL={payment.image_url}
                    aboutText={about}
                    contacts={contacts}
                />
                :
                <div />
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);