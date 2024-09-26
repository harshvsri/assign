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
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";

// Main CreateAssignment component
export function CreateAssignment() {
  const authHeader = useAuthHeader();
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    course: "BTECH",
    year: "YEAR_4",
    branch: "CSE",
    dueDate: "",
    problems: [],
  });

  const handleAssignmentChange = (updatedAssignment) => {
    setAssignment((prev) => ({ ...prev, ...updatedAssignment }));
  };

  const addProblem = () => {
    setAssignment((prev) => ({
      ...prev,
      problems: [
        ...prev.problems,
        {
          title: "",
          description: "",
          starterCode: "",
          difficulty: "EASY",
          examples: [],
          testCases: [],
        },
      ],
    }));
  };

  const updateProblem = (index, updatedProblem) => {
    setAssignment((prev) => ({
      ...prev,
      problems: prev.problems.map((p, i) => (i === index ? updatedProblem : p)),
    }));
  };

  const removeProblem = (index) => {
    setAssignment((prev) => ({
      ...prev,
      problems: prev.problems.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting assignment:", assignment);
    // Here you would typically send the assignment data to your backend
    const res = await axios.post(
      `${import.meta.env.VITE_ASSIGN_API}/api/assignment`,
      assignment,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );
    console.log("Assignment created:", res.data);
  };

  return (
    <div className="container mx-auto p-6 border rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <AssignmentDetails
              assignment={assignment}
              onChange={handleAssignmentChange}
            />
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Problems</h2>
          {assignment.problems.map((problem, index) => (
            <ProblemCard
              key={index}
              problem={problem}
              index={index}
              onUpdate={(updatedProblem) =>
                updateProblem(index, updatedProblem)
              }
              onRemove={() => removeProblem(index)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4 items-start">
          <Button type="button" variant="outline" onClick={addProblem}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Problem
          </Button>

          <Button type="submit">Create Assignment</Button>
        </div>
      </form>
    </div>
  );
}

// AssignmentDetails component
function AssignmentDetails({ assignment, onChange }) {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={assignment.title}
            onChange={(e) => onChange({ title: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={assignment.dueDate}
            onChange={(e) => onChange({ dueDate: e.target.value })}
            required
            className="w-full"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={assignment.description}
          onChange={(e) => onChange({ description: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div>
          <Label htmlFor="course">Course</Label>
          <Select
            value={assignment.course}
            onValueChange={(value) => onChange({ course: value })}
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
            value={assignment.year}
            onValueChange={(value) => onChange({ year: value })}
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
            value={assignment.branch}
            onValueChange={(value) => onChange({ branch: value })}
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
  );
}

// ProblemCard component
function ProblemCard({ problem, index, onUpdate, onRemove }) {
  const handleChange = (field, value) => {
    onUpdate({ ...problem, [field]: value });
  };

  const addExample = () => {
    onUpdate({
      ...problem,
      examples: [
        ...problem.examples,
        { input: "", output: "", explanation: "" },
      ],
    });
  };

  const updateExample = (exampleIndex, updatedExample) => {
    const updatedExamples = problem.examples.map((ex, i) =>
      i === exampleIndex ? updatedExample : ex
    );
    onUpdate({ ...problem, examples: updatedExamples });
  };

  const removeExample = (exampleIndex) => {
    const updatedExamples = problem.examples.filter(
      (_, i) => i !== exampleIndex
    );
    onUpdate({ ...problem, examples: updatedExamples });
  };

  const addTestCase = () => {
    onUpdate({
      ...problem,
      testCases: [...problem.testCases, { input: "", expectedOutput: "" }],
    });
  };

  const updateTestCase = (testCaseIndex, updatedTestCase) => {
    const updatedTestCases = problem.testCases.map((tc, i) =>
      i === testCaseIndex ? updatedTestCase : tc
    );
    onUpdate({ ...problem, testCases: updatedTestCases });
  };

  const removeTestCase = (testCaseIndex) => {
    const updatedTestCases = problem.testCases.filter(
      (_, i) => i !== testCaseIndex
    );
    onUpdate({ ...problem, testCases: updatedTestCases });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Problem {index + 1}</CardTitle>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={onRemove}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor={`problem-title-${index}`}>Title</Label>
          <Input
            id={`problem-title-${index}`}
            value={problem.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor={`problem-description-${index}`}>Description</Label>
          <Textarea
            id={`problem-description-${index}`}
            value={problem.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor={`problem-starter-code-${index}`}>Starter Code</Label>
          <Textarea
            id={`problem-starter-code-${index}`}
            value={problem.starterCode}
            onChange={(e) => handleChange("starterCode", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor={`problem-difficulty-${index}`}>Difficulty</Label>
          <Select
            value={problem.difficulty}
            onValueChange={(value) => handleChange("difficulty", value)}
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
            <ExampleCard
              key={exampleIndex}
              example={example}
              index={exampleIndex}
              onUpdate={(updatedExample) =>
                updateExample(exampleIndex, updatedExample)
              }
              onRemove={() => removeExample(exampleIndex)}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addExample}
            className="mt-2"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Example
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
          {problem.testCases.map((testCase, testCaseIndex) => (
            <TestCaseCard
              key={testCaseIndex}
              testCase={testCase}
              index={testCaseIndex}
              onUpdate={(updatedTestCase) =>
                updateTestCase(testCaseIndex, updatedTestCase)
              }
              onRemove={() => removeTestCase(testCaseIndex)}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTestCase}
            className="mt-2"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Test Case
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ExampleCard component
function ExampleCard({ example, index, onUpdate, onRemove }) {
  const handleChange = (field, value) => {
    onUpdate({ ...example, [field]: value });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-base">Example {index + 1}</CardTitle>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={onRemove}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Input
            placeholder="Input"
            value={example.input}
            onChange={(e) => handleChange("input", e.target.value)}
          />
          <Input
            placeholder="Output"
            value={example.output}
            onChange={(e) => handleChange("output", e.target.value)}
          />
          <Input
            placeholder="Explanation"
            value={example.explanation}
            onChange={(e) => handleChange("explanation", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// TestCaseCard component
function TestCaseCard({ testCase, index, onUpdate, onRemove }) {
  const handleChange = (field, value) => {
    onUpdate({ ...testCase, [field]: value });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-base">Test Case {index + 1}</CardTitle>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={onRemove}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Input
            placeholder="Input"
            value={testCase.input}
            onChange={(e) => handleChange("input", e.target.value)}
          />
          <Input
            placeholder="Expected Output"
            value={testCase.expectedOutput}
            onChange={(e) => handleChange("expectedOutput", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
