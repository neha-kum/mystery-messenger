import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"  //to check password 
import dbConnect from "@/lib/dbConnect"; //to check if user registered
import UserModel from "@/model/User";

//export so that we can use it in route.ts 
export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" },
              },
              async authorize(credentials:any): Promise<any>{ //accepts credentials as written in doc //we will get a promise
                await dbConnect() //wait for query to complete b4 moving to next line
                try{
                        const user = await UserModel.findOne({ //userModel -> mongoDB collection
                            $or : [  //mongodb operator -> return a document if at least 1 conditions inside arr is true
                                {email: credentials.identifier},
                                {username: credentials.identifier},
                            ]
                        })
                        if(!user){
                            throw new Error("No username found with this email")
                        }

                        if(!user.isVerified){
                            throw new Error("Please verify your account before login")
                        }

                    const isPasswordCorrect = await bcrypt.compare(user.password, credentials.password) //inconsistency -> above credentials.identifier was used
                    if(isPasswordCorrect){
                        return user  
                    }
                    else{
                        throw new Error("Incorrect Password")

                    }
                }catch(err : any){
                    throw new Error(err) //catch err and wraps it in object
                }
              },
    }),
    ],
    callbacks: {
        
        async jwt({ token, user}) {
            if(user){  //iserting data into token so we don't hv to query database again and again
                token.id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages
                token.username = user.username
            }
          return token
        },
        async session({ session, token }) { //removed user bcuz nextauth user very basic whereas we made custom user
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessages = token.isAcceptingMessages
                session.user.username = token.username 
            }
          return session
        }
    },
    pages : {
        signIn: '/sign-in' //sign-in control goes to next auth->design sign-in page by itself
    },
    session : {
        strategy : "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET
} 