"""CS701 - the code of the course: every program the Java Level 1 guide has
students write, day by day, and every change it makes to them.

Kept apart from course.py because it is the one part that has to compile.
course.py imports OPS and attaches each week's list to its week; nothing else
lives here. test/check_checkpoints.py compiles every checkpoint and runs it.

A program is one file, and one file is one block: its first op ADDs the whole
program as the guide first writes it, and every later change is a SET of the
program as it stands after that change. build.py diffs the two, so only the
lines that really change turn green. Most programs are typed once. The ones
the guide keeps coming back to - Task 1-1 becoming Task 1-2, the shopping list,
Wordle - are SET again at each step.

Names are whole words, including in the code students type. Where the guide
wrote score1, numOfDay, str1, sc, i and j, this writes firstScore, dayNumber,
firstWord, input, index and row.
"""


def ADD(filename, block, lines):
    return ("add", filename, block, lines)


def SET(filename, block, lines):
    return ("set", filename, block, lines)


def code(level, *lines):
    """Lines at a depth. Nesting inside the block is written into the strings."""
    return [("    " * level + line) if line else "" for line in lines]


def program(name, body, imports=(), methods=(), header=(), fields=()):
    """One whole program: a class with a main method, `body` inside main
    (already indented from main's level), then any methods after main."""
    lines = list(header)
    lines += [f"import {name_};" for name_ in imports]
    if imports:
        lines.append("")
    lines.append(f"public class {name} {{")
    lines += code(1, *fields)
    lines += code(1, "public static void main(String[] args) {")
    lines += code(2, *body)
    lines += code(1, "}")
    for method in methods:
        lines.append("")
        lines += code(1, *method)
    lines.append("}")
    return lines


BLOCK = "program"


def ADDP(name, *args, **kwargs):
    return ADD(f"{name}.java", BLOCK, program(name, *args, **kwargs))


def SETP(name, *args, **kwargs):
    return SET(f"{name}.java", BLOCK, program(name, *args, **kwargs))


SCANNER = "Scanner input = new Scanner(System.in);"


# ---- week 1 - Day 1, first half ---------------------------------------------

MY_NAME_COMMENT = ["// Prints my name and my friend's name"]

WEEK_1 = [
    ADDP("HelloWorld", ['System.out.println("Hello world!");']),
    ADDP("MyName", [
        'System.out.println("My name is Joshua");',
        'System.out.println("My friend\'s name is Sarah");',
    ]),
    SETP("MyName", [
        'System.out.println("My name is Joshua");',
        'System.out.println("My friend\'s name is Sarah");',
    ], header=MY_NAME_COMMENT),
    SETP("MyName", [
        'String myName = "Joshua";',
        'String friendName = "Sarah";',
        'System.out.println("My name is " + myName);',
        'System.out.println("My friend\'s name is " + friendName);',
    ], header=MY_NAME_COMMENT),
    ADDP("Primitives", [
        "int age = 15;",
        "double height = 1.75;",
        "char initial = 'A';",
        "boolean isStudent = true;",
        'System.out.println("age is: " + age);',
        'System.out.println("height is: " + height);',
        'System.out.println("initial is: " + initial);',
        'System.out.println("isStudent is: " + isStudent);',
    ]),
    SETP("Primitives", [
        "int age = 15;",
        "double height = 1.75;",
        "char initial = 'A';",
        "boolean isStudent = true;",
        'System.out.println("age is: " + age);',
        'System.out.println("height is: " + height);',
        'System.out.println("initial is: " + initial);',
        'System.out.println("isStudent is: " + isStudent);',
        "age = 17;",
        'System.out.println("age is: " + age);',
    ]),
]


# ---- week 2 - Day 1, second half --------------------------------------------

WEEK_2 = [
    ADDP("HoursInDay", ['System.out.println("There are 24 hours in a day");']),
    SETP("HoursInDay", [
        "int hoursInDay = 24;",
        'System.out.println("There are " + hoursInDay + " hours in a day");',
    ]),
    SETP("HoursInDay", [
        "int hoursInDay = 24;",
        "int numberOfDays = 7;",
        'System.out.println("There are " + hoursInDay + " hours in a day");',
        'System.out.println("There are " + hoursInDay * numberOfDays + " hours in " + numberOfDays + " days");',
    ]),
    ADDP("HoursInWeek", [
        "final int HOURS_IN_DAY = 24;",
        "final int NUMBER_OF_DAYS = 7;",
        "int totalHours = HOURS_IN_DAY * NUMBER_OF_DAYS;",
        'System.out.println("There are " + totalHours + " hours in " + NUMBER_OF_DAYS + " days");',
    ]),
    ADDP("MysteryNumber", [
        "int mysteryNumber = ((10 * 3) / 5) - 2;",
        'System.out.println("Mystery number is " + mysteryNumber);',
    ]),
    ADDP("Counter", [
        "int counter = 0;",
        "System.out.println(counter);",
        "counter = counter + 1;",
        "System.out.println(counter);",
        "counter += 1;",
        "System.out.println(counter);",
        "counter++;",
        "System.out.println(counter);",
        "counter--;",
        "System.out.println(counter);",
    ]),
]


