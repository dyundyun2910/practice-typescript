type Animal = {
    age: number;
};
type Human = {
    age: number;
    name: string;
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