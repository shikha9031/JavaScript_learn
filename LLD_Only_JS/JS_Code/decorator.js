/**
 * The Decorator design pattern is a structural pattern that allows behaviour to be added to individual objects, dynamically, without affecting the behaviour of other objects from the same class. This is achieved by creating a set of decorator classes that are used to wrap concrete components. The key components of this pattern are the Component, ConcreteComponent, Decorator, and ConcreteDecorator.
 * Component: Declares the interface for objects that can have responsibilities added to them dynamically
 * ConcreteComponent: Defines an object to which additional responsibilities can be attached.
 * Decorator: Maintains a reference to a Component object and defines an interface that conforms to the Component's interface.
 * ConcreteDecorator: Adds responsibilities to the component.
 */

//Simple Example
// Component
class Notification {
  send(message) {
    console.log(`Sending notification: ${message}`);
  }
} 

// Concrete Component
class BasicNotification extends Notification {
  send(message) {
    super.send(message);
  }
} 

// Decorator
class NotificationDecorator extends Notification {
  constructor(notification) {
    super();
    this.notification = notification;
  }
  send(message) {
    this.notification.send(message);
  }
} 

// Concrete Decorators
class EmailNotification extends NotificationDecorator {
  send(message) {
    super.send(message);
    console.log(`Sending email with message: ${message}`);
  }
}

class SMSNotification extends NotificationDecorator {
  send(message) {
    super.send(message);
    console.log(`Sending SMS with message: ${message}`);
  }
} 


//Test Cases
let notification = new BasicNotification();
notification = new EmailNotification(notification);
notification = new SMSNotification(notification);
notification.send("Hello, this is your notification!");

//Complex Example
// Component
class Product {
  getPrice() {
    return 0;
  }
} 

// Concrete Component
class BasicProduct extends Product {
  constructor(price) {
    super();
    this.price = price;
  }
  getPrice() {
    return this.price;
  }
} 

// Decorator
class ProductDecorator extends Product {
  constructor(product) {
    super();
    this.product = product;
  }
  getPrice() {
    return this.product.getPrice();
  }
} 

// Concrete Decorators
class DiscountDecorator extends ProductDecorator {
  constructor(product, discount) {
    super(product);
    this.discount = discount;
  }
  getPrice() {
    return this.product.getPrice() * (1 - this.discount);
  }
}

class TaxDecorator extends ProductDecorator {
  constructor(product, tax) {
    super(product);
    this.tax = tax;
  }
  getPrice() {
    return this.product.getPrice() * (1 + this.tax);
  }
}

// Test Case
let product = new BasicProduct(100); // Base price $100
product = new DiscountDecorator(product, 0.1); // Apply 10% discount
product = new TaxDecorator(product, 0.2); // Apply 20% tax

console.log(`Final price: ${product.getPrice().toFixed(2)}`);