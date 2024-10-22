const { sumArray, filterEvenNumbers, sortByName } = require('../main');

describe('sumArray', () => {
    it('should return the sum of all numbers in an array', () => {
        const result = sumArray([1, 2, 3, 4]);

        expect(result).toBe(10);
    });

    it.each([
        null,
        undefined,
        '',
        []
    ])('should return 0 if input is %p', (value) => {
        const result = sumArray(value);

        expect(result).toBe(0);
    });

    it('should handle an array of negative numbers correctly', () => {
        const result = sumArray([-1, -2, -3]);

        expect(result).toBe(-6);
        expect(result).toBeLessThan(0);
    });

    it('should handle mixed positive and negative numbers', () => {
        const result = sumArray([5, -3, 2]);

        expect(result).toBe(4);
        expect(result).toBeGreaterThan(0);
    });
});

describe('filterEvenNumbers', () => {
    it('should return only even numbers from the array', () => {
        const result = filterEvenNumbers([1, 2, 3, 4]);

        expect(result).toEqual([2, 4]);
    });

    it('should return an empty array if no even numbers are present', () => {
        const result = filterEvenNumbers([1, 3, 5]);

        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it.each([
        null,
        undefined,
        '',
        []
    ])('should return an empty array if input is %s', (value) => {
        const result = filterEvenNumbers(value);

        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it('should handle an array of negative even and odd numbers', () => {
        const result = filterEvenNumbers([-1, -2, -3, -4]);

        expect(result).toEqual([-2, -4]);
    });
});

describe('sortByName', () => {
    it('should sort an array of objects by the name property alphabetically', () => {
        const input = [
            { name: 'John', age: 25 },
            { name: 'Anna', age: 20 },
            { name: 'Mike', age: 30 }
        ];

        const result = sortByName(input);

        const expected = [
            { name: 'Anna', age: 20 },
            { name: 'John', age: 25 },
            { name: 'Mike', age: 30 }
        ];

        expect(result).toEqual(expected);
        expect(result).toHaveLength(3);
    });

    it('should return the same array if it contains only one element', () => {
        const input = [{ name: 'John', age: 25 }];

        const result = sortByName(input);

        expect(result).toEqual(input);
        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('name', 'John');
    });

    it('should handle an array with duplicate names correctly', () => {
        const input = [
            { name: 'John', age: 25 },
            { name: 'John', age: 30 },
            { name: 'Anna', age: 20 }
        ];

        const result = sortByName(input);

        const expected = [
            { name: 'Anna', age: 20 },
            { name: 'John', age: 25 },
            { name: 'John', age: 30 }
        ];

        expect(result).toEqual(expected);
        expect(result).toHaveLength(3);
    });
});
