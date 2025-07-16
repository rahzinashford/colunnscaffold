export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
}

// Mock input function for Python
let mockInput: string[] = [];
let inputIndex = 0;

export const executeCode = async (code: string, language: string): Promise<ExecutionResult> => {
  const startTime = Date.now();
  
  try {
    if (language === 'python') {
      return await executePython(code);
    } else if (language === 'javascript') {
      return executeJavaScript(code);
    } else {
      return {
        success: false,
        output: '',
        error: `Code execution not supported for ${language}. Only syntax highlighting is available.`,
        executionTime: Date.now() - startTime
      };
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      executionTime: Date.now() - startTime
    };
  }
};

const executePython = async (code: string): Promise<ExecutionResult> => {
  const startTime = Date.now();
  
  try {
    // Load Pyodide if not already loaded
    if (!(window as any).pyodide) {
      try {
        const pyodide = await loadPyodide();
        (window as any).pyodide = pyodide;
      } catch (loadError) {
        return {
          success: false,
          output: '',
          error: `Failed to load Python environment: ${loadError}. Please refresh the page and try again.`,
          executionTime: Date.now() - startTime
        };
      }
    }
    
    const pyodide = (window as any).pyodide;
    
    // Capture output
    let output = '';
    
    // Mock input function
    mockInput = [];
    inputIndex = 0;
    
    try {
      // Override input function to use mock inputs
      pyodide.runPython(`
import sys
from io import StringIO

# Capture stdout
old_stdout = sys.stdout
sys.stdout = StringIO()

# Mock input function
def mock_input(prompt=""):
    print(prompt, end="")
    return "test_input"

# Replace built-in input with mock
import builtins
builtins.input = mock_input
`);
      
      // Execute the user code
      pyodide.runPython(code);
      
      // Get the output
      output = pyodide.runPython('sys.stdout.getvalue()');
      
      // Restore stdout
      pyodide.runPython('sys.stdout = old_stdout');
      
      return {
        success: true,
        output: output || 'Code executed successfully (no output)',
        executionTime: Date.now() - startTime
      };
    } catch (pythonError) {
      // Restore stdout even on error
      try {
        pyodide.runPython('sys.stdout = old_stdout');
      } catch (restoreError) {
        // Ignore restore errors
      }
      
      return {
        success: false,
        output: output,
        error: `Python Error: ${pythonError}`,
        executionTime: Date.now() - startTime
      };
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: `Failed to initialize Python environment: ${error}`,
      executionTime: Date.now() - startTime
    };
  }
};

const executeJavaScript = (code: string): ExecutionResult => {
  const startTime = Date.now();
  
  try {
    // Capture console output
    let output = '';
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.log = (...args) => {
      output += args.join(' ') + '\n';
    };
    
    console.error = (...args) => {
      output += 'ERROR: ' + args.join(' ') + '\n';
    };
    
    console.warn = (...args) => {
      output += 'WARNING: ' + args.join(' ') + '\n';
    };
    
    // Mock prompt function
    const originalPrompt = window.prompt;
    window.prompt = (message) => {
      output += (message || 'Input: ') + 'test_input\n';
      return 'test_input';
    };
    
    // Execute the code
    try {
      // Wrap code in try-catch to handle runtime errors
      const wrappedCode = `
        try {
          ${code}
        } catch (error) {
          console.error('Runtime Error:', error.message);
          throw error;
        }
      `;
      
      // Use Function constructor to avoid eval
      const func = new Function(wrappedCode);
      func();
      
      return {
        success: true,
        output: output || 'Code executed successfully (no output)',
        executionTime: Date.now() - startTime
      };
    } catch (jsError) {
      return {
        success: false,
        output: output,
        error: `JavaScript Error: ${jsError}`,
        executionTime: Date.now() - startTime
      };
    } finally {
      // Restore original functions
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      window.prompt = originalPrompt;
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: `Failed to execute JavaScript: ${error}`,
      executionTime: Date.now() - startTime
    };
  }
};

// Load Pyodide
const loadPyodide = async () => {
  if (!(window as any).loadPyodide) {
    // Load Pyodide from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
    document.head.appendChild(script);
    
    return new Promise((resolve, reject) => {
      script.onload = async () => {
        try {
          const pyodide = await (window as any).loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
          });
          resolve(pyodide);
        } catch (error) {
          reject(error);
        }
      };
      script.onerror = reject;
    });
  } else {
    return await (window as any).loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
    });
  }
};
