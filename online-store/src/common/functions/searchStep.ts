export default function searchStep(min: number, max: number, list: number[]): number {
    const range = max - min;
    const valuesRemainingBooks = [...new Set(list)].length;
    let step = Math.floor(range / valuesRemainingBooks);
    while (step > 1) {
        const result = list.every((el) => el % step === 0);
        if (result) {
            return step;
        }
        step = step - 1;
    }
    return 1;
}
