let result: string = "";

for (let i = 1; i <= 100; i++) {
    const delimiter = !!result ? " " : "";

    const fizz = (i % 3 === 0) ? "Fizz" : "";
    const buzz = (i % 5 === 0) ? "Buzz" : "";

    const fizzbuzz = fizz + buzz || i;
    result += delimiter + fizzbuzz;
}

console.log(result);
