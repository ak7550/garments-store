//todo: set the alert message with error, field to get the age

import ErrorComponent from "./ErrorComponent";

//_ most of the errors are in json format, log them before formating
export const handleError = error => <ErrorComponent error={error} />
