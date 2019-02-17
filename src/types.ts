
import { IAuth } from './auth/types';
import { UIState } from './ui/types';
import { TasksState } from './tasks/types';
import { LabelsState } from './labels/types';
import { BoardsState } from './boards/types';
import { FilesState } from './files/types';

export interface AppState {
    auth: IAuth;
    ui: UIState;
    tasks: TasksState;
    labels: LabelsState;
    boards: BoardsState;
    files: FilesState;
}