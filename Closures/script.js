function outer(){
    var  x = 10;
    function inner(){
        x++;
        console.log("Value of x:", x);

        console.log("Hello from inner function");
    }
    return inner;
}

let a = outer();
let b = outer();
// console.log(a); 

a(); // This will call the inner function and print "Hello from inner function"
// console.log(x); // This will throw an error because x is not defined in this scope


a(); // This will call the inner function again and increment x
b(); // This will call the inner function of a new closure, so x starts from

// function fun(){
//     var x = 10;
//     return x;
// }

// var p = fun();
// console.log(p);

// a = ()=>{
// }



// function fun(){
//     var a = 10;
//     var x = ()=>{
//         var b = 20;
//         console.log(a);
//         console.log(b);
//     }
//     return x;
// }

// var p = fun();
// console.log(p);
// p();

// var a = 20;
// var x = 50;

// function outer(){
//     var x = 40;
//     function inner(){
//         var a = 30;
//         console.log(a);
//         x++;
//         console.log(x);
//     }
//     return inner;
// }

// var p = outer();
// p();


// function outerFun(){
//     let money  = 50;
//     function innerFun(){
//         money++;
//         let a = 10;
//         function innerMostFun(){
//             money++;
//             a++;
//             console.log('money : ',money,' a: ',a);
//         }
//         return innerMostFun;
//     }
//     return innerFun;
// }
// let fun = outerFun();
// let fun1 = fun();
// let fun2 = fun();

// fun1();
// fun1();
// fun2();
// fun2();
// fun1();