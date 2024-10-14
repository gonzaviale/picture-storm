export const validateRequiredField = (field: string, value: any) => {
    if (!value) {
        throw new Error(`${field} field is required`);
    }
}