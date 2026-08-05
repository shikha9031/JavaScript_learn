console.log('Hello!');
function JSONtoHTML(obj) {
  if (typeof obj === 'string') {
    return document.createTextNode(obj);
  }
  if (obj && obj.type) {
    let elem = document.createElement(obj.type);
    for (let [prop, val] of Object.entries(obj.props || {})) {
      elem.setAttribute(prop, val);
    }
    if (Array.isArray(obj.children)) {
      for (let child of obj.children) {
        elem.append(JSONtoHTML(child));
      }
    } else {
      elem.textContent = obj.children;
    }
    return elem;
  }
}

//Input:
const json = {
  type: 'div',
  props: { id: 'hello', class: 'foo' },
  children: [
    { type: 'h1', children: 'HELLO' },
    {
      type: 'p',
      children: [{ type: 'span', props: { class: 'bar' }, children: 'World' }],
    },
  ],
};

console.log(JSONtoHTML(json));
