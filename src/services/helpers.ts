export const retriveLocalStorage = <T>(key: string) => {
    const object = localStorage.getItem(key) || ''
    if(!object){
        return object as T
    }
    const parse = JSON.parse(object)
    return parse as T
}