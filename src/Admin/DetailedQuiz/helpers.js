export const shuffleAnswers = (question) => {
    if (!question) {
        return [];
    }
    const unshuffledAnswers = [
        question.correctAnswer,
        ...question.incorrectAnswers
    ];
    const array = new Uint32Array(10);
    return unshuffledAnswers
        .map((a) => ({ sort: self.crypto.getRandomValues(array), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
};
