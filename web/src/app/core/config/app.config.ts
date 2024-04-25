import { Layout } from 'app/layout/layout.types';

// Types
export type Scheme = 'dark' | 'light';
export type Screens = { [key: string]: string };

export interface AppConfig
{
    layout: Layout;
    scheme: Scheme;
    screens: Screens;
}


export const appConfig: AppConfig = {
    layout : 'dense',
    scheme : 'light',
    screens: {
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1440px'
    },
};
