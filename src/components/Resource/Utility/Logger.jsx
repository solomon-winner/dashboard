
const isProduction = process.env.NODE_ENV === 'production';

export const log = (...args) => {
   const isProduction = true;
 if (!isProduction) {
    log(...args);
 }
};