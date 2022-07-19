export default function searchStep(min: number, max: number, list: number[]): number {
    const range: number = max - min;
    const valuesRemainingBooks: number = [...new Set(list)].length;
    let step: number = Math.floor(range / valuesRemainingBooks);
    while (step > 1) {
        const result: boolean = list.every((el: number) => el % step === 0);
        if (result) {
            return step;
        }
        step = step - 1;
    }
    return 1;
}
