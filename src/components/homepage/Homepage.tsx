import * as React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar';

import { IMAGES_PATH_URL } from '../../products/constants';
const styles = require('./Homepage.css');

export interface Props {
    manufacturers: {
        imageUrl: string;
        link: React.ReactText;

        categories: {
            imageUrl: string;
            link: React.ReactText;
        }[];
    }[];
}

export default class Homepage extends React.Component<Props> {
    public render() {
        return (
            <div className={styles.className}>
                <Sidebar />

                <div className={styles.mapWrapper}>
                    {this.props.manufacturers.map(((man, i) =>
                        <div key={i} className={styles.manufacturerRow}>
                            <Link to={man.link as string} className={styles.manufacturer}>
                                <img src={IMAGES_PATH_URL + man.imageUrl} />
                            </Link>

                            <div className={styles.categories}>
                                {man.categories.map(((cat, index) =>
                                    <Link key={index} className={styles.category} to={cat.link as string}>
                                        <img src={IMAGES_PATH_URL + cat.imageUrl} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}