import { Request } from 'express';

export const getUrlFile = (props: {
    endpoint: string;
    fileName: string;
    req: Request;
}) => {
    const { endpoint, fileName, req } = props;
    const protocol = req.protocol;
    const host = req.get('host');
    const getterUrl = `${protocol}://${host}${endpoint}/${fileName}`;
    return getterUrl;
};
