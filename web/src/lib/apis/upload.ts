import axiosApi from "@/lib/axios-api";

/**
 * Upload a single file to Strapi
 * @param file - The file to upload
 * @returns The uploaded file data from Strapi
 */
export async function uploadFileToStrapi(file: File) {
    const formData = new FormData();
    formData.append('files', file);

    const response = await axiosApi.post("/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data[0];
}

/**
 * Upload multiple files to Strapi
 * @param files - Array of files to upload
 * @returns Array of uploaded file data from Strapi
 */
export async function uploadFilesToStrapi(files: File[]) {
    const formData = new FormData();

    files.forEach(file => {
        formData.append('files', file);
    });

    const response = await axiosApi.post("/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data; // Strapi returns an array of uploaded files
}

