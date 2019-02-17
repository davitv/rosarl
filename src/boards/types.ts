
export interface Board {
    id: number;
    isShared: boolean;
    slug: string;
    order: number;
    name: string;
}

export interface BoardList {
    id: number;
    order: number;
    name: string;
    board: number;
}
export interface BoardImage {
    id: number;
    board: number;
    image: number;
}

export interface BoardListStyle {
    id: number;
    list: number;
    css: string;
}

export interface BoardShared {
    id: number;
    board: number;
    slug: string;
    is_public: boolean;
    lists: BoardList[];

    boardFiles: {
        id: number;
        board: number;
        image: number;
    }[];
    userFiles: {
        id: number;
        mime: string;
        path: string;
    }[];
    tasks: {
        id: number;
        content: string;
        order: number;
        title: string;
    }[];

    cards: {
        id: number;
        order: number;
        list: number;
        task: number;
    }[];
}

export interface BoardsState {
    boards: Board[];
    boardLists: BoardList[];
    boardImages: BoardImage[];
    boardListStyles: BoardListStyle[];
    sharedBoards: BoardShared[];
}
