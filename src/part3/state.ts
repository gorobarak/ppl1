export type State<S, A> = (initialState: S) => [S, A];

export const bind = <S, A, B> (state: State<S, A>, f: (x: A) => State<S, B>): State<S, B> => { 
    return (intialState: S): [S, B] => { 
        const IntermidateState = state(intialState);
        return f(IntermidateState[1])(IntermidateState[0]);
    }  
}

