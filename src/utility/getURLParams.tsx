export default (url:any) => {
    const paramString = url.includes('?') ? url.split('?')[1].split('&') : [];
    const params:any = {};
    
    paramString.forEach((param:any) => { 
        const paramSplit:any = param.split('=');
        params[paramSplit[0]] = paramSplit[1];
    });

    return params;
};
