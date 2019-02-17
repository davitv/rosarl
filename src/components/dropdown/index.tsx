import * as React from 'react';
import { findDOMNode } from 'react-dom';


export interface DropdownProps {
    children: (
        bindDropdownTogglerRef: (ref: React.ReactNode) => React.ReactNode,
        bindContentTogglerRef: (ref: React.ReactNode) => React.ReactNode,
        isOpen: boolean
    ) => React.ReactNode;
}

export interface DropdownState {
    isOpen: boolean;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
    private togglerRef: HTMLElement;
    private contentRef: HTMLElement;

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


    private documentClickListener(e: Event & {target: {parentElement: null | HTMLElement}}) {
        const node = findDOMNode(this.togglerRef);
        // TODO: find more elegant way to achieve this.
        // Currently only 3 level nesting of toggler supported, and i have no mood and time
        // for searching for a workaround...
        if (
            node !== e.target &&
            node !== e.target.parentElement
        ) {
            if (e.target.parentElement !== null && e.target.parentElement.parentElement !== node && this.state.isOpen) {
                this.setState({isOpen: false});
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