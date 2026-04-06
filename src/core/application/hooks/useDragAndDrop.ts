import { useReducer } from "react";
import { Action } from "../../domain/types/action";
import { State } from "../../domain/types/state";

export function createReducer<C extends string, T extends {id:number}>() {
    return (state: State<C,T>, action: Action<C,T>) => ({
        ...state,
        [action.originState]: state[action.originState].filter(act => act.id!== action.task.id),
        [action.targetState]: [...state[action.targetState], action.task]
    })
}

export function useDragAndDrop<C extends string,T extends {id:number}>(
    reducer: (state: State<C,T>, action:Action<C,T>) => State<C,T>,
    initialState: State<C,T>
    ) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return {state, dispatch}
}

