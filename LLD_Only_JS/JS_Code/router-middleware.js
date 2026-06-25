class Router{
    constructor(){
        this.map = new Map();
    }
    addRoute(key, value){
        this.map.set(key, value);
    }
    callRoute(route){
        if(this.map.has(route)){
            return this.map.get(route);
        }
         let givenRoute = route.split("/");
        for(let [key, val] of this.map){
            let searchRoute = key.split("/");
            if(searchRoute[0] === givenRoute[0] && searchRoute.length === givenRoute.length){
                let flag = true;
                for(let i = 0; i<searchRoute.length; i++){
                    if(searchRoute[i] !== givenRoute[i] && searchRoute[i] !== '*'){
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    return val;
                }
            }
        }
    }
}

let router = new Router();
router.addRoute("/bar", "result");
console.log(router.callRoute("/bar")); // "result"


router.addRoute("/foo", "foo")
router.addRoute("/bar/*/baz", "bar")
console.log(router.callRoute("/bar/a/baz")) //"bar"

router.addRoute("/foo/baz", "foo")
router.addRoute("/foo/*", "barrier");

console.log(router.callRoute("/foo/baz"));
// "foo"

console.log(router.callRoute("/foo/bar"));
// "barrier"