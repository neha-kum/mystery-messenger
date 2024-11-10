import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";  //npm i bcryptjs
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

// Algorithm

// if existingUserByEmail exists then 
//    if existingUserByEmail.isverfied then
//     success : false // exist and verified both so do nothing
//     else  // exists but not verified
//     save updated password + send verifyCode

// else 
// create new user with provided details
// save new user

export async function POST(request: Request){ //function name always POST GET etc
    await dbConnect()

    // user sign-up error handle -> try catch
    try{
        const {username, password, email} = await request.json() //always use await in nextjs to take data from reponse 
              //destructure and took field from responsejson

        const existingUserVerifiedByUsername = await UserModel  //for finding existing user
        .findOne({  //has two fields: username and isVerified
            username,  //acts like username &&  isVerified
            isVerified: true //will return username only if isVerified is true
        })  

        // return false bcuz username exists
        if(existingUserVerifiedByUsername){ 
            return Response.json(
                {
                success: false,  
                message: "Username already exists and is verified"
            },{status: 400}
        )}

        const existingUserByEmail = await UserModel.findOne({email})   
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString() //generate 6 digit string
        
        //finding existing user with email
        if(existingUserByEmail){ //exists
            if(existingUserByEmail.isVerified){ //verified
                return Response.json({
                    success: false,  
                    message: "User already exists with this email"
                }, {status: 400})
            }
            else{ //not verified
            const hashedPassword = await bcrypt.hash(password, 10) //10 loop of hashing 
            existingUserByEmail.password = hashedPassword
            existingUserByEmail.verifyCode = verifyCode
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            await existingUserByEmail.save() 
            }
        }

        else{  //when user doesnt exists

            const hashedPassword = await bcrypt.hash(password, 10) //10 loop of hashing 

            const expiryDate = new Date()  //current date and time
            expiryDate.setHours(expiryDate.getHours() + 1) //1 hr from current time
             //update expiryDate          //get 0-23 hr


             //create and save new user
             const newUser = new UserModel({  
                username,
                email,
                password: hashedPassword,
                verifyCode, 
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
             })

             await newUser.save();
        }

        //send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if(!emailResponse.success){
            return Response.json({
                success: false,  
                message: emailResponse.message
            }, {status: 500})
        }

        return Response.json({
            success: true,  
            message: "User registered successfully. Please verify your email"
        }, {status: 201})


        
        


    }catch(error){
        console.error('Error registering user', error)
        return Response.json(  //response is returned in json format
            {
            success: false,
            message: "Error registering user"   
        },
        {
            status: 500
        }
    )

    }
}