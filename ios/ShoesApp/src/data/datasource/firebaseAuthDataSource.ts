import auth from "@react-native-firebase/auth";

export const firebaseDataSource ={//datasource object

    login: async(email:string,password:string)=>{//basically we were doing invoke

        return  auth().signInWithEmailAndPassword(email,password);
    },

    signup: async(email:string,password:string) => {

        return auth().createUserWithEmailAndPassword(email,password);

    },

    logout: async()=>{

        return  auth().signOut();

    },
    forgot: async(email:string)=>{
        return auth().sendPasswordResetEmail(email);
    },

    getCurrentUser:async()=>{

        return auth().currentUser;
    }

}