import 'next-auth'

declare module 'next-auth'{ //redefine existing User of next-auth
    interface User{  
        _id?: string //?->optional
        isVerified?: boolean
        isAccepetingMessages?: boolean
        username?: string
    }
}