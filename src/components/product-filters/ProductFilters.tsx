import * as React from 'react';
import cn from 'classnames';

import { FilteringAttribute } from '../../products/types';

const styles = require('./ProductFilters.css');

export interface Props {
    attributes: FilteringAttribute[];
    isOpen: boolean;
    selectedFilters: number[];

    onButtonClick: () => void;
    onAttributeClick: (attributeId: number) => void;
}

export default class ProductFilters extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleAttributeButtonClick = this.handleAttributeButtonClick.bind(this);
    }
    public render() {
        const {
            selectedFilters
        } = this.props;
        return (
            <div className={styles.className}>
                <div
                    className={cn(
                        styles.attributesWrapper,
                        {[styles.attributesWrapperOpen]: this.props.isOpen}
                    )}
                >

                    {this.props.attributes.map((attr, index) =>
                        <div
                            key={index}
                            className={styles.row}
                        >
                            <span className={styles.name}>{attr.name}</span>
                            {attr.choices.map(choice =>
                                <button
                                    key={choice.value}
                                    className={cn(
                                        styles.btnAttr,
                                        {[styles.btnAttrSelected]: (selectedFilters.indexOf(choice.value) !== -1)}
                                    )}
                                    value={choice.value}
                                    onClick={this.handleAttributeButtonClick}
                                >
                                    {choice.name}
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {this.props.attributes.length > 0 &&
                    <button
                        className={styles.btnToggle}
                        onClick={this.handleButtonClick}
                    >
                        {this.props.isOpen ? 'Свернуть ' : 'Развернуть '} фильтры
                    </button>
                }
            </div>
        );
    }

    private handleButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        this.props.onButtonClick();
    }
    private handleAttributeButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        this.props.onAttributeClick(
            parseInt(e.currentTarget.value, 10)
        );
    }
}