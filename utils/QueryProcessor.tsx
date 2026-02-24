export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "kevindai";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "kevindai";
  }

  const arithmeticOps = ["plus", "minus", "multiplied by", "divided by"];
  if (arithmeticOps.some((op) => query.toLowerCase().includes(op)) && !query.toLowerCase().includes("remainder")) {
    const tokens = query.match(/\d+|multiplied by|divided by|plus|minus/gi) || [];
    if (tokens.length >= 1) {
      let result = Number(tokens[0]);
      for (let i = 1; i + 1 < tokens.length; i += 2) {
        const op = tokens[i].toLowerCase();
        const operand = Number(tokens[i + 1]);
        if (op === "plus") result += operand;
        else if (op === "minus") result -= operand;
        else if (op === "multiplied by") result *= operand;
        else if (op === "divided by") result /= operand;
      }
      return String(result);
    }
  }

  if (query.toLowerCase().includes("to the power of")) {
    const match = query.match(/(\d+) to the power of (\d+)/i);
    if (match) return String(Math.pow(Number(match[1]), Number(match[2])));
  }

  if (query.toLowerCase().includes("square root of")) {
    const match = query.match(/square root of (\d+)/i);
    if (match) return String(Math.sqrt(Number(match[1])));
  }

  if (query.toLowerCase().includes("remainder")) {
    const match = query.match(/(\d+) is divided by (\d+)/i);
    if (match) return String(Number(match[1]) % Number(match[2]));
  }

  if (query.toLowerCase().includes("largest")) {
    const match = query.match(/largest:\s*(\d+),\s*(\d+),\s*(\d+)/i);
    if (match) return String(Math.max(Number(match[1]), Number(match[2]), Number(match[3])));
  }

  if (query.toLowerCase().includes("smallest")) {
    const match = query.match(/smallest:\s*(\d+),\s*(\d+),\s*(\d+)/i);
    if (match) return String(Math.min(Number(match[1]), Number(match[2]), Number(match[3])));
  }

  if (query.toLowerCase().includes("primes")) {
    const numbers = (query.match(/\d+/g) || []).map(Number);
    const isPrime = (n: number) => {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    };
    return numbers.filter(isPrime).join(", ");
  }

  if (query.toLowerCase().includes("square and a cube")) {
    const numbers = (query.match(/\d+/g) || []).map(Number);
    const result = numbers.find((n) => {
      const isSquare = Math.round(Math.sqrt(n)) ** 2 === n;
      const isCube = Math.round(Math.cbrt(n)) ** 3 === n;
      return isSquare && isCube;
    });
    return result !== undefined ? String(result) : "";
  }

  return "";
}
