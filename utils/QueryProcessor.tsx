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

  const plusMatch = query.match(/what is (\d+) plus (\d+)/i);
  if (plusMatch) {
    return String(Number(plusMatch[1]) + Number(plusMatch[2]));
  }

  const multMatch = query.match(/what is (\d+) multiplied by (\d+)/i);
  if (multMatch) {
    return String(Number(multMatch[1]) * Number(multMatch[2]));
  }

  const largestMatch = query.match(/Which of the following numbers is the largest:\s*(\d+),\s*(\d+),\s*(\d+)/i);
  if (largestMatch) {
    return String(Math.max(Number(largestMatch[1]), Number(largestMatch[2]), Number(largestMatch[3])));
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
