//The Factory Design Pattern in JavaScript is a creational pattern that provides a way to create objects without specifying the exact class of object that will be created

// Simple Example
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  draw() {
    console.log(`Drawing a Circle with radius ${this.radius}`);
  }
}

class Square {
  constructor(side) {
    this.side = side;
  }
  draw() {
    console.log(`Drawing a Square with side ${this.side}`);
  }
}

class ShapeFactory {
  createShape(type, size) {
    switch (type) {
      case "circle":
        return new Circle(size);
      case "square":
        return new Square(size);
      default:
        throw new Error("Shape type not recognized");
    }
  }
}


// Usage
const factory = new ShapeFactory();
const circle = factory.createShape("circle", 5);
circle.draw(); // Output: Drawing a Circle with radius 5

const square = factory.createShape("square", 4);
square.draw(); // Output: Drawing a Square with side 4

// Little Complex example

class EmailNotification {
  constructor(email, message) {
    this.email = email;
    this.message = message;
  }
  send() {
    console.log(`Sending Email to ${this.email} with message: ${this.message}`);
  }
}

class SMSNotification {
  constructor(phone, message) {
    this.phone = phone;
    this.message = message;
  }
  send() {
    console.log(`Sending SMS to ${this.phone} with message: ${this.message}`);
  }
}

class PushNotification {
  constructor(deviceId, message) {
    this.deviceId = deviceId;
    this.message = message;
  }
  send() {
    console.log(`Sending Push Notification to device ${this.deviceId} with message:
${this.message}`);
  }
}

class NotificationFactory {
  createNotification(type, config) {
    switch (type) {
      case "email":
        return new EmailNotification(config.email, config.message);
      case "sms":
        return new SMSNotification(config.phone, config.message);
      case "push":
        return new PushNotification(config.deviceId, config.message);
      default:
        throw new Error("Notification type not recognized");
    }
  }
}

// Usage
const notificationFactory = new NotificationFactory();
const emailNotification = notificationFactory.createNotification("email", {
  email: "[email protected]",
  message: "Hello via Email!",
});
emailNotification.send(); // Output: Sending Email to [email protected] with message: Hello via Email!

const smsNotification = notificationFactory.createNotification("sms", {
  phone: "123-456-7890",
  message: "Hello via SMS!",
});
smsNotification.send(); // Output: Sending SMS to 123-456-7890 with message: Hello via SMS!

const pushNotification = notificationFactory.createNotification("push", {
  deviceId: "device123",
  message: "Hello via Push Notification!",
});
pushNotification.send(); // Output: Sending Push Notification to device device123 with message: Hello via Push Notification!
