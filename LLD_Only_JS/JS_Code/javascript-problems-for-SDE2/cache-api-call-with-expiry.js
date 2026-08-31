const generateKeys = function(api, config){
    let key = Object.keys(config).
    sort((a,b)=> a.localeCompare(b)).
    map((item)=> item+":"+config[item].toString()).
    join("&");
    return api+key;
}

const fetchData = async(api, data)=>{
    try{
        let response = await fetch(api);
        let result = await response.json();
        return result;
    }
    catch(err){
        console.log("error: ", err);
    }
    return null;
}

const cachedApiCall = (wait)=>{
    let cache = {};
    return async function(api, config){
        let key = generateKeys(api, config);
        if(!cache[key] || cache[key].expiryTime < Date.now()){
            try{
                const response = await fetchData(api, config);
                cache[key] = {response, expiryTime: Date.now() + wait};
            }
            catch(err){
                console.log(err);
            }
        }
        return cache[key].response;
    }
}