# ---- week 3 - Day 2 -----------------------------------------------------------

def scores(average_line):
    return [
        "double firstScore = 20.30;",
        "double secondScore = 33.10;",
        "double thirdScore = 10.00;",
        'System.out.println("firstScore = " + firstScore);',
        'System.out.println("secondScore = " + secondScore);',
        'System.out.println("thirdScore = " + thirdScore);',
        "double average = (firstScore + secondScore + thirdScore) / 3;",
        average_line,
    ]


def legal_age(stage):
    body = [
        SCANNER,
        "boolean legalAge = false;",
        'System.out.print("Enter your age: ");',
        "int userAge = input.nextInt();",
    ]
    if stage >= 2:
        body += [
            "if (userAge >= 19) {",
            "    legalAge = true;",
            '    System.out.println("The user is of legal age");',
        ]
        if stage >= 3:
            body += [
                "} else if (userAge == 18) {",
                '    System.out.println("The user is allowed to apply for a credit card");',
            ]
        body += [
            "} else {",
            '    System.out.println("The user is a minor");',
            "}",
            "if (legalAge) {",
            ('    System.out.println("The user is allowed to vote and apply for a credit card");'
             if stage >= 3 else '    System.out.println("The user is allowed to vote");'),
            "}",
        ]
    return body


def registration(stage):
    body = [
        SCANNER,
        'System.out.print("Please enter the student\'s mark (0-100): ");',
        "int mark = input.nextInt();",
        "if (mark >= 70) {",
        '    System.out.print("Has the student paid tuition? (Y/N): ");',
        "    String tuitionAnswer = input.next();",
    ]
    if stage >= 2:
        body += [
            '    if (tuitionAnswer.equals("y") || tuitionAnswer.equals("Y")) {',
            '        System.out.println("You may register for the course.");',
        ]
        if stage >= 3:
            # Two edits, the way a student makes them: the else becomes an
            # else-if first, then a new else goes on the end. Written as one
            # change, the old else pairs with the new one and the student is
            # told to delete and retype the tuition line.
            body += [
                '    } else if (tuitionAnswer.equals("n") || tuitionAnswer.equals("N")) {',
                '        System.out.println("You need to pay tuition first.");',
            ]
            if stage >= 4:
                body += [
                    "    } else {",
                    '        System.out.println("Invalid answer. It should be Y or N.");',
                ]
            body += ["    }"]
        else:
            body += [
                "    } else {",
                '        System.out.println("You need to pay tuition first.");',
                "    }",
            ]
    body += [
        "} else {",
        '    System.out.println("You are not eligible for registration.");',
        "}",
    ]
    return body


GRADES = [("F", None, 25), ("E", 25, 45), ("D", 45, 50), ("C", 50, 60), ("B", 60, 80)]


def student_grading():
    body = [
        SCANNER,
        'System.out.print("Enter your mark: ");',
        "int mark = input.nextInt();",
        'String grade = "Not a correct mark";',
        "if (mark >= 0 && mark < 25) {",
        '    grade = "F";',
    ]
    for letter, low, high in GRADES[1:]:
        body += [f"}} else if (mark >= {low} && mark < {high}) {{", f'    grade = "{letter}";']
    body += [
        "} else if (mark >= 80 && mark <= 100) {",
        '    grade = "A";',
        "}",
        'System.out.println("Your grade is: " + grade);',
    ]
    return body


WEEK_3 = [
    ADDP("Scores", scores('System.out.println("Average score = " + average);')),
    SETP("Scores", scores('System.out.println("Average score = " + (int) average);')),
    ADDP("LegalAge", legal_age(1), imports=["java.util.Scanner"]),
    SETP("LegalAge", legal_age(2), imports=["java.util.Scanner"]),
    SETP("LegalAge", legal_age(3), imports=["java.util.Scanner"]),
    ADDP("StudentGrading", student_grading(), imports=["java.util.Scanner"]),
    ADDP("Registration", registration(1), imports=["java.util.Scanner"]),
]


# ---- week 4 - Day 3 -----------------------------------------------------------

DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]


def day_of_week(fixed):
    body = [
        SCANNER,
        'System.out.print("Enter a number (1-7): ");',
        "int dayNumber = input.nextInt();",
        'String day = " is not a day of the week";',
    ]
    for number, name in enumerate(DAYS, start=1):
        opener = "if" if number == 1 else "} else if"
        body += [f"{opener} (dayNumber == {number}) {{", f'    day = "{name}";']
    body += [
        "}",
        "if (dayNumber >= 1 && dayNumber <= 7) {" if fixed else "if (dayNumber <= 7) {",
        '    System.out.println(day + " is day " + dayNumber + " of the week");',
        "} else {",
        "    System.out.println(dayNumber + day);",
        "}",
    ]
    return body


