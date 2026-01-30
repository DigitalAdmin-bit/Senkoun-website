import axiosApi from "@/lib/axios-api";

export async function createEnquiry(data: {
    type: string;
    home: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
}) {
    await axiosApi.post("/esquires", {
        data: {
            type: data.type,
            home: {
                connect: [data.home]
            },
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            message: data.message,
        }
    });
}


export async function createBookACall(data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    preferred_date: string;
    preferred_time: string;
    home: string;
}) {
    await axiosApi.post("/book-a-calls", {
        data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            preferred_date: data.preferred_date,
            preferred_time: data.preferred_time,
            home: {
                connect: [data.home]
            },
        }
    });
}

export async function createBookATour(data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    preferred_date: string;
    preferred_time: string;
    home: string;
}) {
    await axiosApi.post("/book-a-tours", {
        data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            preferred_date: data.preferred_date,
            preferred_time: data.preferred_time,
            home: {
                connect: [data.home]
            },
        }
    });
}