function sumArray(numbers) {
    if (!Array.isArray(numbers)) return 0;

    return numbers.reduce((acc, curr) => acc + curr, 0);
}

function filterEvenNumbers(numbers) {
    if (!Array.isArray(numbers)) return [];

    return numbers.filter(number => number % 2 === 0);
}

function sortByName(objects) {
    if (!Array.isArray(objects)) return [];

    return objects.sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = { sumArray, filterEvenNumbers, sortByName };
