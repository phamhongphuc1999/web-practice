import { makeAutoObservable } from 'mobx';
import { AppFetchStatus } from 'src/global';
import { delay } from 'src/services';

export type TodoItemType = {
  id: string;
  createAt: string;
  updateAt: string;
  title: string;
  quantity: number;
};

export type TodoListType = { [id: string]: TodoItemType };

const defaultData: TodoListType = {
  1: {
    id: '1',
    createAt: new Date().toString(),
    updateAt: new Date().toString(),
    title: 'item1',
    quantity: 1,
  },
  2: {
    id: '2',
    createAt: new Date().toString(),
    updateAt: new Date().toString(),
    title: 'item2',
    quantity: 10,
  },
};

class Todo {
  todos: TodoListType;
  status: AppFetchStatus;

  constructor(todos: TodoListType) {
    makeAutoObservable(this);
    this.todos = todos;
    this.status = 'initial';
  }

  async loadTodo() {
    this.status = 'pending';
    await delay(5000);
    this.todos = defaultData;
    this.status = 'success';
  }
}

export const todoStore = new Todo({});

export interface MobxTodoStoreType {
  todo: Todo;
}
