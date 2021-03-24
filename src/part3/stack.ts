import { State, bind } from "./state";
import * as R from "ramda";

export type Stack = number[];

export const push = (x: number): State<Stack, undefined> =>
{
    return (s: Stack) => [R.concat([x], s), undefined];
};

export const pop = (s: Stack): [Stack, number] => 
{
    return [R.tail(s), s[0]];
};

export const stackManip = (s: Stack): [Stack, undefined] =>
{
    return bind(pop, (x:number) => bind(push(x * x), () => bind(pop, (y: number) => push(x + y))))(s);
};

// export const stackManip = (s: Stack): [Stack, undefined] =>
// {
//     return bind(pop, (x:number) => push(x + x * x))(s);
// };