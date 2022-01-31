function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function shuffleIsValid(array, shuffledArray) {
    let isValid = true;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < shuffledArray.length; j++) {
            if (array[i] === shuffledArray[j] && i === j) {
                isValid = false;
                break;
            }
        }
    }

    return isValid;
}

function shuffleArrayCompleted(array) {
    const shuffledArray = shuffle([...array]);


    if (!shuffleIsValid(array, shuffledArray)) {
        return shuffleArrayCompleted(array);
    }


    return shuffledArray;
}

export default {
    shuffle,
    shuffleIsValid,
    shuffleArrayCompleted
}