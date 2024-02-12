export const getUrlFile = (props: { endpoint: string; fileName: string }) => {
    const { endpoint, fileName } = props;
    const protocol = window.location.protocol;
    const host = window.location.host;
    const getterUrl = `${protocol}//${host}/${endpoint}/${fileName}`;
};
