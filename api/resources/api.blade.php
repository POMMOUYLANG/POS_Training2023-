<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>POS API</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <style>
        body {
            font-family: 'Nunito', sans-serif;
            margin: 0;
            padding: 0;
            font-size: 2em;
            width: 100dvw;
            height: 100dvh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgb(111, 111, 111);
        }
        .d-flex{
            display: flex;
            align-items: center;
            flex-direction: column;
        }
        .d-flex h2{
            margin: 0;
            padding: 0;
        }
        .p-4{
            padding: 1rem;
        }
        @media (max-width: 600px){
            body{
                font-size: 1rem;
            }
        }
    </style>
</head>

<body>
    <div class="d-flex p-4">
        <h2>POS API</h2>
        <p>Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})</p>
    </div>
</body>

</html>
