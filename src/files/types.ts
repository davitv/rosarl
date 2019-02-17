
export interface UserFile {
    id: number;
    path: string;
    mime: string;
}

export interface FilesState {
    files: UserFile[];
}