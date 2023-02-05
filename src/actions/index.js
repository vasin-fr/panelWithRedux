export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDelete = (id) => {
    return {
        type: 'HEROES_DELETE',
        payload: id
    }
}

export const heroesAdding = (heroes) => {
    return {
        type: 'HEROES_ADDING',
        payload: heroes
    }
}

export const filteringHeroes = (heroes) => {
    return {
        type: 'HEROES_FILTERING',
        payload: heroes
    }
}
export const filterHeroes = (heroes) => {
    return {
        type: 'HEROES_FILTER',
        payload: heroes
    }
}