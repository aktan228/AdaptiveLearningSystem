export const mockTasks = [
  {
    id: 1,
    lesson_id: 7,
    title: "Sum of Numbers Using Loop",
    description: `Write a Python function called \`sum_numbers(n)\` that takes an integer \`n\` 
and returns the sum of all numbers from 1 to n using a **for loop**.

**Requirements:**
- You MUST use a for loop (not recursion or built-in sum())
- The function must be named exactly \`sum_numbers\`
- Return the integer result

**Examples:**
- \`sum_numbers(5)\` → 15  (1+2+3+4+5)
- \`sum_numbers(10)\` → 55
- \`sum_numbers(1)\` → 1`,
    difficulty_level: "easy",
    time_limit: 300,
    tags: ["loops", "for-loop", "arithmetic"],
    starter_code: `def sum_numbers(n):
    # Write your solution here
    pass`,
  },
  {
    id: 2,
    lesson_id: 7,
    title: "Count Even Numbers",
    description: `Write a function \`count_evens(numbers)\` that takes a list of integers
and returns the count of even numbers using a **for loop**.

**Requirements:**
- Use a for loop
- Do NOT use list comprehensions or filter()

**Examples:**
- \`count_evens([1, 2, 3, 4, 6])\` → 3
- \`count_evens([1, 3, 5])\` → 0`,
    difficulty_level: "medium",
    time_limit: 300,
    tags: ["loops", "conditionals", "lists"],
    starter_code: `def count_evens(numbers):
    # Write your solution here
    pass`,
  },
];