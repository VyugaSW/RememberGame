This project was made with Laravel and React.
Site was tested with OpenServer 6.0 and was local made on it.
Were used: MySQL 8.2, PHP 8.2 .
To use it, you need to have server with db and you need to have php, which is installed, to use command 'php artisan'.
Also you need to install the NPM (Node Pakacge Manager).
To turn on the website:
1) Configurate your files about database (.env or config/database), also configurate another config (config/app, config/auth and ect.)
2) Do not forget to change URL in the config/app
3) Also change the template APPPATH (same URL) in resources/js/appPath, to api request work well
4) In the terminal/console write: 'php artisan migrate' - and after: 'php artisan db:seed GameTypeSeeder' to create Tables and first columns
5) Write: 'npm run dev' to turn on React
6) Write: 'php artisan serve' to turn on Laravel
7) Web-site was launched
8) Enjoy :), if this documentation is right