def month_name():
    body = [
        SCANNER,
        'System.out.print("Enter a number (1-12) for the month: ");',
        "int monthNumber = input.nextInt();",
        'String month = "";',
        "switch (monthNumber) {",
    ]
    for number, name in enumerate(MONTHS, start=1):
        body += [f"    case {number}:", f'        month = "{name}";', "        break;"]
    body += [
        "    default:",
        '        month = " is not a month";',
        "        break;",
        "}",
        "if (monthNumber >= 1 && monthNumber <= 12) {",
        '    System.out.println(month + " is month " + monthNumber);',
        "} else {",
        "    System.out.println(monthNumber + month);",
        "}",
    ]
    return body


BETTER_REGISTRATION = [
    SCANNER,
    'System.out.print("Please enter the student\'s mark (0-100): ");',
    "int mark = input.nextInt();",
    "boolean isValidMark = false;",
    "if (mark >= 70 && mark <= 100) {",
    "    isValidMark = true;",
    "}",
    "boolean isTuitionPaid = false;",
    'System.out.print("Has the student paid tuition? (Y/N): ");',
    "String tuitionAnswer = input.next();",
    'if (tuitionAnswer.equals("y") || tuitionAnswer.equals("Y")) {',
    "    isTuitionPaid = true;",
    "}",
    "if (!isValidMark || !isTuitionPaid) {",
    '    System.out.println("The student is not allowed to register.");',
    "} else {",
    '    System.out.println("The student may register for the course.");',
    "}",
]

WEEK_4 = [
    SETP("Registration", registration(2), imports=["java.util.Scanner"]),
    SETP("Registration", registration(3), imports=["java.util.Scanner"]),
    SETP("Registration", registration(4), imports=["java.util.Scanner"]),
    ADDP("DayOfWeek", day_of_week(False), imports=["java.util.Scanner"]),
    SETP("DayOfWeek", day_of_week(True), imports=["java.util.Scanner"]),
    ADDP("MonthName", month_name(), imports=["java.util.Scanner"]),
    ADDP("BetterRegistration", BETTER_REGISTRATION, imports=["java.util.Scanner"]),
]


# ---- week 5 - Day 4 -----------------------------------------------------------

def random_numbers(plus_one):
    return [
        "Random random = new Random();",
        "int count = 1;",
        "while (count <= 5) {",
        "    int randomNumber = random.nextInt(100) + 1;" if plus_one
        else "    int randomNumber = random.nextInt(100);",
        "    System.out.println(randomNumber);",
        "    count++;",
        "}",
    ]


WEEK_5 = [
    ADDP("MultiplicationTable", [
        SCANNER,
        'System.out.print("Enter a whole number (1-10): ");',
        "int number = input.nextInt();",
        "int counter = 1;",
        "while (counter <= 10) {",
        '    System.out.println(number + " x " + counter + " = " + (number * counter));',
        "    counter++;",
        "}",
    ], imports=["java.util.Scanner"]),
    ADDP("RandomNumbers", random_numbers(False), imports=["java.util.Random"]),
    SETP("RandomNumbers", random_numbers(True), imports=["java.util.Random"]),
    ADDP("GuessingGame", [
        SCANNER,
        "Random random = new Random();",
        "int randomNumber = random.nextInt(100) + 1;",
        'System.out.print("Guess a number between 1 and 100: ");',
        "int userGuess = input.nextInt();",
        "while (userGuess != randomNumber) {",
        "    if (userGuess > randomNumber) {",
        '        System.out.print("Too high, ");',
        "    } else {",
        '        System.out.print("Too low, ");',
        "    }",
        '    System.out.print("guess again: ");',
        "    userGuess = input.nextInt();",
        "}",
        'System.out.println("You guessed it!");',
    ], imports=["java.util.Random", "java.util.Scanner"]),
    ADDP("NumberSeriesPrinter", [
        SCANNER,
        'System.out.println("Number Series Printer!");',
        'System.out.print("Enter a starting number: ");',
        "int startingNumber = input.nextInt();",
        'System.out.print("Enter an ending number: ");',
        "int endingNumber = input.nextInt();",
        'System.out.print("Enter a step: ");',
        "int stepNumber = input.nextInt();",
        'System.out.println("The numbers in the series are:");',
        "for (int number = startingNumber; number <= endingNumber; number += stepNumber) {",
        '    System.out.print(number + " ");',
        "}",
        "System.out.println();",
    ], imports=["java.util.Scanner"]),
]


# ---- week 6 - Day 5 -----------------------------------------------------------

