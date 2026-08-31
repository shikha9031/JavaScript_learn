//The Strategy design pattern is a behavioural design pattern that enables selecting an algorithm's behaviour at runtime. 
/**
 * This pattern allows the algorithm to vary independently from the clients that use it. The key components of this pattern are the Strategy, the ConcreteStrategy, and the Context.
 * Strategy: Declares an interface common to all supported algorithms.
 * ConcreteStrategy: Implements the algorithm defined in the Strategy interface.
 * Context: Maintains a reference to a Strategy object and delegates the algorithm's execution to the currently set Strategy.
 */

/**
 * If a class extends another class and has its own constructor, it must call super() before using this.
 */
//Simple Example

// Strategy interface

class DiscountStrategy {
  calculate(price) {
    throw new Error("This method should be overridden!");
  }
} 

// Concrete strategies
class NoDiscount extends DiscountStrategy {
  calculate(price) {
    return price;
  }
}

class PercentageDiscount extends DiscountStrategy {
  constructor(percentage) {
    super();
    this.percentage = percentage;
  }
  calculate(price) {
    return price - (price * this.percentage) / 100;
  }
}

class FixedDiscount extends DiscountStrategy {
  constructor(discount) {
    super();
    this.discount = discount;
  }
  calculate(price) {
    return price - this.discount;
  }
} 

// Context
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discountStrategy = new NoDiscount();
  }
  setDiscountStrategy(discountStrategy) {
    this.discountStrategy = discountStrategy;
  }
  addItem(item, price) {
    this.items.push({ item, price });
  }
  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + this.discountStrategy.calculate(item.price);
    }, 0);
  }
} 

// Client Test Case
const cart = new ShoppingCart();
cart.addItem("Shirt", 50);
cart.addItem("Pants", 100);
console.log("Total without discount:", cart.calculateTotal());
cart.setDiscountStrategy(new PercentageDiscount(10));
console.log("Total with 10% discount:", cart.calculateTotal());
cart.setDiscountStrategy(new FixedDiscount(15));
console.log("Total with $15 discount:", cart.calculateTotal());


//Little Complex example

// Strategy interface
class PaymentStrategy {
  pay(amount) {
    throw new Error("This method should be overridden!");
  }
} 

// Concrete strategies
class CreditCardPayment extends PaymentStrategy {
  constructor(cardNumber, cardHolder, expiryDate) {
    super();
    this.cardNumber = cardNumber;
    this.cardHolder = cardHolder;
    this.expiryDate = expiryDate;
  }
  pay(amount) {
    console.log(`Paid ${amount} using Credit Card: ${this.cardNumber}`);
  }
}

class PayPalPayment extends PaymentStrategy {
  constructor(email) {
    super();
    this.email = email;
  }
  pay(amount) {
    console.log(`Paid ${amount} using PayPal: ${this.email}`);
  }
}

class BitcoinPayment extends PaymentStrategy {
  constructor(walletAddress) {
    super();
    this.walletAddress = walletAddress;
  }
  pay(amount) {
    console.log(`Paid ${amount} using Bitcoin: ${this.walletAddress}`);
  }
} 

// Context
class Order {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }
  setPaymentStrategy(paymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }
  addItem(item, price) {
    this.items.push({ item, price });
  }
  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
  checkout() {
    const total = this.calculateTotal();
    if (!this.paymentStrategy) {
      throw new Error("No payment strategy set!");
    }
    this.paymentStrategy.pay(total);
  }
} 


// Client Test Case
const order = new Order();
order.addItem("Laptop", 1000);
order.addItem("Phone", 500);
order.setPaymentStrategy(new CreditCardPayment("1234-5678-9012-3456", "John Doe", "12/25") );
order.checkout();
order.setPaymentStrategy(new PayPalPayment("[email protected]"));
order.checkout();
order.setPaymentStrategy(new BitcoinPayment("1A2b3C4d5E6F7g8H9I0J"));
order.checkout();
