// part 1 my own implementation
function computeAmount(){
    let lakhValue = 0;
    let croreValue = 0;
    let thousandValue = 0;
    const lacs = function(value){
        lakhValue += value * 100000;
        return this;
    }
    const crore = function(value) {
        croreValue += value * 10000000;
        return this;
    }
    const thousand = function(value){
        thousandValue += value * 1000;
        return this;
    }
    const value = function(){
        return croreValue + lakhValue+thousandValue
    }
    return {
        lacs: lacs,
        crore: crore,
        value:value,
        thousand:thousand
    }
}
// Input:
 const value = computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();


 //Method 1: Using function as constructor
 const ComputeAmount = function(){
  this.store = 0;
  
  this.crore = function(val){
    this.store += val * Math.pow(10, 7);
    return this;
  };
  
  this.lacs = function(val){
    this.store += val * Math.pow(10, 5);
    return this;
  }
  
  this.thousand = function(val){
    this.store += val * Math.pow(10, 3);
    return this;
  }
  
  this.hundred = function(val){
    this.store += val * Math.pow(10, 2);
    return this;
  }
  
  this.ten = function(val){
    this.store += val * 10;
    return this;
  }
  
  this.unit = function(val){
    this.store += val;
    return this;
  }
  
  this.value = function(){
    return this.store;
  }
}

//Method 2: Using function as closure
const ComputeAmount = function(){
  
  return {
    store: 0,
    crore: function(val){
      this.store += val * Math.pow(10, 7);
      return this;
    },

    lacs: function(val){
      this.store += val * Math.pow(10, 5);
      return this;
    },

    thousand: function(val){
      this.store += val * Math.pow(10, 3);
      return this;
    },

    hundred: function(val){
      this.store += val * Math.pow(10, 2);
      return this;
    },

    ten: function(val){
      this.store += val * 10;
      return this;
    },

    unit: function(val){
      this.store += val;
      return this;
    },

    value: function(){
      return this.store;
    }
  }
}