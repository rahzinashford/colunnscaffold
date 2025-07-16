export interface CodeSnippet {
  id: string;
  label: string;
  code: string;
  description: string;
}

export interface SnippetSection {
  id: string;
  title: string;
  icon: string;
  snippets: CodeSnippet[];
}

export const getSnippetsForLanguage = (language: string): SnippetSection[] => {
  switch (language) {
    case 'python':
      return pythonSnippets;
    case 'javascript':
      return javascriptSnippets;
    case 'cpp':
      return cppSnippets;
    case 'java':
      return javaSnippets;
    default:
      return pythonSnippets;
  }
};

const pythonSnippets: SnippetSection[] = [
  {
    id: 'variables',
    title: 'Variables',
    icon: 'fas fa-box',
    snippets: [
      {
        id: 'string_var',
        label: 'name = "value"',
        code: 'name = "value"',
        description: 'String variable'
      },
      {
        id: 'number_var',
        label: 'count = 0',
        code: 'count = 0',
        description: 'Number variable'
      },
      {
        id: 'list_var',
        label: 'items = []',
        code: 'items = []',
        description: 'List variable'
      },
      {
        id: 'dict_var',
        label: 'data = {}',
        code: 'data = {}',
        description: 'Dictionary variable'
      }
    ]
  },
  {
    id: 'loops',
    title: 'Loops',
    icon: 'fas fa-redo',
    snippets: [
      {
        id: 'for_range',
        label: 'for i in range(10):',
        code: 'for i in range(10):\n    # type your logic here',
        description: 'For loop with range'
      },
      {
        id: 'for_list',
        label: 'for item in items:',
        code: 'for item in items:\n    # type your logic here',
        description: 'For loop over list'
      },
      {
        id: 'while_loop',
        label: 'while True:',
        code: 'while True:\n    # type your logic here',
        description: 'While loop'
      },
      {
        id: 'enumerate',
        label: 'for i, item in enumerate(items):',
        code: 'for i, item in enumerate(items):\n    # type your logic here',
        description: 'Enumerate loop'
      }
    ]
  },
  {
    id: 'conditionals',
    title: 'Conditionals',
    icon: 'fas fa-code-branch',
    snippets: [
      {
        id: 'if_statement',
        label: 'if condition:',
        code: 'if condition:\n    # type your logic here',
        description: 'If statement'
      },
      {
        id: 'if_else',
        label: 'if condition: else:',
        code: 'if condition:\n    # type your logic here\nelse:\n    # type your logic here',
        description: 'If-else statement'
      },
      {
        id: 'elif',
        label: 'elif condition:',
        code: 'elif condition:\n    # type your logic here',
        description: 'Elif statement'
      },
      {
        id: 'ternary',
        label: 'value = x if condition else y',
        code: 'value = x if condition else y',
        description: 'Ternary operator'
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    icon: 'fas fa-function',
    snippets: [
      {
        id: 'function_def',
        label: 'def function_name():',
        code: 'def function_name():\n    # type your logic here',
        description: 'Function definition'
      },
      {
        id: 'function_param',
        label: 'def function_name(param):',
        code: 'def function_name(param):\n    # type your logic here',
        description: 'Function with parameter'
      },
      {
        id: 'function_return',
        label: 'return value',
        code: 'return value',
        description: 'Return statement'
      },
      {
        id: 'lambda',
        label: 'lambda x: x * 2',
        code: 'lambda x: x * 2',
        description: 'Lambda function'
      }
    ]
  },
  {
    id: 'output',
    title: 'Output',
    icon: 'fas fa-print',
    snippets: [
      {
        id: 'print',
        label: 'print("Hello, World!")',
        code: 'print("Hello, World!")',
        description: 'Print statement'
      },
      {
        id: 'print_format',
        label: 'print(f"Value: {variable}")',
        code: 'print(f"Value: {variable}")',
        description: 'Formatted print'
      },
      {
        id: 'print_multiple',
        label: 'print(var1, var2, var3)',
        code: 'print(var1, var2, var3)',
        description: 'Print multiple values'
      }
    ]
  },
  {
    id: 'input',
    title: 'Input',
    icon: 'fas fa-keyboard',
    snippets: [
      {
        id: 'input_string',
        label: 'input("Enter value: ")',
        code: 'input("Enter value: ")',
        description: 'String input'
      },
      {
        id: 'input_int',
        label: 'int(input("Number: "))',
        code: 'int(input("Number: "))',
        description: 'Integer input'
      },
      {
        id: 'input_float',
        label: 'float(input("Decimal: "))',
        code: 'float(input("Decimal: "))',
        description: 'Float input'
      }
    ]
  }
];

const javascriptSnippets: SnippetSection[] = [
  {
    id: 'variables',
    title: 'Variables',
    icon: 'fas fa-box',
    snippets: [
      {
        id: 'const_var',
        label: 'const name = "value"',
        code: 'const name = "value";',
        description: 'Constant variable'
      },
      {
        id: 'let_var',
        label: 'let count = 0',
        code: 'let count = 0;',
        description: 'Let variable'
      },
      {
        id: 'array_var',
        label: 'const items = []',
        code: 'const items = [];',
        description: 'Array variable'
      },
      {
        id: 'object_var',
        label: 'const data = {}',
        code: 'const data = {};',
        description: 'Object variable'
      }
    ]
  },
  {
    id: 'loops',
    title: 'Loops',
    icon: 'fas fa-redo',
    snippets: [
      {
        id: 'for_loop',
        label: 'for (let i = 0; i < 10; i++)',
        code: 'for (let i = 0; i < 10; i++) {\n    // type your logic here\n}',
        description: 'For loop'
      },
      {
        id: 'for_of',
        label: 'for (const item of items)',
        code: 'for (const item of items) {\n    // type your logic here\n}',
        description: 'For...of loop'
      },
      {
        id: 'while_loop',
        label: 'while (true)',
        code: 'while (true) {\n    // type your logic here\n}',
        description: 'While loop'
      },
      {
        id: 'foreach',
        label: 'items.forEach(item => {})',
        code: 'items.forEach(item => {\n    // type your logic here\n});',
        description: 'ForEach method'
      }
    ]
  },
  {
    id: 'conditionals',
    title: 'Conditionals',
    icon: 'fas fa-code-branch',
    snippets: [
      {
        id: 'if_statement',
        label: 'if (condition)',
        code: 'if (condition) {\n    // type your logic here\n}',
        description: 'If statement'
      },
      {
        id: 'if_else',
        label: 'if (condition) else',
        code: 'if (condition) {\n    // type your logic here\n} else {\n    // type your logic here\n}',
        description: 'If-else statement'
      },
      {
        id: 'else_if',
        label: 'else if (condition)',
        code: 'else if (condition) {\n    // type your logic here\n}',
        description: 'Else if statement'
      },
      {
        id: 'ternary',
        label: 'value = condition ? x : y',
        code: 'const value = condition ? x : y;',
        description: 'Ternary operator'
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    icon: 'fas fa-function',
    snippets: [
      {
        id: 'function_def',
        label: 'function functionName()',
        code: 'function functionName() {\n    // type your logic here\n}',
        description: 'Function declaration'
      },
      {
        id: 'arrow_function',
        label: 'const functionName = () => {}',
        code: 'const functionName = () => {\n    // type your logic here\n};',
        description: 'Arrow function'
      },
      {
        id: 'function_param',
        label: 'function functionName(param)',
        code: 'function functionName(param) {\n    // type your logic here\n}',
        description: 'Function with parameter'
      },
      {
        id: 'return_statement',
        label: 'return value',
        code: 'return value;',
        description: 'Return statement'
      }
    ]
  },
  {
    id: 'output',
    title: 'Output',
    icon: 'fas fa-print',
    snippets: [
      {
        id: 'console_log',
        label: 'console.log("Hello, World!")',
        code: 'console.log("Hello, World!");',
        description: 'Console log'
      },
      {
        id: 'console_template',
        label: 'console.log(`Value: ${variable}`)',
        code: 'console.log(`Value: ${variable}`);',
        description: 'Template literal log'
      },
      {
        id: 'console_multiple',
        label: 'console.log(var1, var2, var3)',
        code: 'console.log(var1, var2, var3);',
        description: 'Log multiple values'
      }
    ]
  },
  {
    id: 'input',
    title: 'Input',
    icon: 'fas fa-keyboard',
    snippets: [
      {
        id: 'prompt',
        label: 'prompt("Enter value:")',
        code: 'const value = prompt("Enter value:");',
        description: 'Prompt input'
      },
      {
        id: 'prompt_number',
        label: 'Number(prompt("Number:"))',
        code: 'const number = Number(prompt("Number:"));',
        description: 'Number input'
      },
      {
        id: 'confirm',
        label: 'confirm("Are you sure?")',
        code: 'const confirmed = confirm("Are you sure?");',
        description: 'Confirm dialog'
      }
    ]
  }
];

const cppSnippets: SnippetSection[] = [
  {
    id: 'variables',
    title: 'Variables',
    icon: 'fas fa-box',
    snippets: [
      {
        id: 'int_var',
        label: 'int count = 0',
        code: 'int count = 0;',
        description: 'Integer variable'
      },
      {
        id: 'string_var',
        label: 'string name = "value"',
        code: 'string name = "value";',
        description: 'String variable'
      },
      {
        id: 'double_var',
        label: 'double value = 0.0',
        code: 'double value = 0.0;',
        description: 'Double variable'
      },
      {
        id: 'vector_var',
        label: 'vector<int> items',
        code: 'vector<int> items;',
        description: 'Vector variable'
      }
    ]
  },
  {
    id: 'loops',
    title: 'Loops',
    icon: 'fas fa-redo',
    snippets: [
      {
        id: 'for_loop',
        label: 'for (int i = 0; i < 10; i++)',
        code: 'for (int i = 0; i < 10; i++) {\n    // type your logic here\n}',
        description: 'For loop'
      },
      {
        id: 'while_loop',
        label: 'while (true)',
        code: 'while (true) {\n    // type your logic here\n}',
        description: 'While loop'
      },
      {
        id: 'range_for',
        label: 'for (auto& item : items)',
        code: 'for (auto& item : items) {\n    // type your logic here\n}',
        description: 'Range-based for loop'
      }
    ]
  },
  {
    id: 'conditionals',
    title: 'Conditionals',
    icon: 'fas fa-code-branch',
    snippets: [
      {
        id: 'if_statement',
        label: 'if (condition)',
        code: 'if (condition) {\n    // type your logic here\n}',
        description: 'If statement'
      },
      {
        id: 'if_else',
        label: 'if (condition) else',
        code: 'if (condition) {\n    // type your logic here\n} else {\n    // type your logic here\n}',
        description: 'If-else statement'
      },
      {
        id: 'else_if',
        label: 'else if (condition)',
        code: 'else if (condition) {\n    // type your logic here\n}',
        description: 'Else if statement'
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    icon: 'fas fa-function',
    snippets: [
      {
        id: 'function_def',
        label: 'void functionName()',
        code: 'void functionName() {\n    // type your logic here\n}',
        description: 'Function definition'
      },
      {
        id: 'function_return',
        label: 'int functionName()',
        code: 'int functionName() {\n    // type your logic here\n    return 0;\n}',
        description: 'Function with return'
      },
      {
        id: 'function_param',
        label: 'void functionName(int param)',
        code: 'void functionName(int param) {\n    // type your logic here\n}',
        description: 'Function with parameter'
      }
    ]
  },
  {
    id: 'output',
    title: 'Output',
    icon: 'fas fa-print',
    snippets: [
      {
        id: 'cout',
        label: 'cout << "Hello, World!"',
        code: 'cout << "Hello, World!" << endl;',
        description: 'Console output'
      },
      {
        id: 'cout_variable',
        label: 'cout << "Value: " << variable',
        code: 'cout << "Value: " << variable << endl;',
        description: 'Output with variable'
      }
    ]
  },
  {
    id: 'input',
    title: 'Input',
    icon: 'fas fa-keyboard',
    snippets: [
      {
        id: 'cin',
        label: 'cin >> variable',
        code: 'cin >> variable;',
        description: 'Console input'
      },
      {
        id: 'getline',
        label: 'getline(cin, stringVar)',
        code: 'getline(cin, stringVar);',
        description: 'String input'
      }
    ]
  }
];

const javaSnippets: SnippetSection[] = [
  {
    id: 'variables',
    title: 'Variables',
    icon: 'fas fa-box',
    snippets: [
      {
        id: 'int_var',
        label: 'int count = 0',
        code: 'int count = 0;',
        description: 'Integer variable'
      },
      {
        id: 'string_var',
        label: 'String name = "value"',
        code: 'String name = "value";',
        description: 'String variable'
      },
      {
        id: 'double_var',
        label: 'double value = 0.0',
        code: 'double value = 0.0;',
        description: 'Double variable'
      },
      {
        id: 'array_var',
        label: 'int[] items = new int[10]',
        code: 'int[] items = new int[10];',
        description: 'Array variable'
      }
    ]
  },
  {
    id: 'loops',
    title: 'Loops',
    icon: 'fas fa-redo',
    snippets: [
      {
        id: 'for_loop',
        label: 'for (int i = 0; i < 10; i++)',
        code: 'for (int i = 0; i < 10; i++) {\n    // type your logic here\n}',
        description: 'For loop'
      },
      {
        id: 'while_loop',
        label: 'while (true)',
        code: 'while (true) {\n    // type your logic here\n}',
        description: 'While loop'
      },
      {
        id: 'enhanced_for',
        label: 'for (int item : items)',
        code: 'for (int item : items) {\n    // type your logic here\n}',
        description: 'Enhanced for loop'
      }
    ]
  },
  {
    id: 'conditionals',
    title: 'Conditionals',
    icon: 'fas fa-code-branch',
    snippets: [
      {
        id: 'if_statement',
        label: 'if (condition)',
        code: 'if (condition) {\n    // type your logic here\n}',
        description: 'If statement'
      },
      {
        id: 'if_else',
        label: 'if (condition) else',
        code: 'if (condition) {\n    // type your logic here\n} else {\n    // type your logic here\n}',
        description: 'If-else statement'
      },
      {
        id: 'else_if',
        label: 'else if (condition)',
        code: 'else if (condition) {\n    // type your logic here\n}',
        description: 'Else if statement'
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    icon: 'fas fa-function',
    snippets: [
      {
        id: 'method_def',
        label: 'public void methodName()',
        code: 'public void methodName() {\n    // type your logic here\n}',
        description: 'Method definition'
      },
      {
        id: 'method_return',
        label: 'public int methodName()',
        code: 'public int methodName() {\n    // type your logic here\n    return 0;\n}',
        description: 'Method with return'
      },
      {
        id: 'method_param',
        label: 'public void methodName(int param)',
        code: 'public void methodName(int param) {\n    // type your logic here\n}',
        description: 'Method with parameter'
      }
    ]
  },
  {
    id: 'output',
    title: 'Output',
    icon: 'fas fa-print',
    snippets: [
      {
        id: 'println',
        label: 'System.out.println("Hello, World!")',
        code: 'System.out.println("Hello, World!");',
        description: 'Print line'
      },
      {
        id: 'print_variable',
        label: 'System.out.println("Value: " + variable)',
        code: 'System.out.println("Value: " + variable);',
        description: 'Print with variable'
      }
    ]
  },
  {
    id: 'input',
    title: 'Input',
    icon: 'fas fa-keyboard',
    snippets: [
      {
        id: 'scanner',
        label: 'Scanner scanner = new Scanner(System.in)',
        code: 'Scanner scanner = new Scanner(System.in);',
        description: 'Scanner object'
      },
      {
        id: 'next_line',
        label: 'scanner.nextLine()',
        code: 'String input = scanner.nextLine();',
        description: 'Read line'
      },
      {
        id: 'next_int',
        label: 'scanner.nextInt()',
        code: 'int number = scanner.nextInt();',
        description: 'Read integer'
      }
    ]
  }
];
