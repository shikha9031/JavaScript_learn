function pipe(...fn){
    return function(args){
        let result = fn[0](args);
        for(let i = 1; i< fn.length;i++){
            result = fn[i](result);
        }
        return result;
    } 
}



const getSalary = (person) => person.salary
const addBonus = (netSalary) => netSalary + 1000;
const deductTax = (grossSalary) => grossSalary - (grossSalary * .3);

const result = pipe(
  getSalary,
  addBonus,
  deductTax 
)({ salary: 10000 });

console.log(result);
7700