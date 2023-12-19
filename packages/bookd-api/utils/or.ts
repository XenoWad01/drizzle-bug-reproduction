export const notAllOfTheseAreHere = (items: Array<never>): boolean => items.reduce((result,item) => {
    const isItemThere = !!item
    return result || !isItemThere 
}, false)



