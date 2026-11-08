function removeDuplicates(nums: number[]): number {
    const uniqueNumbers = [...new Set(nums)];
    const k = uniqueNumbers.length;

    for (let i = 0; i < k; i++) {
        nums[i] = uniqueNumbers[i];
    }

    return k;
}