# One Stop File Service
Welcome to the File Service!.
## How to Run the app
To run the API File Service on your local machine, follow these steps:
1. **Clone the Repository:**
```bash
git clone git@gitlab.camcyber.com:pos/v1/api.git
```
2. **Navigate to the Project Directory:**
```bash
cd file
```
3. **Install Dependencies:**
```bash
$ composer install or composer update
```
## Before Start Server
1. Create the `.env` file in the root directory for local running
```bash
APP_NAME    = File-Service
APP_ENV     = local
APP_KEY     = base64:1AB56CpzkAea6Vig+CicGwa5tCMPCz5piiMj+0S4b2o=
APP_DEBUG   = true
APP_URL     = http://localhost
```

## Start the Server:
```bash
npm php artisan serve --port=8001
```
