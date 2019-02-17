
export interface Task {
    id: number;
    title: string;
    content: string;
    order: number;
}

export interface TaskBoardList {
    id: number;
    task: number;
    list: number;
    order: number;
}

export interface TaskLabel {
    id: number;
    task: number;
    label: number;
}

export interface TaskInterval {
    id: number;
    start: number;
    stop: number;
    task: number;
}

export interface TasksState {
    tasks: Task[];
    taskLabels: TaskLabel[];
    taskIntervals: TaskInterval[];
    taskBoardLists: TaskBoardList[];
}