import axios, { AxiosInstance } from 'axios';
import { API } from './config/config';

export default class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API.baseURL,
            withCredentials: true,
            headers: {
                "Content-type": "application/json"
            }
        });
    }

    async register(username: string, email: string, password: string) {
        try {
            const response = await this.api.post(API.POST_LOGIN, { username, email, password });
            console.log(`Zarejestrowano pomyślnie - ${response.data}`);
        } catch (error) {
            console.error('Błąd rejestracji', error);
        }
    }

    async login(username: string, password: string) {
        try {
            const response = await this.api.post(API.POST_LOGIN, { username, password });
            console.log(`Zalogowano pomyślnie - ${response.data}`);
            return true;
        } catch (error) {
            console.error('Błąd logowania', error);
            return false;
        }
    }

    async getSemestersNumbersForUser(email: string) {
        try {
            const response = await this.api.get(`/${email}/semesters`);
            console.log('Semestry użytkownika', response.data.semesters);
            return response.data.semesters;
        } catch (error) {
            console.error('Błąd pobierania semestrów', error);
            throw error;
        }
    }

    async getCoursesForSemester(email: string, semesterNumber: number) {
        try {
            const response = await this.api.get(`/${email}/semesters/${semesterNumber}`);
            console.log('Kursy użytkownika', response.data.subjects);
            return response.data.subjects;
        } catch (error) {
            console.error('Błąd pobierania semestrów', error);
            throw error;
        }
    }

    async getCoursesEditions(email: string, semesterNumber: number, subjectName: string) {
        try {
            const response = await this.api.get(`/${email}/semesters/${semesterNumber}/${subjectName}`);
            console.log('Edycje kursów użytkownika', response.data.editions);
            return response.data.editions;
        } catch (error) {
            console.error('Błąd pobierania semestrów', error);
            throw error;
        }
    }

    // post request to create new edition - no endpoint on backend
    async createNewEdition(email: string, semesterNumber: number, subjectName: string, edition: string) {
        try {
            const response = await this.api.post(API.POST_EDITION, { email, semesterNumber, subjectName, edition});
            console.log(`Utworzono nową edycję - ${response.data}`);
        } catch (error) {
            console.error('Błąd tworzenia nowej edycji', error);
        }
    }

    // // post request to create new course
    // async createNewCourse(email: string, semesterNumber: number, subjectName: string, edition: string) {
    //     try {
    //         const response = await this.api.post(API.POST_EDITION, { email, semesterNumber, subjectName, edition});
    //         console.log(`Utworzono nowy kurs - ${response.data}`);
    //     } catch (error) {
    //         console.error('Błąd tworzenia nowego kursu', error);
    //     }
    // }
    
    // async getUserCourses() {
    //     function romanToNumber(roman: string): number { //to jest jakiś nieśmieszny żart, że muszę to tutaj robić
    //         const romanNumerals: { [index: string]: number } = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
    //         return romanNumerals[roman];
    //     }
    
    //     try {
    //         const response = await this.api.get(API.GET_COURSES);
    //         console.log('Kursy użytkownika', response.data);
    //         const termNumbers = response.data.courses.map((course: { term: string }) => romanToNumber(course.term));
    //         const uniqueTermNumbers: number[] = Array.from(new Set(termNumbers));
    //         console.log('Numery semestrów', uniqueTermNumbers);
    //         return uniqueTermNumbers;
    //     } catch (error) {
    //         console.error('Błąd pobierania kursów', error);
    //         throw error;
    //     }
    // }

    // async getSubjects(semesterNumber: number) {
    //     function romanToNumber(roman: string): number { //to jest jakiś nieśmieszny żart, że muszę to tutaj robić
    //         const romanNumerals: { [index: string]: number } = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
    //         return romanNumerals[roman];
    //     }
    //     try {
    //         const response = await this.api.get(API.GET_COURSES);
    //         console.log('Kursy użytkownika', response.data);
    //         const subjects = response.data.courses.filter((course: { term: string }) => romanToNumber(course.term) === semesterNumber);
    //         const subjectNames = subjects.map((subject: { name: string }) => subject.name);
    //         const uniqueSubjectNames: string[] = Array.from(new Set(subjectNames));
    //         console.log('Przedmioty', uniqueSubjectNames);
    //         return uniqueSubjectNames;
    //     } catch (error) {
    //         console.error('Błąd pobierania przedmiotów', error);
    //         throw error;
    //     }
    // }

    // async getEditions(subjectName: string) {    
    //     try {
    //         const response = await this.api.get(API.GET_COURSES);
    //         console.log("Nazwa przedmiotu", subjectName)
    //         const subjects = response.data.courses.filter((course: { name: string }) => course.name === subjectName);
    //         const subjectEditions: string[] = subjects.map((subject: { edition: string }) => subject.edition);
    //         console.log('Edycje', subjectEditions);
    //         return subjectEditions;
    //     } catch (error) {
    //         console.error('Błąd pobierania przedmiotów', error);
    //         throw error;
    //     }
    // }
}
