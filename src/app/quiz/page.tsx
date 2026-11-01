import type { Metadata } from "next";
import { Quiz } from "../../components/Quiz";

export const metadata: Metadata = {
  title: "Take the quiz | BitElevate Lab Matcher",
  description: "Answer five questions to find the BitElevate lab that fits you.",
};

export default function QuizPage() {
  return <Quiz />;
}