def vowels(stage):
    body = [
        SCANNER,
        'System.out.println("This program counts the vowels and consonants in a word or phrase.");',
        'System.out.print("Enter a word or phrase: ");',
        "String phrase = input.nextLine().toLowerCase();" if stage >= 3
        else "String phrase = input.nextLine();",
        "int vowelCounter = 0;",
        "int consonantCounter = 0;",
        "for (int index = 0; index < phrase.length(); index++) {",
        "    char letter = phrase.charAt(index);",
        "    switch (letter) {",
        "        case 'a':",
        "        case 'e':",
        "        case 'i':",
        "        case 'o':",
        "        case 'u':",
        "            vowelCounter++;",
        "            break;",
    ]
    if stage >= 2:
        body += [
            "        default:",
            "            if (letter >= 'b' && letter <= 'z') {",
            "                consonantCounter++;",
            "            }",
        ]
    body += [
        "    }",
        "}",
        'System.out.println(phrase + " has " + vowelCounter + " vowels and " + consonantCounter + " consonants.");',
    ]
    return body


WEEK_6 = [
    ADDP("StringMethods", [
        'String greeting = "Hello, world";',
        "System.out.println(greeting.length());",
        'System.out.println(greeting.indexOf("world"));',
        "System.out.println(greeting.toUpperCase());",
        "System.out.println(greeting.toLowerCase());",
        "System.out.println(greeting.charAt(0));",
        "System.out.println(greeting.substring(7, 12));",
        "System.out.println(greeting.substring(7));",
    ]),
    ADDP("Palindrome", [
        SCANNER,
        'System.out.print("Enter a word to see if it is a palindrome: ");',
        "String word = input.nextLine();",
        "boolean isPalindrome = true;",
        "for (int index = 0; index < word.length() / 2; index++) {",
        "    char frontLetter = word.charAt(index);",
        "    char backLetter = word.charAt(word.length() - 1 - index);",
        "    if (frontLetter != backLetter) {",
        "        isPalindrome = false;",
        "        break;",
        "    }",
        "}",
        "if (isPalindrome) {",
        '    System.out.println("The word " + word + " is a palindrome");',
        "} else {",
        '    System.out.println("The word " + word + " is not a palindrome");',
        "}",
    ], imports=["java.util.Scanner"]),
    ADDP("VowelsAndConsonants", vowels(1), imports=["java.util.Scanner"]),
    SETP("VowelsAndConsonants", vowels(2), imports=["java.util.Scanner"]),
    SETP("VowelsAndConsonants", vowels(3), imports=["java.util.Scanner"]),
]


# ---- week 7 - Day 6 -----------------------------------------------------------

def shopping_list(stage):
    body = ["String[] shoppingList = new String[5];", 'shoppingList[0] = "Milk";']
    if stage >= 2:
        body += [
            'shoppingList[1] = "Celery";',
            'shoppingList[2] = "Tomatoes";',
            'shoppingList[3] = "Apples";',
            'shoppingList[4] = "Eggs";',
        ]
    if stage >= 3:
        body += ["System.out.println(shoppingList[2]);"]
    if stage >= 4:
        body += [
            'System.out.println("The items in the shopping list are:");',
            "for (int index = 0; index < shoppingList.length; index++) {",
            '    System.out.print(shoppingList[index] + " ");',
            "}",
            "System.out.println();",
        ]
    if stage >= 5:
        body += [
            'shoppingList[0] = "Strawberries";',
            'shoppingList[4] = "Blueberries";',
            'System.out.println("After the changes, in capitals:");',
            "for (int index = 0; index < shoppingList.length; index++) {",
            '    System.out.print(shoppingList[index].toUpperCase() + " ");',
            "}",
            "System.out.println();",
        ]
    if stage >= 6:
        body += [
            'System.out.println("And the list itself:");',
            "for (String item : shoppingList) {",
            '    System.out.print(item + " ");',
            "}",
            "System.out.println();",
        ]
    return body


WEEK_7 = [ADDP("ShoppingList", shopping_list(1))] + [
    SETP("ShoppingList", shopping_list(stage)) for stage in range(2, 7)]


# ---- week 8 - Day 7 -----------------------------------------------------------

def find_minimum(stage):
    body = [
        "Random random = new Random();",
        "int numberOfElements = random.nextInt(19) + 2;",
        'System.out.println("The list has " + numberOfElements + " elements");',
        "int[] randomNumbers = new int[numberOfElements];",
        "for (int index = 0; index < randomNumbers.length; index++) {",
        "    randomNumbers[index] = random.nextInt(100) + 1;",
        "}",
        "for (int element : randomNumbers) {",
        '    System.out.print(element + " ");',
        "}",
        "System.out.println();",
    ]
    if stage >= 2:
        body += [
            "int minimum = randomNumbers[0];",
            "for (int index = 1; index < randomNumbers.length; index++) {",
            "    if (randomNumbers[index] < minimum) {",
            "        minimum = randomNumbers[index];",
            "    }",
            "}",
            'System.out.println("The minimum value in the list is: " + minimum);',
        ]
    if stage >= 3:
        body += [
            "boolean hasDuplicate = false;",
            "for (int index = 0; index < randomNumbers.length; index++) {",
            "    for (int otherIndex = index + 1; otherIndex < randomNumbers.length; otherIndex++) {",
            "        if (randomNumbers[index] == randomNumbers[otherIndex]) {",
            "            hasDuplicate = true;",
            '            System.out.println("Duplicate value: " + randomNumbers[index]);',
            "        }",
            "    }",
            "}",
            "if (hasDuplicate) {",
            '    System.out.println("The array contains duplicates.");',
            "} else {",
            '    System.out.println("The array does not contain duplicates.");',
            "}",
        ]
    return body


