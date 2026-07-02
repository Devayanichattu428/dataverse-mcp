require("dotenv").config();

const { ConfidentialClientApplication } = require("@azure/msal-node");
const axios = require("axios");

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET
    }
};

const cca = new ConfidentialClientApplication(msalConfig);

async function getStudents() {
    try {
        const tokenResponse = await cca.acquireTokenByClientCredential({
            scopes: [`${process.env.DATAVERSE_URL}/.default`]
        });

        const accessToken = tokenResponse.accessToken;

        const response = await axios.get(
            `${process.env.DATAVERSE_URL}/api/data/v9.2/devayani_dcstudents`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json"
                }
            }
        );

        console.log(response.data);
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

getStudents();