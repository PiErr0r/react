# JS notes

- `super` must be called in a class which extends another class and it calls the parent objects constructor
- `static` keyword in a class makes the method callable only by the class and not by the instances of the class:
```JS
class Triple {
  static customName = 'Tripler';
  static description = 'I triple any number you provide';
  static triple(n = 1) {
    return n * 3;
  }
}

class BiggerTriple extends Triple {
  static longDescription;
  static description = 'I square the triple of any number you provide';
  static triple(n) {
    return super.triple(n) * super.triple(n);
  }
}

console.log(Triple.description);   // 'I triple any number you provide'
console.log(Triple.triple());      // 3
console.log(Triple.triple(6));     // 18

var tp = new Triple();

console.log(BiggerTriple.triple(3));        // 81 (not affected by parent's instantiation)
console.log(BiggerTriple.description);      // 'I square the triple of any number you provide'
console.log(BiggerTriple.longDescription);  // undefined
console.log(BiggerTriple.customName);       // 'Tripler'

console.log(tp.triple());         // 'tp.triple is not a function'.

```
