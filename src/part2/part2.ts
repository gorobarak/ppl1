import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countVowels : (word: string) => number =
                             (word: string) : number =>
                             R.reduce((acc: number, curr: string) : number => isVowel(curr) ? acc + 1 : acc  
                             ,0, stringToArray(word));

export const isVowel : (letter: string) => boolean = (letter: string) : boolean => {
    return letter === 'a' ?
    true : letter === 'e' ?
    true : letter === 'u' ? 
    true : letter === 'o' ? 
    true : letter === 'i' ? 
    true : letter === 'A' ?
    true : letter === 'E' ?
    true : letter === 'U' ? 
    true : letter === 'O' ? 
    true : letter === 'I' ?
    true : false;
}

const datePraser = (year:string , month:number, day:number) => `${year}-${month}-${day}`;

/* Question 2 */
export const runLengthEncoding = (word: string) : string => R.reduce(reducer_q2, "", group_letters(word));
                                    
export const group_letters = (word: string) : string[][] => R.groupWith(R.equals, stringToArray(word));
export const reducer_q2 = (acc:string, curr: string[]) : string => R.length(curr) === 1 ? 
                R.concat(acc, curr[0]) : R.concat(acc, R.concat(curr[0], R.toString(R.length(curr))));

//console.log(runLengthEncoding("asdfaasd"));

/* Question 3 */
export const isPaired = (text: string) : boolean => remove_all(keep_brackets(text));

export const remove_all = (text: string) : boolean => {
                                                    const len = R.length(stringToArray(text));
                                                    return len === 0 ?                                   //no parantheses remaining
                                                    true :len % 2 === 1 ?                               //odd amount of parantheses remaining
                                                    false : R.length(stringToArray(remove_touching(text))) === len ?   //no more parantheses to remove
                                                    false : remove_all(remove_touching(text));              //removed parantheses, keep checking
}

export const is_openning = (c: string) : boolean => (c === "(") || (c === "[") || (c === "{"); //checks wether an opening bracket
export const is_closing = (c: string) : boolean => (c === ")") || (c === "]") || (c === "}"); //checks wether a closing bracket
export const is_bracket = (c: string) : boolean => (is_openning(c) || is_closing(c));
export const keep_brackets = (s: string) : string => R.join("", R.filter(is_bracket, stringToArray(s))); //returns only parantheses from a string
export const remove_touching = (s: string) : string => R.replace(/\(\)|\[\]|\{\}/g, '', s); //removes all adjacent paranteses - ()[]{}
