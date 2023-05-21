import { Question } from "./question.interface";

export interface Quiz {
    response_code: number;
    results: Question[];
}