import { State, bind } from "./state";
import * as R from "ramda";

export type Queue = number[];

export const enqueue = (x: number): State<Queue,undefined> => {
    return (Q: Queue) => [R.concat(Q, [x]) , undefined]; //add number to the end of the array
};

export const dequeue = (Q: Queue): [Queue, number] => {
    return [R.tail(Q), Q[0]];
};

export const queueManip = (Q: Queue): [Queue, number] => {
   return bind(dequeue, (x: number) => bind(enqueue(x*2), () => bind(enqueue(x/3) , () => dequeue)))(Q)

}