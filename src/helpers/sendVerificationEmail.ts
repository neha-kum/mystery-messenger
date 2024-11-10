import {resend} from "@/lib/resend"

import VerificationEmail from "../../emails/verificationEmail"

import { ApiResponse } from "@/types/ApiResponse"

//always async as email takes time, smtp server etc
export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{  //returns promise of type ApiResponse

    try{ //email fail very normal => try catch
        await resend.emails.send({ //copy from resend docs
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystery Messenger | Verification Code',
            react: VerificationEmail({username, otp:verifyCode}), //pass prop
          });
        return {success: true, message: "Verification email sent successfully"} //promise always need response => return statement
    }catch(emailError){ //name the error whatever
        console.log("Error sending verification email", emailError)
        return {success: false, message: "Failed to send verification email"}
    }

}


