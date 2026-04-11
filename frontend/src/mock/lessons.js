export const mockLessons = [
  { id: 1, module_id: 1, title: "What are Variables?", order: 1, is_completed: true },
  { id: 2, module_id: 1, title: "Data Types in Python", order: 2, is_completed: true },
  { id: 3, module_id: 1, title: "Type Casting", order: 3, is_completed: true },
  { id: 4, module_id: 2, title: "If Statements", order: 1, is_completed: true },
  { id: 5, module_id: 2, title: "Elif and Else", order: 2, is_completed: true },
  { id: 6, module_id: 2, title: "Nested Conditions", order: 3, is_completed: false },
  { id: 7, module_id: 3, title: "For Loops", order: 1, is_completed: true },
  { id: 8, module_id: 3, title: "While Loops", order: 2, is_completed: true },
  { id: 9, module_id: 3, title: "Loop Control: break & continue", order: 3, is_completed: false },
  { id: 10, module_id: 4, title: "Defining Functions", order: 1, is_completed: false },
  { id: 11, module_id: 4, title: "Parameters and Arguments", order: 2, is_completed: false },
  { id: 12, module_id: 4, title: "Return Values", order: 3, is_completed: false },
  { id: 13, module_id: 4, title: "Scope and Lifetime", order: 4, is_completed: false },
  { id: 14, module_id: 5, title: "Lists Basics", order: 1, is_completed: false },
  { id: 15, module_id: 5, title: "List Methods", order: 2, is_completed: false },
  { id: 16, module_id: 5, title: "Dictionary Basics", order: 3, is_completed: false },
  { id: 17, module_id: 5, title: "Working with Dictionaries", order: 4, is_completed: false },
  { id: 18, module_id: 6, title: "Recursion Concepts", order: 1, is_completed: false },
  { id: 19, module_id: 6, title: "Base Cases and Recursion", order: 2, is_completed: false },
  { id: 20, module_id: 6, title: "Advanced Recursion", order: 3, is_completed: false },
  { id: 21, module_id: 3, title: "Nested Loops", order: 4, is_completed: false },
  { id: 22, module_id: 3, title: "Looping Through Strings", order: 5, is_completed: false },
];

