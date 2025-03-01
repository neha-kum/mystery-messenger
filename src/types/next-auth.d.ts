import 'next-auth'

declare module 'next-auth'{ //redefine existing User of next-auth
    interface User{  
        _id?: string //?->optional
        isVerified?: boolean
        isAcceptingMessages?: boolean
        username?: string
    }
    interface Session{
        user:{
            _id?: string
            username?: string
            isVerified?: boolean
            isAcceptingMessages?: boolean
        }& DefaultSession['user'] //rest optional so if nothing comes we have default

    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?: string
        username?: string
        isVerified?: boolean
        isAcceptingMessages?: boolean
    }
}