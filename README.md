OOPJS
=====

Object-oriented programming on JavaScript

Basic usage
=====

Defining a new class:
```
function Animal(){
  Class.inherit(this,ObjectBase);
  
  // declare private class property
  var age = 0;
  
  // declare public class property  
  this.defineProperty("name");
  
  // declare public class method
  this.run = function(){
  }
  
  // declare private class method
  function sleep(){
  }
  
  // init function
  function init(args){
  }
  
  // call init function
  init.call(this, arguments)
}

function Rabbit(){
  Class.inherit(this, Animal);
  
  // declare public property for Rabbit class
  this.defineProperty("color");
}
```
ObjectBase References
=====
Properties
----
- **type** - returns type(name) of Class
```
var a = new Animal();
console.log(a.type) //Animal
```
- **_this** - returns **this** of Object
- **_self**  - returns **parent** of Object
```
var a = new Animal();
console.log(a.type) //Animal
console.log(a._self.type) //ObjectBase
```
Methods
-----
- **defineProperty**(*name*,[*param*]) - defines public property for Class
  *name* - name of property;
  *param* - Object with next attrs:
  - *readOnly* - True or False. Default is false;
  - *default* - default value of property. Default is Undefined;
```
function Rabbit(){
  Class.inherit(this, Animal);

  this.defineProperty("color",{readOnly:true,default:"Red"});
} 

var rabbit = new Rabbit();
console.log(rabbit.color) //Red
rabbit.color = "Blue";
console.log(rabbit.color) //Red, because property is readOnly
```
- **defineEvent**(*name*) - define event for Class.
- **equals**(*a*,[*b*]) - compare Objects. If b is undefined then it complares Object wich call equals function with given object. Return value is Boolean.
```
A.equals(B) //true || false
  //or
ObjectBase.equals(A,B) // true || false
```
