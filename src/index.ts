import { DebugLoggerFunction } from "util";

// 2.6 FizzBuzz　基本的な文法・基本的な型
{
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
}

// 3.3.1 部分型
{
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
}

// 3.3.2 部分型の例2
{
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
}

// 3.4 ジェネリック型
{
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
}

// 3.5 配列
{
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
}

// 3.6 分割代入
{
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
}

// 3.7 その他のオブジェクト
{
    // Date
    let d = new Date();
    console.log(d);
    d = new Date("2020-02-03T15:00:00+09:00");
    console.log(d);
    console.log(d.toLocaleDateString());

    // 正規表現
    let r = /ab+c/i;
    console.log(r.test("abbbbc"));
    console.log(r.test("Hello, abc world!"));
    console.log(r.test("ABC"));
    console.log(r.test("こんにちわ"));

    r = /^abc/
    console.log(r.test("abcdefg"));     // ^は先頭
    console.log(r.test("Hello, abcdefg"));

    // string型における正規表現
    console.log("Hello, abbbbbbbc world! abbc".replace(/ab+c/, "foobar"));
    console.log("Hello, abbbbbbbc world! abbc".replace(/ab+c/g, "foobar")); // gをつけると全部の一致文字を置換

    // matchとキャプチャリング
    const result = "Hello, abbbbbbbc world! abc".match(/a(b+)c/);
    if (result != null) {
        console.log(result[0]);
        console.log(result[1]);
    }

    // 名前付きキャプチャリンググループ
    const result2 = "Hello, abbbbbbbc world! abc".match(/a(?<worldName>b+)c/);
    if (result2 != null) {
        console.log(result2.groups);
    }

    // Map
    const map: Map<string, number> = new Map();
    map.set("foo", 1234);
    console.log(map.get("foo"));
    console.log(map.get("bar"));

    // 3.8 力試し
    {
        type User = {
            name: string;
            age: number;
            premiumUser: boolean;
        }

        const data: string = `
        uhyo,26,1
        John Smith,17,0
        Mary Sue,14,1
        `;

        const users: Array<User> = [];
        
        const lines = data.split("\n");
        for (const line of lines) {
            if (line === "") continue;
            const [name, ageString, premiumUserString] = line.split(",");
            const age = Number(ageString);
            const premiumUser = premiumUserString === "1";
            
            users.push({name, age, premiumUser});
        }

        for (const user of users) {
            if (user.premiumUser) {
                console.log(`${user.name} (${user.age})はプレミアムユーザです。`)
            } else {
                console.log(`${user.name} (${user.age})はプレミアムユーザではありません。`)
            }
        }
    }

    // 4.1.1 関数宣言
    {
        function range(min: number, max: number): number[] {
            const result = [];
            for (let i = min; i <= max; i++) {
                result.push(i);
            }
            return result;
        }

        console.log(range(1, 10));
    }

    // 4.1.2 void関数
    {
        function helloWorldNTimes(n: number): void {
            for (let i = 0; i < n; i++) {
                console.log("Hello, world!");
            }
        }

        helloWorldNTimes(5);
    }

    // 4.1.3 関数式
    {
        type Human = {
            height_m: number;
            weight_kg: number;
        };
        const calcBMI = function(human: Human): number {
            return human.weight_kg / human.height_m ** 2;
        };
        const jun: Human = {height_m: 1.68, weight_kg: 68 };
        console.log(calcBMI(jun));

        // 引数の分割代入
        const calcBMI2 = function({ height_m, weight_kg }: Human): number {
            return weight_kg / height_m ** 2;
        };
    }

    // 4.1.4 アロー関数式
    {
        type Human = {
            height: number;
            weight: number;
        };
        const calcBMI = ({ height, weight }: Human): number => {
            return weight / height ** 2;
        };

        const jun: Human = {height: 1.68, weight: 68 };
        console.log(calcBMI(jun));

        // 4.1.5 アロー関数の省略記法
        const calcBMI2 = ({ height, weight }: Human): number => weight / height ** 2;
    }

    // 4.1.6 メソッド記法
    {
        const obj = {
            double(num: number): number {
                return num * 2;
            },
            double2: (num: number): number => num * 2,
        };
    }

    // 4.1.7 可変長引数
    {
        const num = (...args: number[]): number => {
            let result = 0;
            for (const num of args) {
                result += num;
            }
            return result;
        }
    }

    // 4.1.10 コールバック関数
    {
        type User = { name: string; age: number };
        const users: User[] = [
            { name: "uhyo", age: 26 },
            { name: "John Smith", age: 15}
        ];

        // map
        const names = users.map((u: User): string => u.name);
        console.log(names);

        // filter
        const adultUsers = users.filter((user: User) => user.age >= 20);
        console.log(adultUsers);

        // every
        const allAdult = users.every((user: User) => user.age >= 20);
        console.log(allAdult);

        // some
        const seniorExits = users.some((user: User) => user.age >= 60);
        console.log(seniorExits);

        // find 
        const john = users.find((user: User) => user.name === "John Smith");
        console.log(john);
    }

    // 4.2 関数の型
    {
        const xRepeat = (num: number): string => "x".repeat(num);
        
        type F = (repeatNum: number) => string;
        const xRepeat2: F = (num: number): string => "x".repeat(num);
    }

    // 4.3.1 関数の部分型
    {
        type HasName = {
            name: string;
        }
        // HasNameの部分型
        type HasNameAndAge = {
            name: string;
            age: number;
        }

        // (age: number) => HasName 関数型の部分型
        const fromAge = (age: number): HasNameAndAge => ({
            name: "John Smith",
            age,
        });
        const f: (age: number) => HasName = fromAge;

        const obj: HasName = f(100);
    }

    // 4.3.2 引数の型による部分型関係
    {
        type HasName = {
            name: string;
        }
        type HasNameAndAge = {
            name: string;
            age: number;
        }

        const showName = (obj: HasName) => {
            console.log(obj.name);
        };
        const g: (obj: HasNameAndAge) => void = showName;

        g({
            name: "uhyo",
            age: 26,
        });
    }

    // 4.3.3. 引数の数による部分型関係
    {
        type UnaryFunc = (arg: number) => number;
        type BinaryFunc = (left: number, right: number) => number;

        const double: UnaryFunc = arg => arg * 2;
        const add: BinaryFunc = (left, right) => left + right;

        // UnaryFuncをBinaryFuncとして扱える
        const bin: BinaryFunc = double;

        console.log(bin(10, 100));
    }

    // 4.4 ジェネリクス

    // 4.4.1 関数の型引数
    {
        function repeat<T>(element: T, length: number): T[] {
            const result: T[] = [];
            for (let i = 0; i < length; i++) {
                result.push(element);
            }
            return result;
        }

        console.log(repeat<string>("a", 5));
        console.log(repeat<number>(123, 3));
    }        

    // 4.4.2 関数の型引数を宣言する方法
    {
        // function関数式
        const repeat = function<T>(element: T, length: number): T[] {
            const result: T[] = [];
            for (let i = 0; i < length; i++) {
                result.push(element);
            }
            return result;
        }

        // アロー関数
        const repeat2 = <T>(element: T, length: number): T[] => {
            const result: T[] = [];
            for (let i = 0; i < length; i++) {
                result.push(element);
            }
            return result;
        }

        // メソッド記法
        const util = {
            repeat<T>(element: T, length: number): T[] {
                const result: T[] = [];
                for (let i = 0; i < length; i++) {
                    result.push(element);
                }
                return result;
            }
        }

        // 型引数リストが複数の場合
        const pair = <Left, Right>(left: Left, right: Right): [Left, Right] => [left, right];
        const p = pair<string, number>("uhyo", 26);
    }

    // 4.4.3 関数の型引数は省略できる
    {
        function repeat<T>(element: T, length: number): T[] {
            const result: T[] = [];
            for (let i = 0; i < length; i++) {
                result.push(element);
            }
            return result;
        }

        // 引数の型から推論される
        const result = repeat("a", 5);
    }

    // 4.4.4 型引数を持つ関数型
    {
        const repeat = function<T>(element: T, length: number): T[] {
            const result: T[] = [];
            for (let i = 0; i < length; i++) {
                result.push(element);
            }
            return result;
        }

        type Func = <T>(arg: T, num: number) => T[];

        const repeat2: Func = (element, length) => {
            const result = [];
            for (let i = 0; i < length; i++) {
                result.push(element);
            }
            return result;
        }
    }

    // 4.5 変数とスコープ

    // モジュールスコープ
    // 関数スコープ
    // ブロックスコープ

    // 4.6 力試し

    // 4.6.1
    {
        for (const i of sequence(1, 100)) {
            const message = getFizzBuzzString(i);
            console.log(message);
        }

        function sequence(from: number, to: number): number[] {
            const result = [];
            for (let i = from; i <= to; i++) {
                result.push(i);
            }
            return result;
        }
        
        function getFizzBuzzString(num: number): string {
            if (num % 3 === 0 && num % 5 === 0) return "FizzBuzz";
            if (num % 3 === 0) return "Fizz";
            if (num % 5 === 0) return "Buzz";

            return num.toString();
        }
    }

    // 4.6.3 コールバック関数
    {
        function map(array: number[], callback: (value: number) => number): number[] {
            const result: number[] = [];
            for (const elm of array) {
                result.push(callback(elm));
            }
            return result;
        }

        const data = [1, 1, 2, 3, 5, 8, 13];
        const result = map(data, (x) => x * 10);
        console.log(result);

        function genericsMap<T>(array: T[], callback: (value: T) => T): T[] {
            const result: T[] = [];
            for (const elm of array) {
                result.push(callback(elm));
            }
            return result;
        }
        console.log(genericsMap(data, (x) => x * 100));
    }
}