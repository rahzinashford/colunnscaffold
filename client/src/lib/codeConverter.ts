interface CodePattern {
  pattern: RegExp;
  replacement: string;
  description: string;
}

interface LanguageConversion {
  from: string;
  to: string;
  patterns: CodePattern[];
  imports?: string[];
  wrappers?: {
    prefix?: string;
    suffix?: string;
  };
}

// Common programming constructs mapping
const conversions: LanguageConversion[] = [
  // Python to JavaScript
  {
    from: 'python',
    to: 'javascript',
    patterns: [
      { pattern: /print\((.*?)\)/g, replacement: 'console.log($1)', description: 'Print to console.log' },
      { pattern: /input\("(.+?)"\)/g, replacement: 'prompt("$1")', description: 'Input to prompt' },
      { pattern: /def\s+(\w+)\((.*?)\):/g, replacement: 'function $1($2) {', description: 'Function definition' },
      { pattern: /if\s+(.+?):/g, replacement: 'if ($1) {', description: 'If statement' },
      { pattern: /elif\s+(.+?):/g, replacement: '} else if ($1) {', description: 'Elif to else if' },
      { pattern: /else:/g, replacement: '} else {', description: 'Else statement' },
      { pattern: /for\s+(\w+)\s+in\s+range\((\d+)\):/g, replacement: 'for (let $1 = 0; $1 < $2; $1++) {', description: 'For range loop' },
      { pattern: /for\s+(\w+)\s+in\s+(.+?):/g, replacement: 'for (const $1 of $2) {', description: 'For in loop' },
      { pattern: /while\s+(.+?):/g, replacement: 'while ($1) {', description: 'While loop' },
      { pattern: /True/g, replacement: 'true', description: 'Boolean true' },
      { pattern: /False/g, replacement: 'false', description: 'Boolean false' },
      { pattern: /None/g, replacement: 'null', description: 'None to null' },
      { pattern: /len\((.+?)\)/g, replacement: '$1.length', description: 'Length property' },
      { pattern: /(\w+)\.append\((.+?)\)/g, replacement: '$1.push($2)', description: 'List append to array push' },
      { pattern: /#\s*(.+)/g, replacement: '// $1', description: 'Comment style' },
      { pattern: /f"(.+?)"/g, replacement: '`$1`', description: 'F-string to template literal' },
      { pattern: /\{(\w+)\}/g, replacement: '${$1}', description: 'F-string variable interpolation' },
      { pattern: /return\s+(.+)/g, replacement: 'return $1;', description: 'Return statement' },
      { pattern: /(\w+)\s*=\s*(.+)/g, replacement: 'let $1 = $2;', description: 'Variable assignment' },
    ],
    wrappers: {
      suffix: '\n// Add closing braces for blocks as needed'
    }
  },
  
  // JavaScript to Python
  {
    from: 'javascript',
    to: 'python',
    patterns: [
      { pattern: /console\.log\((.*?)\)/g, replacement: 'print($1)', description: 'Console.log to print' },
      { pattern: /prompt\("(.+?)"\)/g, replacement: 'input("$1")', description: 'Prompt to input' },
      { pattern: /function\s+(\w+)\((.*?)\)\s*\{/g, replacement: 'def $1($2):', description: 'Function definition' },
      { pattern: /if\s*\((.+?)\)\s*\{/g, replacement: 'if $1:', description: 'If statement' },
      { pattern: /\}\s*else\s*if\s*\((.+?)\)\s*\{/g, replacement: 'elif $1:', description: 'Else if to elif' },
      { pattern: /\}\s*else\s*\{/g, replacement: 'else:', description: 'Else statement' },
      { pattern: /for\s*\(\s*let\s+(\w+)\s*=\s*0;\s*\1\s*<\s*(\d+);\s*\1\+\+\s*\)\s*\{/g, replacement: 'for $1 in range($2):', description: 'For loop to range' },
      { pattern: /for\s*\(\s*const\s+(\w+)\s+of\s+(.+?)\)\s*\{/g, replacement: 'for $1 in $2:', description: 'For of loop' },
      { pattern: /while\s*\((.+?)\)\s*\{/g, replacement: 'while $1:', description: 'While loop' },
      { pattern: /true/g, replacement: 'True', description: 'Boolean true' },
      { pattern: /false/g, replacement: 'False', description: 'Boolean false' },
      { pattern: /null/g, replacement: 'None', description: 'Null to None' },
      { pattern: /(\w+)\.length/g, replacement: 'len($1)', description: 'Length property to len()' },
      { pattern: /(\w+)\.push\((.+?)\)/g, replacement: '$1.append($2)', description: 'Array push to list append' },
      { pattern: /\/\/\s*(.+)/g, replacement: '# $1', description: 'Comment style' },
      { pattern: /`(.+?)`/g, replacement: 'f"$1"', description: 'Template literal to f-string' },
      { pattern: /\$\{(\w+)\}/g, replacement: '{$1}', description: 'Template variable to f-string' },
      { pattern: /return\s+(.+?);/g, replacement: 'return $1', description: 'Return statement' },
      { pattern: /let\s+(\w+)\s*=\s*(.+?);/g, replacement: '$1 = $2', description: 'Variable assignment' },
      { pattern: /const\s+(\w+)\s*=\s*(.+?);/g, replacement: '$1 = $2', description: 'Const assignment' },
      { pattern: /var\s+(\w+)\s*=\s*(.+?);/g, replacement: '$1 = $2', description: 'Var assignment' },
    ]
  },
  
  // Python to C++
  {
    from: 'python',
    to: 'cpp',
    patterns: [
      { pattern: /print\((.*?)\)/g, replacement: 'cout << $1 << endl', description: 'Print to cout' },
      { pattern: /input\("(.+?)"\)/g, replacement: 'cin >> variable', description: 'Input to cin' },
      { pattern: /def\s+(\w+)\((.*?)\):/g, replacement: 'void $1($2) {', description: 'Function definition' },
      { pattern: /if\s+(.+?):/g, replacement: 'if ($1) {', description: 'If statement' },
      { pattern: /elif\s+(.+?):/g, replacement: '} else if ($1) {', description: 'Elif to else if' },
      { pattern: /else:/g, replacement: '} else {', description: 'Else statement' },
      { pattern: /for\s+(\w+)\s+in\s+range\((\d+)\):/g, replacement: 'for (int $1 = 0; $1 < $2; $1++) {', description: 'For range loop' },
      { pattern: /while\s+(.+?):/g, replacement: 'while ($1) {', description: 'While loop' },
      { pattern: /True/g, replacement: 'true', description: 'Boolean true' },
      { pattern: /False/g, replacement: 'false', description: 'Boolean false' },
      { pattern: /None/g, replacement: 'nullptr', description: 'None to nullptr' },
      { pattern: /#\s*(.+)/g, replacement: '// $1', description: 'Comment style' },
      { pattern: /return\s+(.+)/g, replacement: 'return $1;', description: 'Return statement' },
      { pattern: /(\w+)\s*=\s*(.+)/g, replacement: 'auto $1 = $2;', description: 'Variable assignment' },
    ],
    imports: ['#include <iostream>', '#include <string>', 'using namespace std;'],
    wrappers: {
      prefix: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n',
      suffix: '\n    return 0;\n}'
    }
  },
  
  // Python to Java
  {
    from: 'python',
    to: 'java',
    patterns: [
      { pattern: /print\((.*?)\)/g, replacement: 'System.out.println($1)', description: 'Print to System.out' },
      { pattern: /input\("(.+?)"\)/g, replacement: 'scanner.nextLine()', description: 'Input to scanner' },
      { pattern: /def\s+(\w+)\((.*?)\):/g, replacement: 'public static void $1($2) {', description: 'Function definition' },
      { pattern: /if\s+(.+?):/g, replacement: 'if ($1) {', description: 'If statement' },
      { pattern: /elif\s+(.+?):/g, replacement: '} else if ($1) {', description: 'Elif to else if' },
      { pattern: /else:/g, replacement: '} else {', description: 'Else statement' },
      { pattern: /for\s+(\w+)\s+in\s+range\((\d+)\):/g, replacement: 'for (int $1 = 0; $1 < $2; $1++) {', description: 'For range loop' },
      { pattern: /while\s+(.+?):/g, replacement: 'while ($1) {', description: 'While loop' },
      { pattern: /True/g, replacement: 'true', description: 'Boolean true' },
      { pattern: /False/g, replacement: 'false', description: 'Boolean false' },
      { pattern: /None/g, replacement: 'null', description: 'None to null' },
      { pattern: /#\s*(.+)/g, replacement: '// $1', description: 'Comment style' },
      { pattern: /return\s+(.+)/g, replacement: 'return $1;', description: 'Return statement' },
      { pattern: /(\w+)\s*=\s*(.+)/g, replacement: 'String $1 = $2;', description: 'Variable assignment' },
    ],
    imports: ['import java.util.Scanner;'],
    wrappers: {
      prefix: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n',
      suffix: '\n        scanner.close();\n    }\n}'
    }
  }
];

export const convertCode = (code: string, fromLanguage: string, toLanguage: string): string => {
  if (fromLanguage === toLanguage) return code;
  
  const conversion = conversions.find(c => c.from === fromLanguage && c.to === toLanguage);
  if (!conversion) return code;
  
  let convertedCode = code;
  
  // Apply all pattern replacements
  for (const pattern of conversion.patterns) {
    convertedCode = convertedCode.replace(pattern.pattern, pattern.replacement);
  }
  
  // Add imports if needed
  if (conversion.imports) {
    convertedCode = conversion.imports.join('\n') + '\n\n' + convertedCode;
  }
  
  // Add wrappers if needed
  if (conversion.wrappers) {
    const { prefix = '', suffix = '' } = conversion.wrappers;
    convertedCode = prefix + convertedCode + suffix;
  }
  
  // Clean up extra whitespace and newlines
  convertedCode = convertedCode.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return convertedCode;
};

export const getSupportedConversions = (): Array<{from: string, to: string}> => {
  return conversions.map(c => ({ from: c.from, to: c.to }));
};

export const canConvert = (fromLanguage: string, toLanguage: string): boolean => {
  return conversions.some(c => c.from === fromLanguage && c.to === toLanguage);
};