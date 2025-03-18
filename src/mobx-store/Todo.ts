import { makeAutoObservable } from 'mobx';
import { AppFetchStatus } from 'src/global';
import { delay } from 'src/services';
import * as uuid from 'uuid';

export type CoreTodoItemType = {
  title: string;
  quantity: number;
};

export interface TodoItemType extends CoreTodoItemType {
  id: string;
  createAt: string;
  updateAt: string;
}

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
  addNewTodo(item: CoreTodoItemType) {
    const createAt = new Date().toString();
    const id = uuid.v4();
    this.todos = {
      ...this.todos,
      [id]: { id, createAt, updateAt: createAt, title: item.title, quantity: item.quantity },
    };
  }
  editTodo(item: TodoItemType) {
    const updateAt = new Date().toString();
    this.todos = { ...this.todos, [item.id]: { ...item, updateAt } };
  }
  deleteTodo(id: string) {
    delete this.todos[id];
    this.todos = { ...this.todos };
  }
}

export const todoStore = new Todo({});

export interface MobxTodoStoreType {
  todo: Todo;
}
