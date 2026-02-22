export type Resource<T> = | {status:"loading"} | {status:"success",data:T} | {status:"failure",error:string};

export const Loading =<T>(): Resource<T> =>({status:"loading"});

export const Success=<T>(data:T):Resource<T> =>({status:"success",data});

