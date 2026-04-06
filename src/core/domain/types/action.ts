export enum ActionType {
    MOVE= 'move'
}

export type Action<C extends string, Task> = {
    type: ActionType
    task: Task
    originState: C
    targetState: C
  }