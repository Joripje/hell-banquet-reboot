export default function Validation(params) {
    const { input, form } = params

    if (input === undefined || input === '') {
        return {isVaild: false, message: 'null'}
    } else if (!form.test(input)) {
        return {isVaild: false, message: 'form'}
    } else {
        return {isValid: true}
    }
}