WEEK_8 = [
    ADDP("FindMinimum", find_minimum(1), imports=["java.util.Random"]),
    SETP("FindMinimum", find_minimum(2), imports=["java.util.Random"]),
    ADDP("FindingDuplicates", [
        "int[] numbers = {1, 5, 3, 4, 1, 5};",
        "boolean hasDuplicate = false;",
        "for (int index = 0; index < numbers.length; index++) {",
        "    for (int otherIndex = index + 1; otherIndex < numbers.length; otherIndex++) {",
        "        if (numbers[index] == numbers[otherIndex]) {",
        "            hasDuplicate = true;",
        "        }",
        "    }",
        "}",
        'System.out.println("Has duplicate: " + hasDuplicate);',
    ]),
    SETP("FindMinimum", find_minimum(3), imports=["java.util.Random"]),
]


# ---- week 9 - Day 8 -----------------------------------------------------------

FIRST_METHOD = [[
    "public static void myFirstMethod() {",
    '    System.out.println("Now myFirstMethod is executing");',
    "}",
]]

BEFORE_CALL = 'System.out.println("This line runs before the method is called.");'
AFTER_CALL = 'System.out.println("This line runs after the method\'s call.");'

ADD_NUMBERS = [[
    "public static int addNumbers(int firstNumber, int secondNumber) {",
    "    int sum = firstNumber + secondNumber;",
    "    return sum;",
    "}",
]]

OPERATIONS = [("+", "firstNumber + secondNumber"), ("-", "firstNumber - secondNumber"),
              ("*", "firstNumber * secondNumber"), ("/", "firstNumber / secondNumber"),
              ("%", "firstNumber % secondNumber")]


def perform_calculation():
    lines = [
        "public static int performCalculation(String operation, int firstNumber, int secondNumber) {",
        "    int result = 0;",
        "    switch (operation) {",
    ]
    for symbol, expression in OPERATIONS:
        lines += [f'        case "{symbol}":', f"            result = {expression};", "            break;"]
    lines += ["    }", "    return result;", "}"]
    return [lines]


WEEK_9 = [
    ADDP("FirstMethod", [BEFORE_CALL, AFTER_CALL], methods=FIRST_METHOD),
    SETP("FirstMethod", [BEFORE_CALL, "myFirstMethod();", AFTER_CALL], methods=FIRST_METHOD),
    ADDP("AddNumbers", [
        'System.out.println("Let\'s create a method that performs the addition of two integer numbers!");',
        "int firstNumber = 5;",
        "int secondNumber = 10;",
    ], methods=ADD_NUMBERS),
    SETP("AddNumbers", [
        'System.out.println("Let\'s create a method that performs the addition of two integer numbers!");',
        "int firstNumber = 5;",
        "int secondNumber = 10;",
        "int sum = addNumbers(firstNumber, secondNumber);",
        'System.out.println(firstNumber + " + " + secondNumber + " = " + sum);',
    ], methods=ADD_NUMBERS),
    ADDP("StringsEqual", [
        'String firstWord = "hello";',
        'String secondWord = "HELLO";',
        'System.out.println("Are the Strings equal? " + areStringsEqual(firstWord, secondWord));',
    ], methods=[[
        "public static boolean areStringsEqual(String firstWord, String secondWord) {",
        "    boolean stringsEqual = firstWord.equalsIgnoreCase(secondWord);",
        "    return stringsEqual;",
        "}",
    ]]),
    ADDP("ArithmeticOperation", [
        SCANNER,
        'System.out.println("Let\'s perform an arithmetic operation.");',
        'System.out.print("Enter +, -, *, /, or %: ");',
        "String operation = input.nextLine();",
        'System.out.print("Enter the first number: ");',
        "int firstNumber = input.nextInt();",
        'System.out.print("Enter the second number: ");',
        "int secondNumber = input.nextInt();",
        "int result = performCalculation(operation, firstNumber, secondNumber);",
        'System.out.println("Result: " + result);',
    ], imports=["java.util.Scanner"], methods=perform_calculation()),
]


# ---- week 10 - Day 9 ----------------------------------------------------------

