import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import {z} from "zod"
import { usernameValidation } from "@/schemas/SignUpSchema"

//query schema, std practice to put schema at end of variable

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
    //todo:use in all other routes
    console.log(`Recieved request with method : ${request.method}`)

    //no need this is old now
    // if(request.method!=='GET'){
    //     return Response.json(
    //         {
    //             success: false,
    //             message: "Only GET requests allowed"
    //         }, {status: 405})
    //     }

    // }
    await dbConnect()
    // localhost:3000/api/cuu?username=neha?phone=android -> searching param for username

    try{
        const {searchParams} = new URL(request.url)
        //we created an object by doing {} as it's syntax
        const queryParam = {
            username: searchParams.get('username')
        }
        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result)

        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length>0? usernameErrors.join(', '):"Inavlid query parameters",
            },{status: 400})
        }

        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})
        
        if(existingVerifiedUser){
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken"
                }, {status: 400})
            }

            return Response.json(
                {
                    success: true,
                    message: "Usernamer is unique"
                },{status: 400})


    }catch(error){
        console.error("Error check username", error)
        return Response.json(
        {
            success: false,
            message: "Error checking username"
        },
        {status: 500}
    )
    }
}

//21 minute
