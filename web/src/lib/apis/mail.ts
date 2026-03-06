"use server";

import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";

const credential = new ClientSecretCredential(
    process.env.TENANT_ID!,
    process.env.CLIENT_ID!,
    process.env.CLIENT_SECRET!
);

const client = Client.initWithMiddleware({
    authProvider: {
        getAccessToken: async () => {
            const token = await credential.getToken(
                "https://graph.microsoft.com/.default"
            );
            return token!.token;
        }
    }
});

export async function sendMail({subject, content, to}: {subject: string, content: string, to: string}) {
    try {
        await client.api("/users/WebsiteEnquiries@Senkoun.co.uk/sendMail").post({
            message: {
                subject: subject,
                body: {
                    contentType: "HTML",
                    content: content
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: to
                        }
                    }
                ]
            }
        });
    } catch (error) {
        throw error
    }
}


export async function sendMailToAdmin({subject, content}: {subject: string, content: string}) {
    try {
    await sendMail({
        subject: subject,
        content: content,
        to: process.env.ADMIN_EMAIL!
    })
    } catch (error) {
        console.error(error)
    }
}