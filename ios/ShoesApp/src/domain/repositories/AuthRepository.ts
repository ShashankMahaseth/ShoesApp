export interface AuthRepository{
    
    login(email:String,password:String) : Promise<Boolean>;
    
    signUp(email:String,password:String) : Promise<Boolean>;

    logout():Promise<Boolean>;

}