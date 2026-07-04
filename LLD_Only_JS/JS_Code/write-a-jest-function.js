const matchers = {
    toBe: function(expected,actual, matcherProperties){
        const { isNot } = matcherProperties;
        if(isNot){
            if(expected === actual){
                throw new Error("Should not match");
            }
        }
        else{
            if(expected !== actual){
                throw new Error("Should match");
            }
        }
    },
    toBeUndefined: function(expected, actual, matcherProperties){
        const { isNot } = matcherProperties;
        if(isNot){
            if(actual === undefined){
                throw new Error("Should not match");
            }
        }
        else{
            if(actual !== undefined){
                throw new Error("Should match");
            }
        }
    }
}

const helperMacthers = (actual, mactherFn, isNot = false)=>{
    return function(expected){
        mactherFn(expected, actual, {isNot});
    }
}

const expect = function(actual){
    const expectation = {
        not: {}
    }
    for(let key in matchers){
        const matcherFn = matchers[key];
        expectation[key] = helperMacthers(actual, matcherFn, false);
        expectation.not[key] = helperMacthers(actual, matcherFn, true);
    }
    return expectation;
} 

const test = async (title, callback) => {
  try {
    await callback();
    console.log(`Pass ${title}`);
  } catch (error) {
    console.error(`Fail ${title}`);
    console.error(error);
  }
};

test('To be undefined', () => {
  expect(undefined).toBeUndefined();
});
// "Pass To be undefined"

test('To not be undefined', () => {
  expect(undefined).not.toBeUndefined();
});
// "Fail To not be undefined"

test('To not be undefined', () => {
  expect(1).not.toBeUndefined();
});
// "Pass To not be undefined"

