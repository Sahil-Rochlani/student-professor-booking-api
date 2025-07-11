
// Function to flatten the Zod error object
const flattenZodError = (error) => {

    let formatted = {}

    // Recursively flattens the nested error structure
    const flatten = (err_obj, path = '') => {
        for(const [key, value] of Object.entries(err_obj)){

            // Concatenates nested paths
            const newPath = path ? `${path}.${key}` : key

            // If current field has any errors, store the first error message
            if(value?._errors?.length){
                formatted[newPath] = value._errors[0]
            }

            // Calls the function if the current value is an object and doesn't contain _errors array
            if(typeof value === 'object' && !Array.isArray(value)){
                flatten(value, newPath)
            }
        }
    }
    flatten(error.format())
    return formatted
}

module.exports = flattenZodError