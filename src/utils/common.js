export function toCapitalize(sentence) {
  return sentence
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const populateValidationErrors = (errors, setError) => {
  for (const error of errors) {
    setError(error.path, {
      type: 'manual',
      message: error.message
    })
  }
}
