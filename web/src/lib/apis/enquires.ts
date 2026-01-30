import axiosApi from "@/lib/axios-api";

export async function createEnquiry(data: {
    type: string;
    home: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
}) {
    await axiosApi.post("/esquires", {data});
}
