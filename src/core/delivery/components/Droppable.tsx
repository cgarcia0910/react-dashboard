

export function Droppable<Task, Column>({children, onDrop, targetColumn}: {children: React.ReactNode, onDrop: (originColumn:Column, targetColumn:Column, task:Task)=> void, targetColumn:Column}) {
    function handleDrop(evt:any) {
        evt.preventDefault()
        const {task, originColumn} = JSON.parse(evt.dataTransfer.getData('text'))
        console.log({task, originColumn})
        onDrop(originColumn, targetColumn, task)
        console.log('drop',evt)
    }
    function handleDragOver(evt: any) {
        evt.preventDefault()
    }
    return(
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}