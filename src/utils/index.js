export { default as FPSMeter } from './fpsMeter'

export const convertUrlToBase64 = fileUrl => atob(fileUrl.split(',').pop())
