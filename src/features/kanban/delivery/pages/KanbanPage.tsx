import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import { Draggable } from "../../../../core/delivery/components/Draggable";
import { Droppable } from "../../../../core/delivery/components/Droppable";
import { useReducer } from "react";
import { Task } from "../../domain/model/task";
import { State } from "../../../../core/domain/types/state";
import { Action, ActionType } from "../../../../core/domain/types/action";
import { createReducer, useDragAndDrop } from "../../../../core/application/hooks/useDragAndDrop";
import { DashboardLayout } from "@toolpad/core";


const columns = ['todo', 'inProgres', 'review', 'done'] as const
export type Column = typeof columns[number]
type AppState = State<Column, Task>
type AppAction = Action<Column, Task>
export function KanbanPage() {
    const reducer = createReducer<Column, Task>()
    const { state, dispatch } = useDragAndDrop<Column, Task>(reducer, {
        todo: [{ id: 1, title: 'uno' }],
        inProgres: [{ id: 2, title: 'dos' }],
        review: [],
        done: [],
    })
    function handleDrop(originColumn: Column, targetColumn: Column, task: Task) {
        dispatch({ type: ActionType.MOVE, task: task, originState: originColumn, targetState: targetColumn })
    }
    return (
        <>
            <DashboardLayout>
                <Grid container spacing={2} sx={{ height: '100vh', padding: 2 }}>
                    {Object.keys(state).map((list, index) => (
                        <Grid
                            key={index}
                            component="div"
                            sx={{ height: '600px' }}
                        >
                            <Droppable
                                onDrop={handleDrop}
                                targetColumn={columns[index]}
                            >
                                <Box sx={{
                                    height: '600px',
                                    backgroundColor: '#f0f0f0',
                                    border: '2px dashed #ccc',
                                    padding: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2
                                }}>
                                    <Card sx={{ minWidth: 245, backgroundColor: '#f0f0f0' }}>
                                        <CardContent>
                                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                                {columns[index]}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    {state[list as keyof (AppState)].map((elem: Task) => (
                                        <Draggable
                                            task={elem}
                                            key={elem.id}
                                            column={columns[index]}
                                        >
                                            <Card sx={{ minWidth: 245 }}>
                                                <CardContent>
                                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                                        {elem.title}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Draggable>
                                    ))}
                                </Box>
                            </Droppable>
                        </Grid>
                    ))}
                </Grid>

            </DashboardLayout>
        </>
    )
}