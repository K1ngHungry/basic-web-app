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
    const rawTokens = query.match(/\d+|multiplied by|divided by|plus|minus/gi) || [];
    if (rawTokens.length >= 1) {
      const nums = rawTokens.filter((t) => /^\d+$/.test(t)).map(Number);
      const ops = rawTokens.filter((t) => !/^\d+$/.test(t)).map((t) => t.toLowerCase());

      // First pass: multiplication and division (PEMDAS)
      let i = 0;
      while (i < ops.length) {
        if (ops[i] === "multiplied by" || ops[i] === "divided by") {
          const val = ops[i] === "multiplied by" ? nums[i] * nums[i + 1] : nums[i] / nums[i + 1];
          nums.splice(i, 2, val);
          ops.splice(i, 1);
        } else {
          i++;
        }
      }

      // Second pass: addition and subtraction
      let result = nums[0];
      for (let j = 0; j < ops.length; j++) {
        if (ops[j] === "plus") result += nums[j + 1];
        else if (ops[j] === "minus") result -= nums[j + 1];
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

  if (query.toLowerCase().includes("scrabble score")) {
    const wordMatch = query.match(/scrabble score of (\w+)/i);
    if (wordMatch) {
      const scores: Record<string, number> = {
        a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, s: 1, t: 1, r: 1,
        d: 2, g: 2,
        b: 3, c: 3, m: 3, p: 3,
        f: 4, h: 4, v: 4, w: 4, y: 4,
        k: 5,
        j: 8, x: 8,
        q: 10, z: 10,
      };
      const score = wordMatch[1].toLowerCase().split("").reduce((sum, c) => sum + (scores[c] || 0), 0);
      return String(score);
    }
  }

  if (query.toLowerCase().includes("anagram")) {
    const targetMatch = query.match(/anagram of (\w+)/i);
    const candidatesMatch = query.match(/:\s*(.+)/);
    if (targetMatch && candidatesMatch) {
      const sort = (s: string) => s.toLowerCase().split("").sort().join("");
      const target = sort(targetMatch[1]);
      const candidates = candidatesMatch[1].split(",").map((w) => w.trim().replace(/\?$/, ""));
      const result = candidates.find((w) => sort(w) === target);
      return result || "";
    }
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
