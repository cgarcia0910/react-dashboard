export type State<C extends string, Task> = {
    [K in C]: Task[];
}