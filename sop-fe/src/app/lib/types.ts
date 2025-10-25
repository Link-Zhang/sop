export interface Todo {
  id: string;
  content: string;
  status: boolean;
  date: string;
}

export interface TodoErrorProps {
  error?: Error;
}
