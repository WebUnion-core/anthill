class Interface_shape {
    constructor() {
        this.metName = 'draw'
    }
    InterfaceSreach(o) {
        let Interface = this.metName;
        if (!o[Interface]) {
            console.error(`error -> 必须实现${Interface}方法`);
        }
    }
}

class Interface_color {
    constructor() {
        this.metName = 'fill'
    }
    InterfaceSreach(o) {
        let Interface = this.metName;
        if (!o[Interface]) {
            console.error(`error -> 必须实现${Interface}方法`);
        }
    }
}

class Rectangle extends Interface_shape {
    constructor() {
        super().InterfaceSreach(this)
    }
    draw() {
        console.log('画一个长方形');
    }
}

class Square extends Interface_shape {
    constructor() {
        super().InterfaceSreach(this)
    }
    draw() {
        console.log('画一个正方形');
    }
}

class Circle extends Interface_shape {
    constructor() {
        super().InterfaceSreach(this)
    }
    draw() {
        console.log('画一个圆');
    }
}

class Red extends Interface_color {
    constructor() {
        super().InterfaceSreach(this)
    }
    fill() {
      console.log('填充红色');
   }
}

class Blue extends Interface_color {
    constructor() {
        super().InterfaceSreach(this)
    }
    fill() {
      console.log('填充蓝色');
   }
}

class Green extends Interface_color {
    constructor() {
        super().InterfaceSreach(this)
    }
    fill() {
      console.log('填充绿色');
   }
}

class AbstractFactory {
    getColor(color){
        return new Error('不能直接调用抽象类方法');
    };
    getShape(shape){
        return new Error('不能直接调用抽象类方法');
    };

}

class ShapeFactory extends AbstractFactory {
   getShape(shapeType){
      if(shapeType == null){
         return null;
      }        
      if(shapeType.toUpperCase() === "CIRCLE"){
         return new Circle();
      } else if(shapeType.toUpperCase() === "RECTANGLE"){
         return new Rectangle();
      } else if(shapeType.toUpperCase() === "SQUARE"){
         return new Square();
      }
      return null;
   }
}

class ColorFactory extends AbstractFactory {
   getColor(color) {
      if(color == null){
         return null;
      }        
      if(color.toUpperCase() === "RED"){
         return new Red();
      } else if(color.toUpperCase() === "GREEN"){
         return new Green();
      } else if(color.toUpperCase() === "BLUE"){
         return new Blue();
      }
      return null;
   }
}

class FactoryProducer {
    static getFactory(choice){
      if(choice.toUpperCase() === "SHAPE"){
         return new ShapeFactory();
      } else if(choice.toUpperCase() === "COLOR"){
         return new ColorFactory();
      }
      return null;
   }
}

let shapeFactory = FactoryProducer.getFactory('shape');
let CIRCLE = shapeFactory.getShape("CIRCLE");
CIRCLE.draw();// 画一个圆

let RECTANGLE = shapeFactory.getShape("RECTANGLE");
RECTANGLE.draw();// 画一个长方形

let SQUARE = shapeFactory.getShape("SQUARE");
SQUARE.draw();// 画一个正方形


let colorFactory = FactoryProducer.getFactory('color');
let RED = colorFactory.getColor('RED');
RED.fill(); //填充红色

let GREEN = colorFactory.getColor('GREEN');
GREEN.fill(); //填充绿色

let BLUE = colorFactory.getColor('BLUE');
BLUE.fill(); //填充蓝色