// ==========================================================>> Custom Library
import { NavigationItem } from 'helpers/components/navigation';
let isAdmin = true;

export const defaultNavigation: NavigationItem[] = [
    //===================================>> Dashboard
    {
        id   : 'dashboard',
        title: 'ផ្ទាំងព័ត៌មាន',
        type : 'basic',
        icon : 'mat_outline:dashboard',
        link : '/dashboard'
    },
    //===================================>> POS
    {
        id       : 'pos',
        title    : 'ការបញ្ជាទិញ',
        type     : 'basic',
        icon     : 'mat_solid:desktop_mac',
        link     : '/pos',
    },
    //===================================>> Sale
    {
        id       : 'sale',
        title    : 'ការលក់',
        type     : 'basic',
        icon     : 'mat_solid:shopping_cart',
        link     : '/sales',
    },
    //===================================>> Product
    {
        hidden() {
            isAdmin = true;
            if(localStorage.getItem('role') == 'Admin'){
                isAdmin = false;
            }
            return isAdmin;
        },
        id       : 'product',
        title    : 'ផលិតផល',
        type     : 'collapsable',
        icon     : 'mat_solid:shop_two',
        children : [
            {
                id       : 'all',
                title    : 'ទាំងអស់',
                type     : 'basic',
                icon     : 'heroicons_solid:chevron-right',
                link     : 'product/all'
            },
            {
                id       : 'type',
                title    : 'ប្រភេទ',
                type     : 'basic',
                icon     : 'heroicons_solid:chevron-right',
                link     : 'product/types'
            }
        ],
    },
    //===========================================>>User
    {
        hidden() {
            isAdmin = true;
            if(localStorage.getItem('role') == 'Admin'){
                isAdmin = false;
            }
            return isAdmin;
        },
        id   : 'user',
        title: 'អ្នកប្រើប្រាស់',
        type : 'basic',
        icon : 'mat_outline:people',
        link : '/users',
    },
    {
        id   : 'profile',
        title: 'គណនី',
        type : 'basic',
        icon : 'mat_outline:person',
        link : '/my-profile'
    },
];
