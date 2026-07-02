import { z } from "zod";
import { getFaculties, getFacultyByName } from "../services/dataverseService.js";

export function registerFacultyTools(server) {

    server.registerTool(
        "list_faculties",
        {
            description: "Returns all faculties from Dataverse.",
            inputSchema: {}
        },
        async () => {
            const faculties = await getFaculties();

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(faculties, null, 2)
                    }
                ]
            };
        }
    );

    server.registerTool(
        "get_faculty_by_name",
        {
            description: "Returns faculty details by faculty name.",
            inputSchema: {
                facultyName: z.string()
            }
        },
        async ({ facultyName }) => {
            const faculty = await getFacultyByName(facultyName);

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(faculty, null, 2)
                    }
                ]
            };
        }
    );

}