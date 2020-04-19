let tree = new BinaryTree();
tree.insert("b");
tree.insert("a");
tree.insert("c");

console.log(tree.height() === 2); // 2
console.log(JSON.stringify(tree.toArray()) === JSON.stringify(["a", "b", "c"])); // ['a','b','c']

tree.remove("b");
tree.insert("b");
console.log(JSON.stringify(tree.toArray()) === JSON.stringify(["a", "b", "c"])); // ['a','b','c']

console.log(tree.height() === 3); // 3
console.log(JSON.stringify(tree.toArray()) === JSON.stringify(["a", "b", "c"])); // ['a','b','c']

tree.insert("z");

console.log(tree.height() === 3); // 3
console.log(
  JSON.stringify(tree.toArray()) === JSON.stringify(["a", "b", "c", "z"])
); // ['a','b','c','z']

tree.insert("y");
tree.insert("x");

console.log(tree.height() === 4); // 4
console.log(
  JSON.stringify(tree.toArray()) ===
    JSON.stringify(["a", "b", "c", "x", "y", "z"])
); // ['a','b','c','x','y','z']

try {
  tree.insert("x");
} catch ({ message }) {
  console.log(message === "This tree already contains 'x'"); // This tree already contains 'x'
}

try {
  tree.remove("x");
  tree.remove("x");
} catch (error) {
  console.log(error.message === "This tree does not contain 'x'"); // This tree does not contain 'x'
}
tree = new BinaryTree();

tree.insert("a");
tree.insert("b");
tree.insert("c");
tree.insert("d");
tree.insert("e");

console.log(tree.height() === 5); // 5
console.log(
  JSON.stringify(tree.toArray()) === JSON.stringify(["a", "b", "c", "d", "e"])
); // ['a','b','c','d','e']

tree.remove("b");
tree.remove("a");
tree.remove("c");
tree.remove("d");
tree.remove("e");

console.log(tree.height() === 0); // 0
console.log(JSON.stringify(tree.toArray()) === "[]"); // []
