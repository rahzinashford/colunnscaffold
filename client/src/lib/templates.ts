// Language-specific templates for new files

export interface LanguageTemplate {
  extension: string;
  defaultName: string;
  template: string;
  description: string;
}

export const languageTemplates: Record<string, LanguageTemplate> = {
  python: {
    extension: '.py',
    defaultName: 'main.py',
    template: `# Python program
# Write your code here

def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()
`,
    description: 'Python script with main function'
  },
  
  javascript: {
    extension: '.js',
    defaultName: 'main.js',
    template: `// JavaScript program
// Write your code here

function main() {
    console.log("Hello, World!");
}

main();
`,
    description: 'JavaScript file with main function'
  },
  
  cpp: {
    extension: '.cpp',
    defaultName: 'main.cpp',
    template: `#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
`,
    description: 'C++ program with main function'
  },
  
  java: {
    extension: '.java',
    defaultName: 'Main.java',
    template: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`,
    description: 'Java class with main method'
  },
  
  c: {
    extension: '.c',
    defaultName: 'main.c',
    template: `#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
`,
    description: 'C program with main function'
  },
  
  rust: {
    extension: '.rs',
    defaultName: 'main.rs',
    template: `fn main() {
    println!("Hello, World!");
}
`,
    description: 'Rust program with main function'
  },
  
  go: {
    extension: '.go',
    defaultName: 'main.go',
    template: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
`,
    description: 'Go program with main function'
  },
  
  typescript: {
    extension: '.ts',
    defaultName: 'main.ts',
    template: `// TypeScript program
// Write your code here

function main(): void {
    console.log("Hello, World!");
}

main();
`,
    description: 'TypeScript file with main function'
  },
  
  html: {
    extension: '.html',
    defaultName: 'index.html',
    template: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
`,
    description: 'HTML document template'
  },
  
  css: {
    extension: '.css',
    defaultName: 'style.css',
    template: `/* CSS Styles */
/* Write your styles here */

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
    text-align: center;
}
`,
    description: 'CSS stylesheet template'
  }
};

export const getTemplateForLanguage = (language: string): LanguageTemplate => {
  return languageTemplates[language] || languageTemplates.python;
};

export const getDefaultFileName = (language: string): string => {
  const template = getTemplateForLanguage(language);
  return template.defaultName;
};

export const getFileExtension = (language: string): string => {
  const template = getTemplateForLanguage(language);
  return template.extension;
};

export const getLanguageFromExtension = (filename: string): string => {
  const extension = filename.substring(filename.lastIndexOf('.'));
  
  for (const [lang, template] of Object.entries(languageTemplates)) {
    if (template.extension === extension) {
      return lang;
    }
  }
  
  return 'python'; // Default fallback
};

export const getSupportedLanguages = (): string[] => {
  return Object.keys(languageTemplates);
};