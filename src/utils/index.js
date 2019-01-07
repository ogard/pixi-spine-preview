export const convertUrlToBase64 = fileUrl => atob(fileUrl.split(',').pop())
