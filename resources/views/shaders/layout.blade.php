<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <title>Remember!</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    <script>
        var csrf_token = '<?php echo csrf_token() ?>';
    </script>
</head>
<body>
    <div class="container">
        <!-- Header -->
        @include('shaders.header')

        <!-- Content body-->
        @yield('content')

        @include('shaders.footer')
    </div>
</body>
</html>