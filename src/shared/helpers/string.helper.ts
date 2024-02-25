export const arrayConjunction = (list: string[]) => {
    const conjunction = new Intl.ListFormat('en-US', {
        style: 'long',
        type: 'conjunction',
    });
    return conjunction.format(list);
};
