import {sendMail} from "@/lib/apis/mail";


export async function GET() {
    console.log("Sending test email...");

    await sendMail("fbn776@gmail.com");

    return new Response("Test email sent");
}