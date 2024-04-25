export class GlobalConstants{
    //Message
    public static genericError: string = 'Something went wrong. Please try again later';

    //Regex
    public static nameRegex: string = '[a-zA-Z0-9 ]*';
    public static emailRegex: string = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
    public static contactNumberRegex: string = '^\[0-9]+';

    //Error
    public static error: string = 'error';

    //Auth
    public static unauthorized: string = 'You are not authorize person to access this page';
}
