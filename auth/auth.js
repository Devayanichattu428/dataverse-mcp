import dotenv from "dotenv";
import { ConfidentialClientApplication } from "@azure/msal-node";

dotenv.config();

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET
    }
};

const cca = new ConfidentialClientApplication(msalConfig);

export async function getAccessToken() {
    const response = await cca.acquireTokenByClientCredential({
        scopes: [`${process.env.DATAVERSE_URL}/.default`]
    });

    return response.accessToken;
}