export const mockLessonContent = {
  7: {
    id: 7,
    title: "For Loops",
    content_html: `
      <h2>Introduction to For Loops</h2>
      <p>A <strong>for loop</strong> in Python is used to iterate over a sequence
      (like a list, tuple, or string) and execute a block of code for each item.</p>
      <h3>Basic Syntax</h3>
      <pre><code>for item in sequence:
    # code to execute</code></pre>
      <h3>Example</h3>
      <pre><code>fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)</code></pre>
      <p>This will print each fruit on a new line.</p>
      <h3>Using range()</h3>
      <pre><code>for i in range(5):
    print(i)  # prints 0, 1, 2, 3, 4</code></pre>
      <p>The <code>range()</code> function generates a sequence of numbers.</p>
    `,
    task_id: 1,
  },
  8: {
    id: 8,
    title: "While Loops",
    content_html: `
      <h2>Introduction to While Loops</h2>
      <p>A <strong>while loop</strong> keeps running as long as its condition stays true.</p>
      <h3>Basic Syntax</h3>
      <pre><code>while condition:
    # repeat this block</code></pre>
      <h3>Example</h3>
      <pre><code>count = 3
while count > 0:
    print(count)
    count -= 1</code></pre>
      <p>Use a while loop when you do not know the exact number of repetitions in advance.</p>
      <h3>Important Tip</h3>
      <p>Always make sure something inside the loop changes, otherwise you can create an infinite loop.</p>
    `,
    task_id: 4,
  },
  9: {
    id: 9,
    title: "Loop Control: break & continue",
    content_html: `
      <h2>Controlling Loop Flow</h2>
      <p>The keywords <code>break</code> and <code>continue</code> help you control what happens inside a loop.</p>
      <h3>break</h3>
      <p><code>break</code> stops the loop immediately.</p>
      <pre><code>for item in numbers:
    if item == 0:
        break</code></pre>
      <h3>continue</h3>
      <p><code>continue</code> skips the current iteration and moves to the next one.</p>
      <pre><code>for item in numbers:
    if item < 0:
        continue
    print(item)</code></pre>
      <p>These tools are useful when only part of the data should be processed.</p>
    `,
    task_id: 7,
  },
  10: {
    id: 10,
    title: "Defining Functions",
    content_html: `
      <h2>Introduction to Functions</h2>
      <p>A <strong>function</strong> is a reusable block of code that performs a specific task. Functions help organize code and avoid repetition.</p>
      <h3>Basic Syntax</h3>
      <pre><code>def function_name(parameters):
    # code to execute
    return result</code></pre>
      <h3>Example</h3>
      <pre><code>def greet(name):
    return f"Hello, {name}!"

message = greet("Alice")
print(message)  # Output: Hello, Alice!</code></pre>
      <h3>Key Points</h3>
      <ul>
        <li>Functions start with the <code>def</code> keyword</li>
        <li>Give your function a descriptive name</li>
        <li>Use <code>return</code> to send a value back</li>
      </ul>
    `,
    task_id: undefined,
  },
  14: {
    id: 14,
    title: "Lists Basics",
    content_html: `
      <h2>Introduction to Lists</h2>
      <p>A <strong>list</strong> is a collection of items in Python. Lists are mutable, meaning you can change them after creation.</p>
      <h3>Creating a List</h3>
      <pre><code>fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]</code></pre>
      <h3>Accessing List Items</h3>
      <pre><code>first = fruits[0]  # "apple"
last = fruits[-1]  # "cherry"
slice = fruits[0:2]  # ["apple", "banana"]</code></pre>
      <h3>Modifying Lists</h3>
      <pre><code>fruits[0] = "orange"  # Change first item
fruits.append("date")  # Add item to end
fruits.remove("banana")  # Remove specific item</code></pre>
    `,
    task_id: undefined,
  },
  18: {
    id: 18,
    title: "Recursion Concepts",
    content_html: `
      <h2>Introduction to Recursion</h2>
      <p><strong>Recursion</strong> is when a function calls itself to solve a problem by breaking it down into smaller subproblems.</p>
      <h3>Key Components</h3>
      <ul>
        <li><strong>Base Case:</strong> The condition that stops the recursion</li>
        <li><strong>Recursive Case:</strong> The function calling itself with a simpler input</li>
      </ul>
      <h3>Example: Factorial</h3>
      <pre><code>def factorial(n):
    if n == 0:  # Base case
        return 1
    else:  # Recursive case
        return n * factorial(n - 1)

print(factorial(5))  # Output: 120</code></pre>
      <h3>How It Works</h3>
      <p>factorial(5) -> 5 * factorial(4) -> 5 * 4 * 3 * 2 * 1 -> 120</p>
    `,
    task_id: undefined,
  },
  21: {
    id: 21,
    title: "Nested Loops",
    content_html: `
      <h2>Nested Loops</h2>
      <p>A <strong>nested loop</strong> is a loop inside another loop. It is useful for working with grids, tables and combinations.</p>
      <h3>Example</h3>
      <pre><code>for row in range(3):
    for col in range(2):
        print(row, col)</code></pre>
      <p>The inner loop completes all of its iterations for every single outer loop iteration.</p>
      <h3>When to Use</h3>
      <ul>
        <li>Drawing patterns</li>
        <li>Traversing 2D data</li>
        <li>Comparing every item against another group</li>
      </ul>
    `,
    task_id: 9,
  },
  22: {
    id: 22,
    title: "Looping Through Strings",
    content_html: `
      <h2>Looping Through Strings</h2>
      <p>Strings are sequences, which means you can iterate through them one character at a time.</p>
      <h3>Example</h3>
      <pre><code>word = "python"
for letter in word:
    print(letter)</code></pre>
      <p>This is helpful for counting characters, validating text and building custom parsing logic.</p>
    `,
    task_id: 11,
  },
};
