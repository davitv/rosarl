import * as React from 'react';
import cn from 'classnames';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const styles = require('./Categories.css');

export interface Category {
    id: number;
    name: string;
    parent: number;
    children: Category[];
}

export interface Props {
    categories: Category[];
}

const mapNestingLevelToStyle = (level: number) => {
    switch (level) {
        case 1:
            return styles.categoryFirst;
        case 2:
            return styles.categorySecond;
        case 3:
            return styles.categoryThird;
        case 4:
            return styles.categoryFourth;
        default:
            return '';
    }
}

const CategoryItem = ({children, name, level}: {id: number, name: string, children: Category[], level: number}) => {
    const hasChildren = children.length > 0;
    const style = mapNestingLevelToStyle(level);

    return (
        <div
            className={cn(
                styles.category,
                style
            )}
        >
            <a
                href="#"
                className={styles.link}
            >
                {hasChildren && <Icon icon="caret-down" fixedWidth />}
                {name}
            </a>
            {hasChildren && children.map((child) => <CategoryItem key={child.id} {...child} level={level + 1} />)}
        </div>
    );
}

export default class Categories extends React.Component<Props> {
    public render() {
        return (
            <div className={styles.className}>
                {this.props.categories.map(category =>
                    <CategoryItem key={category.id} {...category} level={1} />
                )}
            </div>
        );
    }
}
