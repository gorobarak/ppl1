import { Result, makeFailure, makeOk, bind, either } from "../lib/result";
import * as R from "ramda";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult =  <T>(pred: (x: T) => boolean, a: T[]): Result<T> => {
    return R.not(R.any(pred)(a)) ? makeFailure("no such element exists") :
            makeOk(R.filter(pred, a)[0]); 
    // try {
    //     const x = findOrThrow(pred, a);
    //     return makeOk(x);
    // } catch (e) {
    //     return makeFailure("no such element exists");
    // }
};

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const isEven = (x: number): boolean => x % 2 === 0;

export const sqaureResult = (x: number): Result<number> => makeOk(x*x);

export const sqaure = (x: number): number => x*x

export const returnSquaredIfFoundEven_v2 = (a: number[]): Result<number> => {
    const res = findResult(isEven, a);
    return bind(res, sqaureResult);
}

export const returnSquaredIfFoundEven_v3 = (a: number[]): number => {
    const res = findResult(isEven, a);
    return either(res, sqaure,(message: string) => -1 );
};