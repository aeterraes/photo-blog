import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, res: any): Promise<any>;
    getLogin(res: any): {
        title: string;
        description: string;
        extraJsBody: string[];
    };
    getProfile(req: any): {
        title: string;
        description: string;
        keywords: string;
        isAuthenticated: boolean;
        user: any;
        extraJsBody: string[];
    };
    logout(res: any): any;
    getIndex(req: any): {
        title: string;
        description: string;
        keywords: string;
        isAuthenticated: boolean;
        posts: {
            title: string;
            description: string;
            image: string;
        }[];
        extraJsBody: string[];
    };
    getBlog(req: any): {
        title: string;
        isAuthenticated: boolean;
        posts: {
            title: string;
            date: string;
            image: string;
            description: string;
        }[];
        extraCss: string[];
        extraJsBody: string[];
    };
    getGallery(req: any): {
        title: string;
        isAuthenticated: boolean;
        images: string[];
        extraCss: string[];
        extraJsHead: string[];
        extraJsBody: string[];
    };
    getGoods(req: any): {
        title: string;
        isAuthenticated: boolean;
        goods: {
            name: string;
            description: string;
            image: string;
        }[];
        extraCss: string[];
        extraJsBody: string[];
    };
    getTableForm(req: any): {
        title: string;
        isAuthenticated: boolean;
        extraCss: string[];
        extraJsBody: string[];
    };
}
