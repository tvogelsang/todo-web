export interface TodoItems {
  items: TodoItem[];
}

export interface TodoItem {
  completed?: boolean;
  id?: string;
  title: string;
}
