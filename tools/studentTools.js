import { z } from "zod";
import { getStudents, getStudentByName } from "../services/dataverseService.js";

export function registerStudentTools(server) {
    server.registerTool(
        "list_students",
        {
            description: "Returns all students from the Dataverse Student table.",
            inputSchema: {}
        },
        async () => {
            const students = await getStudents();

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(students, null, 2)
                    }
                ]
            };
        }
    );

    server.registerTool(
    "get_student_by_name",
    {
        description: "Returns a student by student name.",
        inputSchema: {
            studentName: z.string()
        }
    },
    async ({ studentName }) => {
        const student = await getStudentByName(studentName);

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(student, null, 2)
                }
            ]
        };
    }
);
}

