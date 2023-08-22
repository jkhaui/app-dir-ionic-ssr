export const throwError = (errors: [condition: boolean, message: string][]) => {
  errors.forEach((element) => {
    const [condition, message] = element;

    if (condition) {
      throw new Error(message);
    }
  });
};
