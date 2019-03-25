import * as React from 'react';
import { connect } from 'react-redux';
import * as types from '../../types';

import Homepage from './Homepage';

const mapStateToProps = (state: types.AppState) => ({
    manufacturers: state.manufacturers
});

export interface Props {
    manufacturers: types.ManufacturersState;
}

export class HomepageContainer extends React.Component<Props> {
    public render() {
        const manufacturers = this.props.manufacturers.map(man =>
            ({
                imageUrl: man.mf_image_url,
                link: man.mf_url || '',
                categories: man.categories.map((cat => ({
                    imageUrl: cat.mf_category_image_url,
                    link: '/category/' + cat.mf_category_id + '/',
                })))
            })
        );
        return (
            <Homepage
                manufacturers={manufacturers}
            />
        );
    }
}

export default connect(mapStateToProps)(HomepageContainer);