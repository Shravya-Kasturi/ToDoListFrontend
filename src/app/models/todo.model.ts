export interface Task {
    id?: string;
    name: string;
    description: string;
    dueDate: string;
    status: string;
}

export interface Category {
    id?: string;
    name: string;
    description: string;
}
export interface Todo {
    id?: string,
    name: string,
    description: string,
    tasks: Task[];
    dueDate: string;
    status: string;
    completionDate: string;
    category: Category |  string;
}

export enum TASK_STATUS {
    PENDING = "PENDING",
    OVERDUE = 'OVERDUE',
    COMPLETED = 'COMPLETED',
    ARCHIVED = 'ARCHIVED'
}