const flattenZodError = (error) => {
    console.log(error.format())
    let formatted = {}
    const flatten = (err_obj, path = '') => {
        for(const [key, value] of Object.entries(err_obj)){
            const newPath = path ? `${path}.${key}` : key
            if(value?._errors?.length){
                formatted[newPath] = value._errors[0]
            }
            if(typeof value === 'object' && !Array.isArray(value)){
                flatten(value, newPath)
            }
        }
    }
    flatten(error.format())
    return formatted
}

module.exports = flattenZodError