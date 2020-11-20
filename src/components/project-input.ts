import { Component } from './base-component';
import { validate } from '../utility/validation';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project';

// ProjectInput class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    // when we initiate an instace, it will be executed.
    super('project-input', 'app', true, 'user-input');

    this.titleInput = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
    //this.element.addEventListener('submit', this.submitHandler.bind(this)); //Alternative to decorator
  }

  renderContent() {}

  private getUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInput.value;
    const enteredDescription = this.descriptionInput.value;
    const enteredPeople = this.peopleInput.value;

    const titleValidatable = {
      value: enteredTitle,
      required: true,
    };

    const desValidatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(desValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid Input, please try again!');
      return; // when not return tuple, ts throws an error. So set returning nothing
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInput.value = '';
    this.descriptionInput.value = '';
    this.peopleInput.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();

    if (Array.isArray(userInput)) {
      // Check whether it is a tuple(tuple is an array)
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }
}
