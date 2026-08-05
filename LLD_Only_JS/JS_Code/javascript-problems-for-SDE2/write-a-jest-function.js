//Write a function to implement Test() and expect() as in Jest
const matchers = {
    toBe: function(expected, actual, matcherProperties){
        const { isNot } = matcherProperties;
        if(isNot){
            if(expected === actual){
                throw new Error("Should Not Match")
            }
        }
        else{
            if(expected !== actual){
                throw new Error("Should Match")
            }
        }
    },
    toBeUndefined: function(expected, actual, matcherProperties){
        const { isNot } = matcherProperties;
        if(isNot){
            if(actual === undefined){
                throw new Error("Should not undefined")
            }
        }
        else{
            if(actual !== undefined){
                throw new Error("Should be undefined");
            }
        }
    }
}

const helperMatcher = (actual, matcherFn, isNot=false)=>{
    return function(expected){
        matcherFn(expected, actual, {isNot});
    }
}

const expect = function(actual){
    const expectation = {
        not: {}
    }
    for(const key in matchers){
        const matcherFn = matchers[key];
        expectation[key] =  helperMatcher(actual, matcherFn, false);
        expectation.not[key] = helperMatcher(actual, matcherFn, true);
    }
    return expectation;
}
const test = async (title, callback)=>{
    try {
        await callback();
        console.log(`Pass ${title}`);
    }
    catch(err){
        console.error(`Fail ${title}`);
       // console.error(err);
    }
}

test('To be undefined', ()=>{
    expect(undefined).toBeUndefined();
})
test('Not to be undefined 1', ()=>{
    expect(undefined).not.toBeUndefined();
})
test('Not to be undefined 2', ()=>{
    expect(1).not.toBeUndefined();
})