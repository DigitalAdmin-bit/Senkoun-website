import axiosApi from "@/lib/axios-api";
import {sendMailToAdmin} from "@/lib/apis/mail";
import {formatString} from "@/lib/utils";
import brochureHTML from "@/views/brochure-html";


export async function createBrochureDownload(data: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    home: string;
}): Promise<void> {
    await axiosApi.post("/brochure-downloads", {
        data: {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            email: data.email,
            home: {
                connect: [data.home]
            },
        }
    });



    sendMailToAdmin({
        subject: "New brochure download request",
        content: formatString(brochureHTML, {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            email: data.email,
        })
    })
}