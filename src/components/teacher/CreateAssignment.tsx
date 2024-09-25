"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PlusIcon, TrashIcon } from "lucide-react";

interface Example {
  input: string;
  output: string;
  explanation: string;
}

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface Problem {
  title: string;
  description: string;
  starterCode: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  examples: Example[];
  testCases: TestCase[];
}

interface Assignment {
  title: string;
  description: string;
  course: string;
  year: string;
  branch: string;
  dueDate: string;
  problems: Problem[];
}

export function CreateAssignment() {
  const [assignment, setAssignment] = useState<Assignment>({
    title: "",
    description: "",
    course: "BTECH",
    year: "YEAR_4",
    branch: "CSE",
    dueDate: "",
    problems: [],
  });

  const handleAssignmentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setAssignment({ ...assignment, [name]: value });
  };

  const addProblem = () => {
    setAssignment({
      ...assignment,
      problems: [
        ...assignment.problems,
        {
          title: "",
          description: "",
          starterCode: "",
          difficulty: "EASY",
          examples: [],
          testCases: [],
        },
      ],
    });
  };

  const removeProblem = (index: number) => {
    const updatedProblems = [...assignment.problems];
    updatedProblems.splice(index, 1);
    setAssignment({ ...assignment, problems: updatedProblems });
  };

  const handleProblemChange = (
    index: number,
    field: keyof Problem,
    value: string
  ) => {
    const updatedProblems = [...assignment.problems];
    updatedProblems[index] = { ...updatedProblems[index], [field]: value };
    setAssignment({ ...assignment, problems: updatedProblems });
  };

  const addExample = (problemIndex: number) => {
    const updatedProblems = [...assignment.problems];
    updatedProblems[problemIndex].examples.push({
      input: "",
      output: "",
      explanation: "",
    });
    setAssignment({ ...assignment, problems: updatedProblems });
  };

  const handleExampleChange = (
    problemIndex: number,
    exampleIndex: number,
    field: keyof Example,
    value: string
  ) => {
    const updatedProblems = [...assignment.problems];
    updatedProblems[problemIndex].examples[exampleIndex][field] = value;
    setAssignment({ ...assignment, problems: updatedProblems });
  };

  const removeExample = (problemIndex: number, exampleIndex: number) => {
    const updatedProblems = [...assignment.problems];
    updatedProblems[problemIndex].examples.splice(exampleIndex, 1);
    setAssignment({ ...assignment, problems: updatedProblems });
  };

  const addTestCase = (problemIndex: number) => {
    const updatedProblems = [...assignment.problems];
    updatedProblems[problemIndex].testCases.push({
      input: "",
      expectedOutput: "",
    });
    setAssignment({ ...assignment, problems: updatedProblems });
  };

  const handleTestCaseChange = (
    problemIndex: number,
    testCaseIndex: number,
    field: keyof TestCase,
    value: string
  ) => {
    const updatedProblems = [...assignment.problems];
    updatedProblems[problemIndex].testCases[testCaseIndex][field] = value;
    setAssignment({ ...assignment, problems: updatedProblems });
  };

  const removeTestCase = (problemIndex: number, testCaseIndex: number) => {
    const updatedProblems = [...assignment.problems];
    updatedProblems[problemIndex].testCases.splice(testCaseIndex, 1);
    setAssignment({ ...assignment, problems: updatedProblems });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting assignment:", assignment);
    // Here you would typically send the assignment data to your backend
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create Assignment</h1>
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={assignment.title}
                    onChange={handleAssignmentChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={assignment.dueDate}
                    onChange={handleAssignmentChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={assignment.description}
                  onChange={handleAssignmentChange}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("course", value)
                    }
                    value={assignment.course}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTECH">B.Tech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("year", value)}
                    value={assignment.year}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YEAR_1">Year 1</SelectItem>
                      <SelectItem value="YEAR_2">Year 2</SelectItem>
                      <SelectItem value="YEAR_3">Year 3</SelectItem>
                      <SelectItem value="YEAR_4">Year 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("branch", value)
                    }
                    value={assignment.branch}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CSE">CSE</SelectItem>
                      <SelectItem value="CSE_AI">CSE AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Problems</h2>
        {assignment.problems.map((problem, problemIndex) => (
          <Card key={problemIndex} className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Problem {problemIndex + 1}</CardTitle>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeProblem(problemIndex)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor={`problem-title-${problemIndex}`}>Title</Label>
                  <Input
                    id={`problem-title-${problemIndex}`}
                    value={problem.title}
                    onChange={(e) =>
                      handleProblemChange(problemIndex, "title", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`problem-description-${problemIndex}`}>
                    Description
                  </Label>
                  <Textarea
                    id={`problem-description-${problemIndex}`}
                    value={problem.description}
                    onChange={(e) =>
                      handleProblemChange(
                        problemIndex,
                        "description",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`problem-starter-code-${problemIndex}`}>
                    Starter Code
                  </Label>
                  <Textarea
                    id={`problem-starter-code-${problemIndex}`}
                    value={problem.starterCode}
                    onChange={(e) =>
                      handleProblemChange(
                        problemIndex,
                        "starterCode",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`problem-difficulty-${problemIndex}`}>
                    Difficulty
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleProblemChange(
                        problemIndex,
                        "difficulty",
                        value as "EASY" | "MEDIUM" | "HARD"
                      )
                    }
                    value={problem.difficulty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EASY">Easy</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HARD">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Examples</h3>
                  {problem.examples.map((example, exampleIndex) => (
                    <Card key={exampleIndex} className="mb-4">
                      <CardHeader className="flex flex-row items-center justify-between py-2">
                        <CardTitle className="text-base">
                          Example {exampleIndex + 1}
                        </CardTitle>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() =>
                            removeExample(problemIndex, exampleIndex)
                          }
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <Input
                            placeholder="Input"
                            value={example.input}
                            onChange={(e) =>
                              handleExampleChange(
                                problemIndex,
                                exampleIndex,
                                "input",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            placeholder="Output"
                            value={example.output}
                            onChange={(e) =>
                              handleExampleChange(
                                problemIndex,
                                exampleIndex,
                                "output",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            placeholder="Explanation"
                            value={example.explanation}
                            onChange={(e) =>
                              handleExampleChange(
                                problemIndex,
                                exampleIndex,
                                "explanation",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addExample(problemIndex)}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Example
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
                  {problem.testCases.map((testCase, testCaseIndex) => (
                    <Card key={testCaseIndex} className="mb-4">
                      <CardHeader className="flex flex-row items-center justify-between py-2">
                        <CardTitle className="text-base">
                          Test Case {testCaseIndex + 1}
                        </CardTitle>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() =>
                            removeTestCase(problemIndex, testCaseIndex)
                          }
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <Input
                            placeholder="Input"
                            value={testCase.input}
                            onChange={(e) =>
                              handleTestCaseChange(
                                problemIndex,
                                testCaseIndex,
                                "input",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            placeholder="Expected Output"
                            value={testCase.expectedOutput}
                            onChange={(e) =>
                              handleTestCaseChange(
                                problemIndex,
                                testCaseIndex,
                                "expectedOutput",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTestCase(problemIndex)}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Test Case
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addProblem}
          className="mb-4"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Problem
        </Button>

        <Button type="submit">Create Assignment</Button>
      </form>
    </div>
  );
}
