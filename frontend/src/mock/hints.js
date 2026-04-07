export const mockHints = {
  1: [
    { level: 1, content: "Think about how to initialize a variable to store the running total before the loop starts." },
    { level: 2, content: "Use range(1, n+1) to generate numbers from 1 to n. Add each number to your total variable inside the loop." },
    { level: 3, content: `Here is the pseudocode structure:
total = 0
for i in range(1, n+1):
    total = total + i
return total` },
  ],
  2: [
    { level: 1, content: "You need a counter variable that increases every time you find an even number." },
    { level: 2, content: "Use the modulo operator (%) to check if a number is even: if num % 2 == 0, it is even." },
    { level: 3, content: `Pseudocode:
count = 0
for num in numbers:
    if num % 2 == 0:
        count = count + 1
return count` },
  ],
};