def times_table(stage):
    body = [
        'System.out.println("Multiplication Table (1-10)");',
        "for (int row = 1; row <= 10; row++) {",
        "    for (int column = 1; column <= 10; column++) {",
    ]
    if stage == 1:
        body += ["        System.out.print(row * column);", "    }"]
    elif stage == 2:
        body += ['        System.out.print(row * column + " ");', "    }", "    System.out.println();"]
    else:
        body += ['        System.out.printf("%4d", row * column);', "    }", "    System.out.println();"]
    body += ["}"]
    return body


TIMES_TABLE_HEADER = ["// Prints the times tables from 1 to 10 as a grid"]

WEEK_10 = [
    ADDP("Matrix", [
        "int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};",
        "System.out.println(matrix[2][3]);",
        "matrix[0][0] = 10;",
        "matrix[0][3] = 40;",
        "matrix[1][1] = 50;",
        "for (int row = 0; row < matrix.length; row++) {",
        "    for (int column = 0; column < matrix[row].length; column++) {",
        '        System.out.print(matrix[row][column] + " ");',
        "    }",
        "    System.out.println();",
        "}",
    ]),
    ADDP("MultiplicationTableGenerator", times_table(1), header=TIMES_TABLE_HEADER),
    SETP("MultiplicationTableGenerator", times_table(2), header=TIMES_TABLE_HEADER),
    SETP("MultiplicationTableGenerator", times_table(3), header=TIMES_TABLE_HEADER),
    ADDP("NestedLoop", [
        "for (int row = 0; row <= 2; row++) {",
        "    for (int column = 0; column <= 3; column++) {",
        '        System.out.print("*");',
        "    }",
        "    System.out.println();",
        "}",
    ]),
]


# ---- week 11 - Day 10, the review ----------------------------------------------

def review_check(stage):
    body = [
        "double answer = 13 / 5;",
        'System.out.println("13/5 = " + answer);',
        "System.out.println(13 - 3 * 6 / 4 % 3);",
    ]
    if stage >= 2:
        body += [
            "System.out.println((5 > 3) && (8 < 10));",
            "System.out.println((5 > 3) || (8 < 5));",
            "System.out.println(!(5 == 3));",
        ]
    if stage >= 3:
        body += [
            "for (int row = 0; row < 4; row++) {",
            "    for (int column = row; column < 4; column++) {",
            '        System.out.print("*");',
            "    }",
            "    System.out.println();",
            "}",
        ]
    if stage >= 4:
        body += [
            "for (int row = 1; row <= 2; row++) {",
            "    for (int column = 1; column <= 3; column++) {",
            '        System.out.print(row * column + " ");',
            "    }",
            "    System.out.println();",
            "}",
        ]
    return body


WEEK_11 = [ADDP("ReviewCheck", review_check(1))] + [
    SETP("ReviewCheck", review_check(stage)) for stage in range(2, 5)]


# ---- weeks 12 to 15 - Days 11 to 14: Wordle -------------------------------------
#
# One program the guide builds across four lessons. Every step is written as a
# stage number, and wordle(stage) puts the file together as it stands then, so
# no two versions of a line can drift apart.

W_INTRO, W_METHOD, W_FIELD, W_SETUP, W_DASHES, W_CLEAR, W_RUN = 1, 2, 3, 4, 5, 6, 7        # week 12
W_COMPARE, W_ANSWER, W_BUILDER, W_COLOURS, W_GREEN, W_SHOW, W_YELLOW, W_CHAR, W_WIN, W_LOSE = range(8, 18)   # week 13
W_METHODS, W_LOSEMETHOD, W_LETTERS, W_SHOWLETTERS, W_WORDS = range(18, 23)                    # week 14
W_VALID, W_LETTERSONLY, W_FOREACH, W_BOOLEANS, W_LOWER = range(23, 28)                        # week 15


