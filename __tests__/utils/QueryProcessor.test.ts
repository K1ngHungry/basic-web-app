import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "Rohan"
          ));
    })

    test('should return Andrew ID', () => {
        const query = "What is your Andrew ID?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("kevindai");
    })

    test('should return sum of two numbers', () => {
        const query = "What is 62 plus 40?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("102");
    })

    test('should return the largest of three numbers', () => {
        const query = "Which of the following numbers is the largest: 48, 62, 94?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("94");
    })
});