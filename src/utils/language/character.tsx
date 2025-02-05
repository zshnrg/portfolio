export function isVowel(character: string): boolean {
    return ["a", "i", "u", "e", "o"].includes(character.toLowerCase());
}

export function isConsonant(character: string): boolean {
    return !isVowel(character);
}