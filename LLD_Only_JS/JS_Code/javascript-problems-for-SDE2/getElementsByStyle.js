const getPropertyComputedValue = (property, value)=>{
    const div = document.createElement('div');
    div.style[property] = value;
    const styles = window.getComputedStyle(document.body.appendChild(div));
    let computedValues = styles[property];
    document.body.removeChild(div);
    return computedValues;
}

function getElementsByStyle(rootElement, property, value){
    const computedValues = getPropertyComputedValue(property, value);
    //to Store the result
    const result = [];

    const search = (element, property, value)=>{
        let computedStyles = window.getComputedStyle(element);
        let elementPropertyValues = computedStyles[property];
        if(elementPropertyValues === computedValues){
            result.push(element);
        }
        for(let child of element.children){
            search(child, property, value);
        }
    }
    search(rootElement, property, value);
    return result;
}