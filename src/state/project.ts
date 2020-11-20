namespace App {
  // Project State Management (Singleton class)
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFunc: Listener<T>) {
      this.listeners.push(listenerFunc);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, numberOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numberOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListenrs();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find(project => project.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListenrs();
      }
    }

    private updateListenrs() {
      for (const listenerFunc of this.listeners) {
        listenerFunc(this.projects.slice()); // Copy the array
      }
    }
  }

  export const projectState = ProjectState.getInstance();
}
