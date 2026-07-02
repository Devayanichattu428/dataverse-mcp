import axios from "axios";
import { getAccessToken } from "../auth/auth.js";

export async function getStudents() {
    const accessToken = await getAccessToken();

    const response = await axios.get(
        `${process.env.DATAVERSE_URL}/api/data/v9.2/devayani_dcstudents?$select=devayani_studentid,devayani_studentname,devayani_department,devayani_age,devayani_fee,devayani_scholorship,devayani_totalfee`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json"
            }
        }
    );

    return response.data.value.map(student => ({
        studentId: student.devayani_studentid,
        studentName: student.devayani_studentname,
        department: student.devayani_department,
        age: student.devayani_age,
        fee: student.devayani_fee,
        scholarship: student.devayani_scholorship,
        totalFee: student.devayani_totalfee
    }));
}

export async function getStudentByName(studentName) {
    const accessToken = await getAccessToken();

    const response = await axios.get(
        `${process.env.DATAVERSE_URL}/api/data/v9.2/devayani_dcstudents?$select=devayani_studentid,devayani_studentname,devayani_department,devayani_age,devayani_fee,devayani_scholorship,devayani_totalfee&$filter=devayani_studentname eq '${studentName}'`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json"
            }
        }
    );

    return response.data.value.map(student => ({
        studentId: student.devayani_studentid,
        studentName: student.devayani_studentname,
        department: student.devayani_department,
        age: student.devayani_age,
        fee: student.devayani_fee,
        scholarship: student.devayani_scholorship,
        totalFee: student.devayani_totalfee
    }));
}

export async function getFaculties() {
    const accessToken = await getAccessToken();

    const response = await axios.get(
        `${process.env.DATAVERSE_URL}/api/data/v9.2/devayani_dcfaculties?$select=devayani_facultyid,devayani_facultyname,devayani_department`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json"
            }
        }
    );

    return response.data.value.map(faculty => ({
        facultyId: faculty.devayani_facultyid,
        facultyName: faculty.devayani_facultyname,
        department: faculty.devayani_department
    }));
}

export async function getFacultyByName(facultyName) {
    const accessToken = await getAccessToken();

    const response = await axios.get(
        `${process.env.DATAVERSE_URL}/api/data/v9.2/devayani_dcfaculties?$select=devayani_facultyid,devayani_facultyname,devayani_department&$filter=devayani_facultyname eq '${facultyName}'`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json"
            }
        }
    );

    return response.data.value.map(faculty => ({
        facultyId: faculty.devayani_facultyid,
        facultyName: faculty.devayani_facultyname,
        department: faculty.devayani_department
    }));
}