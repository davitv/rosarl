import * as React from 'react';
import { findDOMNode } from 'react-dom';


export interface DropdownProps {
    children: (
        bindDropdownTogglerRef: (ref: React.ReactNode) => React.ReactNode,
        bindContentTogglerRef: (ref: React.ReactNode) => React.ReactNode,
        isOpen: boolean
    ) => React.ReactNode;
    isContentToggling?: boolean;
}

export interface DropdownState {
    isOpen: boolean;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
    private togglerRef: HTMLElement;
    private contentRef: HTMLElement;
    static defaultProps = {
        isContentToggling: false
    }

    constructor(props: DropdownProps) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.bindTogglerRef = this.bindTogglerRef.bind(this);
        this.bindContentRef = this.bindContentRef.bind(this);

        this.handleTogglerClick = this.handleTogglerClick.bind(this);
        this.documentClickListener = this.documentClickListener.bind(this);

        document.addEventListener('click', this.documentClickListener, false);
    }

    public componentWillUnmount() {
        document.removeEventListener('click', this.documentClickListener, false);
    }

    public componentDidMount() {
        if (!!this.togglerRef){
            this.togglerRef.addEventListener('click', this.handleTogglerClick)
        }
    }

    public render() {
        const {
            children,
        } = this.props;
        return children(
            this.bindTogglerRef,
            this.bindContentRef,
            this.state.isOpen
        );
    }

    private allParents(e: HTMLElement, searchParent: Element | null | string) {
        let parent = e.parentElement;
        while(parent) {
            if (parent === searchParent) {
                return true;
            }
            parent = parent.parentElement;
        }
        return false;
    }
    private documentClickListener(e: Event & {target: HTMLElement}) {
        const node = findDOMNode(this.togglerRef);
        // TODO: find more elegant way to achieve this.
        // Currently only 3 level nesting of toggler supported, and i have no mood and time
        // for searching for a workaround...
        if (
            node !== e.target &&
            !this.allParents(e.target, node)
        ) {

            if (this.state.isOpen) {
                if (this.props.isContentToggling) {
                    console.error('j')
                    this.setState({isOpen: false});
                } else if (node !== findDOMNode(this.contentRef) && !this.allParents(e.target, findDOMNode(this.contentRef))) {
                    this.setState({isOpen: false});
                }
            }
        }
    }

    private bindTogglerRef(ref: HTMLElement): React.ReactNode {
        this.togglerRef = ref;
        return ref;
    }

    private bindContentRef(ref: HTMLElement): React.ReactNode {
        this.contentRef = ref;
        return ref;
    }
    private toggleDropdown() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    private handleTogglerClick(e: Event & {target: {parentElement: null | HTMLElement}}) {
        this.toggleDropdown();
    }
}

export default Dropdown;