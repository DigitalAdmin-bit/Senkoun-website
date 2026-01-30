import axiosApi from "@/lib/axios-api";


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
}