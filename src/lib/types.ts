export interface Problem {
  title: string;
  description: string;
  difficulty: string;
  examples: Example[];
  testCases: TestCase[];
  starterCode: string;
}

export interface Example {
  input: string;
  output: string;
  explanation: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Result {
  compile_output: string;
  memory: number;
  message: null;
  status: Status;
  stderr: string;
  stdout: string;
  time: string;
}

export interface Status {
  id: number;
  description: string;
}
