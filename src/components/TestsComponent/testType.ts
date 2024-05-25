export interface questionInterface {
  question: string;
  correct: string;
  variants: string[];
}

export interface TestInterface {
  id: number;
  title: string;
  preview: string;
  questions: questionInterface[];
}

export type TestType = {
  category: string;
  tests: TestInterface[];
};
