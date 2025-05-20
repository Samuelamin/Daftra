<!DOCTYPE html>
<html lang="{{ str_replace('_','-',app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Enable HMR --}}
    @viteReactRefresh

    {{-- Compile & inject your JS/CSS bundles --}}
    @vite([
      'resources/css/app.css',
      'resources/js/app.tsx',
    ])
</head>
<body>
    {{-- This is where React will mount --}}
    <div id="root"></div>
</body>
</html>