def wordle(stage):
    imports = ["java.util.ArrayList", "java.util.Scanner"] if stage >= W_LETTERS else ["java.util.Scanner"]

    fields = []
    if stage >= W_FIELD:
        fields += ["public static Scanner input;"]
    if stage >= W_SETUP:
        fields += ["public static String[] guesses;", "public static int numberOfGuesses;"]
    if stage >= W_BUILDER:
        fields += ["public static int maxWordLength;"]
    if stage >= W_ANSWER:
        fields += ["private static String answer;"]
    if stage >= W_COLOURS:
        fields += [
            "// These constants colour the output.",
            'private static final String ANSI_RESET = "\\u001B[0m";',
            'private static final String ANSI_GREEN = "\\u001B[32m";',
            'private static final String ANSI_YELLOW = "\\u001B[33m";',
        ]
    if stage >= W_LETTERS:
        fields += ["private static ArrayList<Character> guessedLetters = new ArrayList<Character>();"]
    if stage >= W_WORDS:
        fields += ["private static ArrayList<String> alreadyGuessedWords = new ArrayList<String>();"]
    if fields:
        fields += [""]

    intro = [
        "input = new Scanner(System.in);" if stage >= W_FIELD else SCANNER,
        'System.out.println("******************************************");',
        'System.out.println("   WELCOME TO WORDLE, a very fun game!");',
        'System.out.println("******************************************");',
        'System.out.println("This game is for 2 people.");',
        'System.out.print("Player 1, please type a 5-letter word: ");',
    ]
    if stage >= W_LOWER:
        intro += ["answer = input.next().toLowerCase();"]
    elif stage >= W_ANSWER:
        intro += ["answer = input.next();"]
    else:
        intro += ["String answer = input.next();"]
    if stage >= W_CLEAR:
        intro += ["clearConsole();", 'System.out.println("Now, player 2 can start guessing:");']

    if stage < W_METHOD:
        return program("Wordle", intro, imports=imports)

    main = ["gameIntro();"]
    if stage >= W_SETUP:
        main += ["gameSetup();", "displayGuesses();"]
    if stage >= W_RUN:
        main += ["runGame();"]

    methods = [["public static void gameIntro() {"] + code(1, *intro) + ["}"]]
    if stage >= W_SETUP:
        setup = ["numberOfGuesses = 6;", "guesses = new String[numberOfGuesses];"]
        if stage >= W_BUILDER:
            setup += ["maxWordLength = 5;"]
        if stage >= W_DASHES:
            setup += ["initializeGuesses();"]
        if stage >= W_LETTERS:
            setup += ["guessedLetters.clear();"]
        if stage >= W_WORDS:
            setup += ["alreadyGuessedWords.clear();"]
        methods.append(["public static void gameSetup() {"] + code(1, *setup) + ["}"])
    if stage >= W_DASHES:
        methods.append([
            "public static void initializeGuesses() {",
            "    for (int index = 0; index < numberOfGuesses; index++) {",
            '        guesses[index] = "-----";',
            "    }",
            "}",
        ])
    if stage >= W_SETUP:
        methods.append([
            "public static void displayGuesses() {",
            "    for (int index = 0; index < numberOfGuesses; index++) {",
            "        System.out.println(guesses[index]);",
            "    }",
            "}",
        ])
    if stage >= W_CLEAR:
        methods.append([
            "public static void clearConsole() {",
            '    System.out.print("\\u001B[H\\u001B[2J");',
            "}",
        ])
    if stage >= W_RUN:
        methods.append(run_game(stage))
    if stage >= W_METHODS:
        methods.append([
            "public static void handleWinScenario() {",
            '    System.out.println("Congratulations! You have guessed the word! Press P to play again.");',
            '    if (input.next().toLowerCase().charAt(0) == \'p\') {',
            "        replayGame();",
            "    }",
            "}",
        ])
    if stage >= W_LOSEMETHOD:
        methods.append([
            "public static void handleLoseScenario() {",
            '    System.out.println("You have run out of guesses! The word was " + answer + ". Press P to play again.");',
            '    if (input.next().toLowerCase().charAt(0) == \'p\') {',
            "        replayGame();",
            "    }",
            "}",
        ])
    if stage >= W_METHODS:
        methods.append([
            "public static void replayGame() {",
            "    gameIntro();",
            "    gameSetup();",
            "    displayGuesses();",
            "    runGame();",
            "}",
        ])
    if stage >= W_SHOWLETTERS:
        methods.append([
            "public static void displayGuessedLetters() {",
            '    System.out.println("You have guessed the letters:");',
            "    for (char letter : guessedLetters) {",
            '        System.out.print(letter + " ");',
            "    }",
            "    System.out.println();",
            "}",
        ])
    if stage >= W_VALID:
        methods.append(get_valid_guess(stage))
    if stage >= W_LETTERSONLY:
        loop = ([
            "    for (char letter : word.toCharArray()) {",
            "        if (!Character.isLetter(letter)) {",
        ] if stage >= W_FOREACH else [
            "    for (int index = 0; index < word.length(); index++) {",
            "        if (!Character.isLetter(word.charAt(index))) {",
        ])
        methods.append([
            "// Checks whether any character in a word is not a letter",
            "public static boolean hasNonLetters(String word) {",
        ] + loop + [
            "            return true;",
            "        }",
            "    }",
            "    return false;",
            "}",
        ])
    return program("Wordle", main, imports=imports, fields=fields, methods=methods)


