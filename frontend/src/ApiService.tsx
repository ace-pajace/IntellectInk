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

    async getUserCourses() {
        try {
            const response = await this.api.get(API.GET_COURSES);
            console.log('Kursy użytkownika', response.data);
        } catch (error) {
            console.error('Błąd pobierania kursów', error);
        }
    }
}
