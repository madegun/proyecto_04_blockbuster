// IMPORTANT: Code deprecated. This part was left as sample of the search movies by title  before applying the new method.

// This function receives an 2D array and returns a array with individual elements of each array, without duplicates.
const array2D = (objectsArray) => {
    const rawElements = [];

    objectsArray.forEach(results => {
        results.forEach(element => {
            rawElements.push(element);
        })
    });

    const filteredElements = [...new Set(rawElements)];

    return filteredElements;
}

export default array2D;