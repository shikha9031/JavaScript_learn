function iterateNestedList(sampleData, level = 0){
    
    for(let data of sampleData){
        let totalDescendants = countDescendants(data);
        const indent = "  ".repeat(level);
        if(data.children.length > 0){
            iterateNestedList(data.children, level+1)
        }
        console.log(`${indent} ${data.name} (Level: ${level}, Direct: ${data.children.length}, Total Descendants: ${totalDescendants})`)
    }
}

function countDescendants(node) {
    let total = node.children.length;   // direct children

    for (const child of node.children) {
        total += countDescendants(child);
    }

    return total;
}
const sampleData = [
  {
    name: "Root 1",
    children: [
      {
        name: "Child 1.1",
        children: [
          { name: "Grandchild 1.1.1", children: [] },
          { 
            name: "Grandchild 1.1.2", 
            children: [
              { name: "Great-grandchild 1.1.2.1", children: [] }
            ] 
          }
        ]
      },
      { name: "Child 1.2", children: [] }
    ]
  },
  {
    name: "Root 2",
    children: [
      {
        name: "Child 2.1",
        children: [
          { name: "Grandchild 2.1.1", children: [] },
          { name: "Grandchild 2.1.2", children: [] }
        ]
      }
    ]
  },
  {
    name: "Root 3",
    children: []
  }
];

iterateNestedList(sampleData);