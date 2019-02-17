import * as React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
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
    selected: number;
    openCategories: number[];
    onClick: (categoryId: number) => void;
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

interface CategoryProps {
    id: number;
    name: string;
    children: Category[];
    selectedCategoryId: number;
    level: number;
    openCategories: number[];
    onClick: (categoryId: number) => void;
}

class CategoryItem extends React.Component<CategoryProps> {
    constructor(props: CategoryProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    public render() {
        const {
            children,
            name,
            level,
            id,
            selectedCategoryId,
            openCategories,
            onClick,
        } = this.props;
        const hasChildren = children.length > 0;
        const style = mapNestingLevelToStyle(level);
        const isOpen = openCategories.indexOf(id) !== -1;

        return (
            <div
                className={cn(
                    styles.category,
                    style,
                    {[styles.categoryOpen]: isOpen}
                )}
            >
                <Link
                    to={'/category/' + id + '/'}
                    className={cn(
                        styles.link,
                        {[styles.linkSelected]: id === selectedCategoryId}
                    )}
                    onClick={this.handleClick}
                >
                    {hasChildren && <Icon icon={isOpen ? 'caret-up' : 'caret-down'} fixedWidth />}
                    {name}
                </Link>
                {hasChildren && children.map((child) =>
                    <CategoryItem
                        key={child.id}
                        level={level + 1}
                        openCategories={openCategories}
                        selectedCategoryId={selectedCategoryId}

                        onClick={onClick}
                        {...child}
                    />

                )}
            </div>
        );
    }

    private handleClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        this.props.onClick(this.props.id);
    }
}

export default class Categories extends React.Component<Props> {
    public render() {
        const {
            selected,
            openCategories,
            onClick
        } = this.props;

        return (
            <div className={styles.className}>
                {this.props.categories.map(category =>
                    <CategoryItem
                        key={category.id}
                        level={1}
                        openCategories={openCategories}
                        selectedCategoryId={selected}

                        onClick={onClick}
                        {...category}
                    />
                )}
            </div>
        );
    }
}
