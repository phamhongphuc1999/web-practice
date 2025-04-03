/* eslint-disable no-console */
import { action, autorun, computed, makeObservable, observable } from 'mobx';

class Person {
  firstName: string;
  lastName: string;
  nickName: string;

  constructor(firstName: string, lastName: string, nickName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickName = nickName;

    makeObservable(this, {
      firstName: observable,
      lastName: observable,
      nickName: observable,
      fullName: computed,
      setFirstName: action,
      setLastName: action,
      setNickName: action,
    });
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  setNickName(nickName: string) {
    this.nickName = nickName;
  }
}

const person = new Person('John', 'Doe', 'Dog');

autorun(() => {
  console.log('auto run when firstName changed', person.firstName);
});

autorun(() => {
  console.log('auto run when fullName change', person.fullName);
});

autorun(() => {
  console.log('auto run when nickName change', person.nickName);
});

autorun(() => {
  console.log('auto run when firstName or nickName change', person.fullName, ',', person.nickName);
});
console.log('-----------------------------------1');
person.setFirstName('ABC');
console.log('-----------------------------------2');
person.setLastName('DDDDD');
console.log('-----------------------------------3');
person.setNickName('AAAAAAAA');
