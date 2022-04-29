
// 2.6 FizzBuzz　基本的な文法・基本的な型
let result: string = "";
for (let i = 1; i <= 100; i++) {

    const fizzBuzz = {
        delimiter: !!result ? " " : "",
        fizz:  (i % 3 === 0) ? "Fizz" : "",
        buzz:  (i % 5 === 0) ? "Buzz" : "",
    };

    const output = fizzBuzz.fizz + fizzBuzz.buzz || i;
    result += fizzBuzz.delimiter + output;
}
// console.log(result);

// 3.3.1 部分型
type FooBar =  {
    foo: string;
    bar: number;
}
type FooBarBaz = {
    foo: string;
    bar: number;
    baz: boolean;
}

const obj: FooBarBaz = {
    foo: "hi",
    bar: 1,
    baz: false
};

// 3.3.2 部分型の例2
type Animal = {
    name: string;
};
type Human = {
    name: string;
    age: number;
}

type AnimalFamily = {
    familyName: string;
    mother: Animal;
    father: Animal;
    child: Animal;
}
type HumanFamily = {
    familyName: string;
    mother: Human;
    father: Human;
    child: Human;
}

// 3.4 ジェネリック型
type User<T> = {
    name: string;
    child: T;    
};
type Family<Parent, Child> = {
    mother: Parent;
    father: Parent;
    child: Child;
};
const genericObj: Family<number, string> = {
    mother: 0,
    father: 100,
    child: "1000",
};

// 型引数の制約
type HasName = {
    name: string;
};
type Family2<Parent extends HasName, Child extends HasName> = {
    mother: Parent;
    father: Parent;
    child: Child;
};
type T = Family2<Animal, Human>;

// オプショナルな型引数
type FamilyOptional<Parent = Animal, Child = Animal> = {
    mother: Parent;
    father: Parent;
    child: Child;
};
type S1 = FamilyOptional<string, string>;
type S2 = FamilyOptional;
type S3 = FamilyOptional<string>;