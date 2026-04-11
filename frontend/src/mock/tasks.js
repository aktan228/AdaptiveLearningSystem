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
- \`sum_numbers(5)\` -> 15  (1+2+3+4+5)
- \`sum_numbers(10)\` -> 55
- \`sum_numbers(1)\` -> 1`,
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
- \`count_evens([1, 2, 3, 4, 6])\` -> 3
- \`count_evens([1, 3, 5])\` -> 0`,
    difficulty_level: "medium",
    time_limit: 300,
    tags: ["loops", "conditionals", "lists"],
    starter_code: `def count_evens(numbers):
    # Write your solution here
    pass`,
  },
  {
    id: 3,
    lesson_id: 7,
    title: "Build a Number Triangle",
    description: `Write a function \`number_triangle(n)\` that returns a list of strings.
Each string should represent one row of a triangle built with increasing numbers.

**Requirements:**
- Use one or more **for loops**
- Row 1 should be \`"1"\`
- Row 2 should be \`"12"\`
- Continue this pattern until \`n\`

**Example:**
- \`number_triangle(4)\` returns \`["1", "12", "123", "1234"]\``,
    difficulty_level: "hard",
    time_limit: 900,
    tags: ["loops", "patterns", "strings"],
    starter_code: `def number_triangle(n):
    # Write your solution here
    pass`,
  },
  {
    id: 4,
    lesson_id: 8,
    title: "Countdown Until Zero",
    description: `Write a function \`countdown(n)\` that uses a **while loop**
to build a list counting down from \`n\` to \`0\`.

**Requirements:**
- Use a while loop
- Return the final list

**Example:**
- \`countdown(3)\` returns \`[3, 2, 1, 0]\``,
    difficulty_level: "easy",
    time_limit: 300,
    tags: ["while-loop", "lists", "basics"],
    starter_code: `def countdown(n):
    # Write your solution here
    pass`,
  },
  {
    id: 5,
    lesson_id: 8,
    title: "Repeat Word by Limit",
    description: `Write a function \`repeat_word(word, limit)\` that uses a **while loop**
to return a list containing \`word\` exactly \`limit\` times.

**Requirements:**
- Use a while loop
- Do not use list multiplication

**Example:**
- \`repeat_word("hi", 3)\` returns \`["hi", "hi", "hi"]\``,
    difficulty_level: "medium",
    time_limit: 420,
    tags: ["while-loop", "lists", "control"],
    starter_code: `def repeat_word(word, limit):
    # Write your solution here
    pass`,
  },
  {
    id: 6,
    lesson_id: 8,
    title: "Password Retry Tracker",
    description: `Write a function \`count_attempts(attempts)\` that processes a list of password attempts
using a **while loop** and returns the number of tries made before the correct password \`"python123"\` appears.

**Requirements:**
- Use a while loop
- Stop once the correct password is found
- If it never appears, return the total number of attempts

**Example:**
- \`count_attempts(["qwe", "abc", "python123", "extra"])\` returns \`3\``,
    difficulty_level: "hard",
    time_limit: 780,
    tags: ["while-loop", "search", "control-flow"],
    starter_code: `def count_attempts(attempts):
    # Write your solution here
    pass`,
  },
  {
    id: 7,
    lesson_id: 9,
    title: "Skip Multiples of Three",
    description: `Write a function \`skip_multiples(limit)\` that returns numbers from 1 to \`limit\`
but skips values divisible by 3 using **continue**.

**Requirements:**
- Use a for loop
- Use continue

**Example:**
- \`skip_multiples(7)\` returns \`[1, 2, 4, 5, 7]\``,
    difficulty_level: "easy",
    time_limit: 360,
    tags: ["continue", "for-loop", "filtering"],
    starter_code: `def skip_multiples(limit):
    # Write your solution here
    pass`,
  },
  {
    id: 8,
    lesson_id: 9,
    title: "Find First Vowel",
    description: `Write a function \`find_first_vowel(text)\` that scans a string
and returns the first vowel it finds using a loop and **break**.

**Requirements:**
- Use a loop
- Use break when a vowel is found
- Return \`None\` if no vowel exists

**Example:**
- \`find_first_vowel("sky")\` returns \`None\`
- \`find_first_vowel("track")\` returns \`"a"\``,
    difficulty_level: "medium",
    time_limit: 480,
    tags: ["break", "strings", "search"],
    starter_code: `def find_first_vowel(text):
    # Write your solution here
    pass`,
  },
  {
    id: 9,
    lesson_id: 21,
    title: "Grid Coordinates",
    description: `Write a function \`grid_coordinates(rows, cols)\` that returns all coordinates
of a grid using **nested loops**.

**Requirements:**
- Use nested loops
- Return a list of tuples in row-major order

**Example:**
- \`grid_coordinates(2, 3)\` returns \`[(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)]\``,
    difficulty_level: "hard",
    time_limit: 900,
    tags: ["nested-loops", "tuples", "grids"],
    starter_code: `def grid_coordinates(rows, cols):
    # Write your solution here
    pass`,
  },
  {
    id: 10,
    lesson_id: 21,
    title: "Multiplication Table Rows",
    description: `Write a function \`table_rows(n)\` that returns a list of rows for a multiplication table
from 1 to \`n\` using nested loops.

**Requirements:**
- Use nested loops
- Each row should be a list

**Example:**
- \`table_rows(3)\` returns \`[[1, 2, 3], [2, 4, 6], [3, 6, 9]]\``,
    difficulty_level: "medium",
    time_limit: 600,
    tags: ["nested-loops", "tables", "lists"],
    starter_code: `def table_rows(n):
    # Write your solution here
    pass`,
  },
  {
    id: 11,
    lesson_id: 22,
    title: "Count Uppercase Letters",
    description: `Write a function \`count_uppercase(text)\` that loops through a string
and counts how many uppercase English letters it contains.

**Requirements:**
- Use a loop
- Return the count as an integer

**Example:**
- \`count_uppercase("PyLearnRocks")\` returns \`2\``,
    difficulty_level: "easy",
    time_limit: 300,
    tags: ["strings", "loops", "counting"],
    starter_code: `def count_uppercase(text):
    # Write your solution here
    pass`,
  },
  {
    id: 12,
    lesson_id: 22,
    title: "Character Frequency Builder",
    description: `Write a function \`char_frequency(text)\` that loops through a string
and returns a dictionary showing how many times each character appears.

**Requirements:**
- Use a loop
- Build the dictionary manually

**Example:**
- \`char_frequency("level")\` returns \`{"l": 2, "e": 2, "v": 1}\``,
    difficulty_level: "medium",
    time_limit: 540,
    tags: ["strings", "dict", "counting"],
    starter_code: `def char_frequency(text):
    # Write your solution here
    pass`,
  },
];
