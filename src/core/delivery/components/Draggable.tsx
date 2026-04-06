export function Draggable<Task, Column>({children, task, column}: {children: React.ReactNode, task:Task, column:Column}) {
    const handleDragStart = (event:any) => {
        event.dataTransfer.setData('text', JSON.stringify({task, originColumn: column}))
        console.log('dragstart')
    }
    return (
        <div
            draggable
            onDragStart={handleDragStart}
        >{children}</div>)
}