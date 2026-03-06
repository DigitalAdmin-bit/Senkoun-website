import axiosApi from "@/lib/axios-api";
import {sendMailToAdmin} from "@/lib/apis/mail";
import {formatString} from "@/lib/utils";
import enquiryHTML from "@/views/enquiry-html";
import bookACallHTML from "@/views/book-a-call-html";
import bookATourHTML from "@/views/book-a-tour-html";
import careerEnquiryHTML from "@/views/career-enquiry-html";

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

    sendMailToAdmin({
        subject: `${data.first_name} has made an enquiry`,
        content: formatString(enquiryHTML, {
            type: data.type,
            home: data.home,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            message: data.message,
        })
    })
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

    sendMailToAdmin({
        subject: `${data.first_name} made a new book a call Request`,
        content: formatString(bookACallHTML, {
            home: data.home,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            preferred_date: data.preferred_date,
            preferred_time: data.preferred_time,
        })
    })
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

    sendMailToAdmin({
        subject: `${data.first_name} made a new book a tour request`,
        content: formatString(bookATourHTML, {
            home: data.home,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            preferred_date: data.preferred_date,
            preferred_time: data.preferred_time,
        })
    })
}

export async function createCareerEnquiry(data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
    resume: File;
    cover_letter: File;
}) {

    // Step 1: Upload resume file
    const resumeFormData = new FormData();
    resumeFormData.append('files', data.resume);

    const resumeUploadResponse = await axiosApi.post("/upload", resumeFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const uploadedResume = resumeUploadResponse.data[0];

    // Step 2: Upload cover letter file
    const coverLetterFormData = new FormData();
    coverLetterFormData.append('files', data.cover_letter);

    const coverLetterUploadResponse = await axiosApi.post("/upload", coverLetterFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const uploadedCoverLetter = coverLetterUploadResponse.data[0];

    // Step 3: Create the career enquiry with file IDs
    await axiosApi.post("/career-enquiries", {
        data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            resume: uploadedResume.id,
            cover_letter: uploadedCoverLetter.id,
        }
    });

    sendMailToAdmin({
        subject: `${data.first_name} made a new career application`,
        content: formatString(careerEnquiryHTML, {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            message: data.message,
        })
    })
}
