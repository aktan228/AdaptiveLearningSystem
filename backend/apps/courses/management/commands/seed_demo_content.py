from django.core.management.base import BaseCommand
from django.db import transaction

from apps.courses.models import Lesson, Module, Tag, Task
from apps.evaluation.models import ASTRule, TestCase
from apps.hint.models import Hints


DEMO_CONTENT = [
    {
        "title": "Python Basics",
        "description": "Core Python syntax, variables, input, and output for complete beginners.",
        "order": 1,
        "tags": ["beginner", "syntax", "basics"],
        "lessons": [
            {
                "title": "Variables and Output",
                "order": 1,
                "content_html": """
                    <h2>Variables and Output</h2>
                    <p>In Python we can store values in variables and show results with <code>print()</code>.</p>
                    <p>Use meaningful variable names and keep output clean and predictable.</p>
                """,
                "tasks": {
                    "easy": {
                        "title": "Print Your Name",
                        "description": "Read one line with a name and print: Hello, NAME!",
                        "time_limit_seconds": 300,
                        "ast_rules": [],
                        "test_cases": [
                            {"input_data": "Kutman", "expected_output": "Hello, Kutman!", "order": 1},
                            {"input_data": "Aida", "expected_output": "Hello, Aida!", "order": 2},
                        ],
                        "hints": [
                            "Use input() to read the name.",
                            "Store the value in a variable before printing.",
                            "Use print() with the text Hello, followed by the name and an exclamation mark.",
                        ],
                    },
                    "medium": {
                        "title": "Sum of Two Numbers",
                        "description": "Read two integers from separate lines and print their sum.",
                        "time_limit_seconds": 300,
                        "ast_rules": [],
                        "test_cases": [
                            {"input_data": "2\n3", "expected_output": "5", "order": 1},
                            {"input_data": "10\n-4", "expected_output": "6", "order": 2},
                        ],
                        "hints": [
                            "input() returns a string, so convert values to int.",
                            "Create two variables, one for each number.",
                            "Add them and print the result.",
                        ],
                    },
                    "hard": {
                        "title": "Rectangle Info",
                        "description": "Read width and height. Print area on the first line and perimeter on the second line.",
                        "time_limit_seconds": 420,
                        "ast_rules": [],
                        "test_cases": [
                            {"input_data": "3\n5", "expected_output": "15\n16", "order": 1},
                            {"input_data": "7\n2", "expected_output": "14\n18", "order": 2},
                        ],
                        "hints": [
                            "Area is width multiplied by height.",
                            "Perimeter is 2 * (width + height).",
                            "Print the two answers on separate lines.",
                        ],
                    },
                },
            },
            {
                "title": "Working with Numbers",
                "order": 2,
                "content_html": """
                    <h2>Working with Numbers</h2>
                    <p>Python can divide, multiply, and work with remainders using arithmetic operators.</p>
                    <p>Practice converting input values and combining operations carefully.</p>
                """,
                "tasks": {
                    "easy": {
                        "title": "Double the Number",
                        "description": "Read an integer and print its double.",
                        "time_limit_seconds": 300,
                        "ast_rules": [],
                        "test_cases": [
                            {"input_data": "8", "expected_output": "16", "order": 1},
                            {"input_data": "-3", "expected_output": "-6", "order": 2},
                        ],
                        "hints": [
                            "Convert the input to int.",
                            "Multiply the number by 2.",
                            "Print the result.",
                        ],
                    },
                    "medium": {
                        "title": "Minutes to Seconds",
                        "description": "Read a number of minutes and print the same duration in seconds.",
                        "time_limit_seconds": 300,
                        "ast_rules": [],
                        "test_cases": [
                            {"input_data": "3", "expected_output": "180", "order": 1},
                            {"input_data": "15", "expected_output": "900", "order": 2},
                        ],
                        "hints": [
                            "One minute contains 60 seconds.",
                            "Multiply the given value by 60.",
                            "Print only the final integer.",
                        ],
                    },
                    "hard": {
                        "title": "Split Apples",
                        "description": "Read number of apples and number of students. Print apples per student and remainder on separate lines.",
                        "time_limit_seconds": 420,
                        "ast_rules": [],
                        "test_cases": [
                            {"input_data": "10\n3", "expected_output": "3\n1", "order": 1},
                            {"input_data": "25\n4", "expected_output": "6\n1", "order": 2},
                        ],
                        "hints": [
                            "Use integer division with //.",
                            "Use % to find the remainder.",
                            "Print the quotient first, then the remainder.",
                        ],
                    },
                },
            },
        ],
    },
    {
        "title": "Conditionals",
        "description": "Learn how to make decisions with if, elif, else, and comparisons.",
        "order": 2,
        "tags": ["conditions", "logic", "branching"],
        "lessons": [
            {
                "title": "If and Else",
                "order": 1,
                "content_html": """
                    <h2>If and Else</h2>
                    <p>Conditional statements let your program choose between actions.</p>
                    <p>Compare values and print different outputs depending on the result.</p>
                """,
                "tasks": {
                    "easy": {
                        "title": "Positive or Not",
                        "description": "Read an integer. Print Positive if it is greater than 0, otherwise print Not Positive.",
                        "time_limit_seconds": 300,
                        "ast_rules": [
                            {"construct_name": "if", "description": "Use an if statement.", "is_forbidden": False},
                        ],
                        "test_cases": [
                            {"input_data": "5", "expected_output": "Positive", "order": 1},
                            {"input_data": "-2", "expected_output": "Not Positive", "order": 2},
                        ],
                        "hints": [
                            "Compare the number with 0.",
                            "Use if for the positive case.",
                            "Use else for all other values.",
                        ],
                    },
                    "medium": {
                        "title": "Even or Odd",
                        "description": "Read an integer and print Even or Odd.",
                        "time_limit_seconds": 300,
                        "ast_rules": [
                            {"construct_name": "if", "description": "Use an if statement.", "is_forbidden": False},
                        ],
                        "test_cases": [
                            {"input_data": "12", "expected_output": "Even", "order": 1},
                            {"input_data": "7", "expected_output": "Odd", "order": 2},
                        ],
                        "hints": [
                            "Use the remainder operator %.",
                            "An even number has remainder 0 when divided by 2.",
                            "Choose between two outputs with if/else.",
                        ],
                    },
                    "hard": {
                        "title": "Largest of Two",
                        "description": "Read two integers. Print the larger value. If they are equal, print Equal.",
                        "time_limit_seconds": 420,
                        "ast_rules": [
                            {"construct_name": "if", "description": "Use conditional branching.", "is_forbidden": False},
                        ],
                        "test_cases": [
                            {"input_data": "4\n9", "expected_output": "9", "order": 1},
                            {"input_data": "8\n8", "expected_output": "Equal", "order": 2},
                        ],
                        "hints": [
                            "Compare the first number with the second number.",
                            "Handle the equal case separately.",
                            "Print only one final answer.",
                        ],
                    },
                },
            },
            {
                "title": "Elif and Ranges",
                "order": 2,
                "content_html": """
                    <h2>Elif and Ranges</h2>
                    <p>Use <code>elif</code> when you need more than two branches.</p>
                    <p>This is useful for grading systems and range-based decisions.</p>
                """,
                "tasks": {
                    "easy": {
                        "title": "Traffic Light",
                        "description": "Read a color. If it is red print Stop, if yellow print Wait, otherwise print Go.",
                        "time_limit_seconds": 300,
                        "ast_rules": [
                            {"construct_name": "if", "description": "Use conditionals.", "is_forbidden": False},
                        ],
                        "test_cases": [
                            {"input_data": "red", "expected_output": "Stop", "order": 1},
                            {"input_data": "green", "expected_output": "Go", "order": 2},
                        ],
                        "hints": [
                            "Compare the input string with expected color names.",
                            "Use elif for the second branch.",
                            "Use else for every other color.",
                        ],
                    },
                    "medium": {
                        "title": "Grade by Score",
                        "description": "Read a score from 0 to 100. Print A for 90+, B for 80+, C for 70+, otherwise D.",
                        "time_limit_seconds": 420,
                        "ast_rules": [
                            {"construct_name": "if", "description": "Use conditionals.", "is_forbidden": False},
                        ],
                        "test_cases": [
                            {"input_data": "91", "expected_output": "A", "order": 1},
                            {"input_data": "76", "expected_output": "C", "order": 2},
                            {"input_data": "54", "expected_output": "D", "order": 3},
                        ],
                        "hints": [
                            "Check the highest score range first.",
                            "Use elif for the middle ranges.",
                            "If none match, print D.",
                        ],
                    },
                    "hard": {
                        "title": "Leap Year Check",
                        "description": "Read a year. Print Leap if the year is divisible by 400, or divisible by 4 but not by 100. Otherwise print Common.",
                        "time_limit_seconds": 600,
                        "ast_rules": [
                            {"construct_name": "if", "description": "Use conditionals.", "is_forbidden": False},
                        ],
                        "test_cases": [
                            {"input_data": "2000", "expected_output": "Leap", "order": 1},
                            {"input_data": "1900", "expected_output": "Common", "order": 2},
                            {"input_data": "2024", "expected_output": "Leap", "order": 3},
                        ],
                        "hints": [
                            "A year divisible by 400 is always leap.",
                            "Years divisible by 100 are special and can break the rule.",
                            "Use logical operators to combine conditions.",
                        ],
                    },
                },
            },
        ],
    },
    {
        "title": "Loops",
        "description": "Practice repetition with for loops, while loops, and nested loops.",
        "order": 3,
        "tags": ["loops", "iteration", "practice"],
        "lessons": [
            {
                "title": "For Loops",
                "order": 1,
                "content_html": """
                    <h2>For Loops</h2>
                    <p><code>for</code> loops repeat code a fixed number of times or over a sequence.</p>
                    <p>They are great for counting, summing, and printing repeated patterns.</p>
                """,
                "tasks": {
                    "easy": {
                        "title": "Print 1 to N",
                        "description": "Read an integer N and print all numbers from 1 to N, each on a new line.",
                        "time_limit_seconds": 420,
                        "ast_rules": [
                            {"construct_name": "for", "description": "Use a for loop.", "is_forbidden": False},
                        ],
                        "test_cases": [
                            {"input_data": "3", "expected_output": "1\n2\n3", "order": 1},
                            {"input_data": "1", "expected_output": "1", "order": 2},
                        ],
                        "hints": [
                            "Use range to generate numbers.",
                            "range(1, n + 1) includes N.",
                            "Print inside the loop.",
                        ],
                    },
                    "medium": {
                        "title": "Sum from 1 to N",
                        "description": "Read N and print the sum of all integers from 1 to N.",
                        "time_limit_seconds": 420,
                        "ast_rules": [
                            {"construct_name": "for", "description": "Use a for loop.", "is_forbidden": False},
                        ],
                        "test_cases": [
                            {"input_data": "5", "expected_output": "15", "order": 1},
                            {"input_data": "10", "expected_output": "55", "order": 2},
                        ],
                        "hints": [
                            "Create an accumulator variable like total = 0.",
                            "Loop from 1 to N.",
                            "Add each number to total and print total at the end.",
                        ],
                    },
                    "hard": {
                        "title": "Multiplication Table Row",
                        "description": "Read N and print the first 10 multiples of N, each on a new line.",
                        "time_limit_seconds": 600,
                        "ast_rules": [
                            {"construct_name": "for", "description": "Use a for loop.", "is_forbidden": False},
                        ],
                        "test_cases": [
                            {"input_data": "3", "expected_output": "3\n6\n9\n12\n15\n18\n21\n24\n27\n30", "order": 1},
                            {"input_data": "1", "expected_output": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10", "order": 2},
                        ],
                        "hints": [
                            "You need numbers from 1 to 10.",
                            "Multiply N by the current loop counter.",
                            "Print each product immediately.",
                        ],
                    },
                },
            },
            {
                "title": "While and Nested Loops",
                "order": 2,
                "content_html": """
                    <h2>While and Nested Loops</h2>
                    <p><code>while</code> loops run while a condition remains true.</p>
                    <p>Nested loops help create grids and repeated line patterns.</p>
                """,
                "tasks": {
                    "easy": {
                        "title": "Countdown",
                        "description": "Read N and print numbers from N down to 1 using a while loop.",
                        "time_limit_seconds": 420,
                        "ast_rules": [
                            {"construct_name": "while", "description": "Use a while loop.", "is_forbidden": False},
                            {"construct_name": "for", "description": "Do not use a for loop.", "is_forbidden": True},
                        ],
                        "test_cases": [
                            {"input_data": "4", "expected_output": "4\n3\n2\n1", "order": 1},
                            {"input_data": "1", "expected_output": "1", "order": 2},
                        ],
                        "hints": [
                            "Start with the given number.",
                            "Continue while the number is at least 1.",
                            "Decrease the variable on each step.",
                        ],
                    },
                    "medium": {
                        "title": "Factorial",
                        "description": "Read N and print N! using a loop.",
                        "time_limit_seconds": 600,
                        "ast_rules": [
                            {"construct_name": "while", "description": "Use a while loop.", "is_forbidden": False},
                        ],
                        "test_cases": [
                            {"input_data": "4", "expected_output": "24", "order": 1},
                            {"input_data": "6", "expected_output": "720", "order": 2},
                        ],
                        "hints": [
                            "Factorial is a product, so start with 1.",
                            "Multiply the accumulator by each number from 1 to N.",
                            "A while loop with a counter works well here.",
                        ],
                    },
                    "hard": {
                        "title": "Square of Stars",
                        "description": "Read N and print an N by N square made of the * character.",
                        "time_limit_seconds": 600,
                        "ast_rules": [
                            {"construct_name": "nested_loop", "description": "Use nested loops.", "is_forbidden": False},
                        ],
                        "test_cases": [
                            {"input_data": "2", "expected_output": "**\n**", "order": 1},
                            {"input_data": "3", "expected_output": "***\n***\n***", "order": 2},
                        ],
                        "hints": [
                            "You need to print N rows.",
                            "Each row contains N stars.",
                            "One loop handles rows, the inner loop or string multiplication handles columns.",
                        ],
                    },
                },
            },
        ],
    },
]


RICH_LESSON_CONTENT = {
    "Variables and Output": """
        <h2>What you are learning</h2>
        <p>In this lesson you learn how to read simple input, store values in variables, and print a clear final answer.</p>
        <p>This is one of the most important foundations in Python: almost every future task will ask you to read data, transform it, and show the result.</p>
        <h3>Main ideas</h3>
        <ul>
            <li><strong>input()</strong> reads text from the user.</li>
            <li>A <strong>variable</strong> stores a value so you can reuse it later.</li>
            <li><strong>print()</strong> shows the final result exactly in the format the task expects.</li>
        </ul>
        <h3>How to think while solving</h3>
        <p>Before writing code, answer three small questions:</p>
        <ul>
            <li>What values do I need to read?</li>
            <li>Do I need to convert them to numbers?</li>
            <li>What exactly must be printed at the end?</li>
        </ul>
        <h3>Mini example</h3>
        <pre><code>name = input()
print(f"Hello, {name}!")</code></pre>
        <p>Notice that the solution is short, but it still has a clear structure: read data first, then print the answer.</p>
    """,
    "Working with Numbers": """
        <h2>What you are learning</h2>
        <p>This lesson focuses on arithmetic in Python: addition, multiplication, integer division, and remainder.</p>
        <p>The goal is not only to get the right number, but to understand which operation matches the problem statement.</p>
        <h3>Main operators</h3>
        <ul>
            <li><code>+</code> for addition</li>
            <li><code>*</code> for multiplication</li>
            <li><code>//</code> for integer division</li>
            <li><code>%</code> for remainder</li>
        </ul>
        <h3>Typical mistakes</h3>
        <ul>
            <li>Forgetting to convert input from string to integer</li>
            <li>Using <code>/</code> instead of <code>//</code> when the answer must be whole</li>
            <li>Printing extra text when the task expects only a number</li>
        </ul>
        <h3>How to approach tasks</h3>
        <p>Read the task and translate every sentence into an action. If the task says “per student”, think about division. If it says “left over”, think about remainder.</p>
    """,
    "If and Else": """
        <h2>What you are learning</h2>
        <p>Programs are useful when they can make decisions. In Python, we do that with <code>if</code>, <code>elif</code>, and <code>else</code>.</p>
        <p>This lesson is about checking a condition and choosing the correct branch.</p>
        <h3>Decision-making pattern</h3>
        <pre><code>if condition:
    # action A
else:
    # action B</code></pre>
        <h3>What to pay attention to</h3>
        <ul>
            <li>Every condition must be a true/false question.</li>
            <li>Indentation matters. Python uses indentation to define blocks.</li>
            <li>Think about all cases, not just the first one.</li>
        </ul>
        <h3>Solving strategy</h3>
        <p>First identify the condition, then decide what should happen when it is true and when it is false. Write the simplest correct branch structure you can.</p>
    """,
    "Elif and Ranges": """
        <h2>What you are learning</h2>
        <p>Sometimes two branches are not enough. When a task has several categories or ranges, use <code>elif</code> to check them in order.</p>
        <h3>Important rule</h3>
        <p>Check the most specific or highest-priority case first. This avoids matching the wrong branch too early.</p>
        <h3>Example pattern</h3>
        <pre><code>if score &gt;= 90:
    print("A")
elif score &gt;= 80:
    print("B")
else:
    print("C")</code></pre>
        <h3>What can go wrong</h3>
        <ul>
            <li>Checking ranges in the wrong order</li>
            <li>Forgetting the final fallback case</li>
            <li>Using separate <code>if</code> blocks instead of one chain when only one answer should be printed</li>
        </ul>
    """,
    "For Loops": """
        <h2>What you are learning</h2>
        <p><code>for</code> loops are the standard tool when you know how many times something should repeat.</p>
        <p>You will use them for counting, summing, generating tables, and processing sequences.</p>
        <h3>Core pattern</h3>
        <pre><code>for i in range(1, n + 1):
    print(i)</code></pre>
        <h3>How to reason about a loop</h3>
        <ul>
            <li>What is the start value?</li>
            <li>What is the end value?</li>
            <li>What should happen on each iteration?</li>
        </ul>
        <h3>Common mistakes</h3>
        <ul>
            <li>Forgetting that the end of <code>range</code> is excluded</li>
            <li>Printing outside the loop when the action should repeat</li>
            <li>Using the wrong loop bounds</li>
        </ul>
    """,
    "While and Nested Loops": """
        <h2>What you are learning</h2>
        <p><code>while</code> loops are useful when repetition should continue until a condition becomes false.</p>
        <p>Nested loops help when one repetition happens inside another, for example rows and columns in a square.</p>
        <h3>While loop mindset</h3>
        <ul>
            <li>Set the starting state</li>
            <li>Write the loop condition</li>
            <li>Update the variable so the loop can finish</li>
        </ul>
        <h3>Nested loop mindset</h3>
        <p>Usually the outer loop controls rows and the inner loop controls what appears inside each row.</p>
        <h3>Typical bugs</h3>
        <ul>
            <li>Forgetting to change the counter inside the while loop</li>
            <li>Creating an infinite loop</li>
            <li>Mixing row logic and column logic in nested loops</li>
        </ul>
    """,
}


RICH_TASK_DESCRIPTIONS = {
    "Print Your Name": """
        **Goal**
        Read one line containing a person's name and greet them.

        **What to do**
        Save the input into a variable and print exactly: Hello, NAME!

        **Input**
        One line with a single name.

        **Output**
        Print one line in the exact format shown above.

        **Example**
        Input: Kutman
        Output: Hello, Kutman!
    """,
    "Sum of Two Numbers": """
        **Goal**
        Practice reading multiple values and converting them to integers.

        **What to do**
        Read two integers from separate lines and print only their sum.

        **Input**
        First line: first integer.
        Second line: second integer.

        **Output**
        One integer equal to the sum of the two values.
    """,
    "Rectangle Info": """
        **Goal**
        Combine two formulas in one short program.

        **What to do**
        Read width and height. On the first line print the area. On the second line print the perimeter.

        **Input**
        Two integers: width and height, each on a separate line.

        **Output**
        Line 1: area
        Line 2: perimeter

        **Remember**
        Area = width * height
        Perimeter = 2 * (width + height)
    """,
    "Double the Number": """
        **Goal**
        Get comfortable with the simplest arithmetic transformation.

        **What to do**
        Read one integer and print its doubled value.

        **Input**
        One integer.

        **Output**
        One integer equal to input * 2.
    """,
    "Minutes to Seconds": """
        **Goal**
        Translate a real-life unit conversion into code.

        **What to do**
        Read the number of minutes and print how many seconds that is.

        **Input**
        One integer representing minutes.

        **Output**
        One integer representing seconds.
    """,
    "Split Apples": """
        **Goal**
        Use integer division and remainder in the same task.

        **What to do**
        Read the number of apples and the number of students. Print how many apples each student gets, then print how many apples remain.

        **Input**
        Line 1: number of apples
        Line 2: number of students

        **Output**
        Line 1: apples per student
        Line 2: remainder
    """,
    "Positive or Not": """
        **Goal**
        Make your first decision with an if/else branch.

        **What to do**
        Read an integer. If it is greater than 0, print Positive. Otherwise print Not Positive.

        **Input**
        One integer.

        **Output**
        One of two exact strings:
        Positive
        Not Positive
    """,
    "Even or Odd": """
        **Goal**
        Decide between two answers using the remainder operator.

        **What to do**
        Read an integer and determine whether it is even or odd.

        **Input**
        One integer.

        **Output**
        Print Even if the number is divisible by 2, otherwise print Odd.
    """,
    "Largest of Two": """
        **Goal**
        Compare two values and cover the equality case correctly.

        **What to do**
        Read two integers. Print the larger value. If both are equal, print Equal.

        **Input**
        Two integers on separate lines.

        **Output**
        Either the larger number or the word Equal.
    """,
    "Traffic Light": """
        **Goal**
        Practice multiple branches with string input.

        **What to do**
        Read a color. If it is red, print Stop. If it is yellow, print Wait. For every other color, print Go.

        **Input**
        One line with a color name.

        **Output**
        One of:
        Stop
        Wait
        Go
    """,
    "Grade by Score": """
        **Goal**
        Work with ordered ranges using if/elif/else.

        **What to do**
        Read a score from 0 to 100 and print the grade:
        A for 90 and above
        B for 80 and above
        C for 70 and above
        D otherwise

        **Important**
        Check the highest ranges first.
    """,
    "Leap Year Check": """
        **Goal**
        Solve a task with combined logical conditions.

        **What to do**
        Read a year and print Leap if:
        - it is divisible by 400
        OR
        - it is divisible by 4 but not by 100

        Otherwise print Common.

        **Output**
        Print only Leap or Common.
    """,
    "Print 1 to N": """
        **Goal**
        Learn the basic structure of a counting loop.

        **What to do**
        Read N and print every integer from 1 up to N, each on its own line.

        **Input**
        One integer N.

        **Output**
        A vertical list of numbers from 1 to N.
    """,
    "Sum from 1 to N": """
        **Goal**
        Combine a loop with an accumulator variable.

        **What to do**
        Read N, add all integers from 1 to N, and print the final sum.

        **Input**
        One integer N.

        **Output**
        One integer equal to 1 + 2 + ... + N.
    """,
    "Multiplication Table Row": """
        **Goal**
        Use a loop to generate a full sequence of related results.

        **What to do**
        Read N and print the first 10 multiples of N, each on a separate line.

        **Input**
        One integer N.

        **Output**
        10 lines: N*1, N*2, ..., N*10.
    """,
    "Countdown": """
        **Goal**
        Practice a while loop with a decreasing counter.

        **What to do**
        Read N and print numbers from N down to 1.

        **Important restriction**
        Use a while loop.
        Do not use a for loop.
    """,
    "Factorial": """
        **Goal**
        Build a multiplicative loop solution.

        **What to do**
        Read N and print N! which means:
        1 * 2 * 3 * ... * N

        **Input**
        One integer N.

        **Output**
        The factorial of N.
    """,
    "Square of Stars": """
        **Goal**
        Understand when nested repetition is needed.

        **What to do**
        Read N and print a square of stars with N rows and N columns.

        **Input**
        One integer N.

        **Output**
        An N by N block made of the * symbol.

        **Example for N = 3**
        ***
        ***
        ***
    """,
}


for module_data in DEMO_CONTENT:
    for lesson_data in module_data["lessons"]:
        lesson_title = lesson_data["title"]
        if lesson_title in RICH_LESSON_CONTENT:
            lesson_data["content_html"] = RICH_LESSON_CONTENT[lesson_title].strip()

        for task_data in lesson_data["tasks"].values():
            task_title = task_data["title"]
            if task_title in RICH_TASK_DESCRIPTIONS:
                task_data["description"] = RICH_TASK_DESCRIPTIONS[task_title].strip()


class Command(BaseCommand):
    help = "Seed demo modules, lessons, tasks, hints, AST rules, and test cases."

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset-demo",
            action="store_true",
            help="Delete existing demo modules with the same titles before seeding.",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        module_titles = [module["title"] for module in DEMO_CONTENT]

        if options["reset_demo"]:
            deleted_count, _ = Module.objects.filter(title__in=module_titles).delete()
            self.stdout.write(self.style.WARNING(f"Deleted {deleted_count} existing demo records."))

        created_modules = 0
        created_lessons = 0
        created_tasks = 0

        for module_data in DEMO_CONTENT:
            module, module_created = Module.objects.update_or_create(
                title=module_data["title"],
                defaults={
                    "description": module_data["description"],
                    "order": module_data["order"],
                },
            )
            created_modules += int(module_created)

            tags = [Tag.objects.get_or_create(title=tag_title)[0] for tag_title in module_data["tags"]]
            module.tags.set(tags)

            for lesson_data in module_data["lessons"]:
                lesson, lesson_created = Lesson.objects.update_or_create(
                    module=module,
                    order=lesson_data["order"],
                    defaults={
                        "title": lesson_data["title"],
                        "content_html": lesson_data["content_html"].strip(),
                    },
                )
                created_lessons += int(lesson_created)

                for difficulty, task_data in lesson_data["tasks"].items():
                    task, task_created = Task.objects.update_or_create(
                        lesson=lesson,
                        difficulty_level=difficulty,
                        defaults={
                            "title": task_data["title"],
                            "description": task_data["description"],
                            "time_limit_seconds": task_data["time_limit_seconds"],
                        },
                    )
                    created_tasks += int(task_created)

                    task.test_cases.all().delete()
                    task.ast_rules.all().delete()
                    task.hints.all().delete()

                    for index, rule in enumerate(task_data["ast_rules"], start=1):
                        ASTRule.objects.create(
                            task=task,
                            construct_name=rule["construct_name"],
                            description=rule["description"],
                            is_forbidden=rule["is_forbidden"],
                        )

                    for test_case in task_data["test_cases"]:
                        TestCase.objects.create(
                            task=task,
                            input_data=test_case["input_data"],
                            expected_output=test_case["expected_output"],
                            is_hidden=test_case.get("is_hidden", False),
                            order=test_case["order"],
                        )

                    for level, hint_content in enumerate(task_data["hints"], start=1):
                        Hints.objects.create(
                            task=task,
                            level=level,
                            content=hint_content,
                        )

        self.stdout.write(self.style.SUCCESS("Demo learning content is ready."))
        self.stdout.write(
            f"Modules: {Module.objects.filter(title__in=module_titles).count()}, "
            f"new modules: {created_modules}, new lessons: {created_lessons}, new tasks: {created_tasks}"
        )
