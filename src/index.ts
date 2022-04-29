
// 2.6 FizzBuzz　基本的な文法・基本的な型
let result: string = "";
for (let i = 1; i <= 100; i++) {

    const fizzBuzz = {
        delimiter: !!result ? " " : "",
        fizz: (i % 3 === 0) ? "Fizz" : "",
        buzz: (i % 5 === 0) ? "Buzz" : "",
    };

    const output = fizzBuzz.fizz + fizzBuzz.buzz || i;
    result += fizzBuzz.delimiter + output;
}
// console.log(result);

// 3.3.1 部分型
type FooBar = {
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

// 3.5 配列

const arr = [0, 123, -456 * 100];
console.log(arr);
const arr2 = [100, "文字列", false];    //複数の型OK
const arr3 = [1, 2, 3, ...arr];
console.log(arr3);  // スプレッド構文

// 3.5.3 配列型
const arr4: boolean[] = [false, true];
const arr5: Array<{
    name: string;
}> = [
        { name: "山田さん" },
        { name: "田中さん" },
        { name: "スズキさん" },
    ];
const takaki = { name: "髙木さん" };
arr5.push(takaki);
console.log(arr5);
console.log(`${takaki.name}は`, arr5.includes(takaki) ? "いる" : "いない");
const saito = { name: "斎藤さん" };
console.log(`${saito.name}は`, arr5.includes(saito) ? "いる" : "いない");

// 3.6 分割代入
const nested = {
    num: 123,
    obj: {
        foo: "hello",
        bar: "world"
    }
};
{
    const {
        num,
        obj: { foo } //ネストの内側のプロパティを取得できる
    } = nested;
    console.log(num);
    console.log(foo);
}

const arr6 = [1, 2, 4, 8, 16, 32];

const [first, second, third, , fifth] = arr6;    // 空白でスキップ
console.log(first);
console.log(second);
console.log(third);
console.log(fifth);

const tuple: [string, number] = ["uhyo", 26];
const [myName, age] = tuple;

type Obj = { foo?: number };
const obj1: Obj = {};
const obj2: Obj = { foo: -1234 };

const { foo = 500 } = obj1; // 分割代入のデフォルト値
const { foo: bar = 500 } = obj2;

// 3.7 その他のオブジェクト

// Date
let d = new Date();
console.log(d);
d = new Date("2020-02-03T15:00:00+09:00");
console.log(d);
console.log(d.toLocaleDateString());