def run_game(stage):
    body = [
        "for (int guessNumber = 0; guessNumber < numberOfGuesses; guessNumber++) {",
        "    String userGuess = getValidGuess();" if stage >= W_VALID else "    String userGuess = input.next();",
        "    clearConsole();",
    ]
    if stage >= W_WORDS:
        body += [
            "    if (!alreadyGuessedWords.contains(userGuess)) {",
            "        alreadyGuessedWords.add(userGuess);",
            "    } else {",
            '        System.out.println("You have already chosen this word");',
            "    }",
        ]
    if stage >= W_BUILDER:
        body += ["    StringBuilder coloredGuess = new StringBuilder(maxWordLength);"]
    if stage >= W_COMPARE:
        guess_letter = "userGuessChar" if stage >= W_CHAR else "userGuess.charAt(index)"
        body += ["    for (int index = 0; index < userGuess.length(); index++) {"]
        if stage >= W_CHAR:
            body += ["        char userGuessChar = userGuess.charAt(index);"]
        if stage >= W_LETTERS:
            body += [
                "        if (!guessedLetters.contains(userGuessChar)) {",
                "            guessedLetters.add(userGuessChar);",
                "        }",
            ]
        body += [f"        if ({guess_letter} == answer.charAt(index)) {{"]
        if stage >= W_GREEN:
            body += [f"            coloredGuess.append(ANSI_GREEN + {guess_letter} + ANSI_RESET);"]
        else:
            body += ['            System.out.println("Letter is in the correct place");']
        if stage >= W_YELLOW:
            body += [
                "        } else {",
                f"            int position = answer.indexOf({guess_letter});",
                "            if (position >= 0) {",
                f"                coloredGuess.append(ANSI_YELLOW + {guess_letter} + ANSI_RESET);",
                "            } else {",
                f"                coloredGuess.append({guess_letter});",
                "            }",
            ]
        body += ["        }", "    } // inner loop" if stage >= W_SHOW else "    }"]
    if stage >= W_SHOW:
        body += ["    guesses[guessNumber] = coloredGuess.toString();"]
        if stage >= W_SHOWLETTERS:
            body += ["    displayGuessedLetters();"]
        body += ["    displayGuesses();"]
    if stage >= W_WIN:
        body += ["    if (userGuess.equals(answer)) {"]
        # The Day 13 handout types the replay inline here first and then
        # moves it into handleWinScenario. That is seven lines typed, deleted
        # and typed again; this goes straight to the method.
        if stage >= W_METHODS:
            body += ["        handleWinScenario();"]
        else:
            body += ['        System.out.println("Congratulations! You have guessed the word correctly!");']
        body += ["        return;", "    }"]
    if stage >= W_LOSE:
        body += ["    if (guessNumber == numberOfGuesses - 1) {"]
        if stage >= W_LOSEMETHOD:
            body += ["        handleLoseScenario();"]
        else:
            body += ['        System.out.println("You have run out of guesses! The word was " + answer + ".");']
        body += ["        return;", "    }"]
    body += ["}"]
    return ["public static void runGame() {"] + code(1, *body) + ["}"]


def get_valid_guess(stage):
    body = ["String userGuess = input.next().toLowerCase();" if stage >= W_LOWER
            else "String userGuess = input.next();"]
    reread = "    userGuess = input.next().toLowerCase();" if stage >= W_LOWER else "    userGuess = input.next();"
    message = '    System.out.println("Please enter a word of exactly 5 letters");'
    if stage >= W_BOOLEANS:
        body += [
            "boolean isFiveLetters = userGuess.length() == maxWordLength;",
            "boolean containsNonLetters = hasNonLetters(userGuess);",
            "while (!isFiveLetters || containsNonLetters) {",
            message,
            reread,
            # One step with the loop condition above: without these two lines
            # the booleans never change, and one bad guess loops for ever.
            "    isFiveLetters = userGuess.length() == maxWordLength;",
            "    containsNonLetters = hasNonLetters(userGuess);",
        ]
    elif stage >= W_LETTERSONLY:
        body += ["while (userGuess.length() != maxWordLength || hasNonLetters(userGuess)) {", message, reread]
    else:
        body += ["while (userGuess.length() != maxWordLength) {", message, reread]
    body += ["}", "return userGuess;"]
    return ["public static String getValidGuess() {"] + code(1, *body) + ["}"]


def WORDLE(stage):
    kind = ADD if stage == W_INTRO else SET
    return kind("Wordle.java", BLOCK, wordle(stage))


WEEK_12 = [WORDLE(stage) for stage in range(W_INTRO, W_RUN + 1)]
WEEK_13 = [WORDLE(stage) for stage in range(W_COMPARE, W_LOSE + 1)]
WEEK_14 = [WORDLE(stage) for stage in range(W_METHODS, W_WORDS + 1)]
WEEK_15 = [WORDLE(stage) for stage in range(W_VALID, W_LOWER + 1)]


OPS = {
    1: WEEK_1, 2: WEEK_2, 3: WEEK_3, 4: WEEK_4, 5: WEEK_5, 6: WEEK_6, 7: WEEK_7, 8: WEEK_8,
    9: WEEK_9, 10: WEEK_10, 11: WEEK_11, 12: WEEK_12, 13: WEEK_13, 14: WEEK_14, 15: WEEK_15,
}

# Every program in the course, in the order the course first writes it. Each
# is one block: see the module docstring.
ORDER = {}
for _week in sorted(OPS):
    for _kind, _filename, _block, _lines in OPS[_week]:
        ORDER.setdefault(_filename, [BLOCK])
