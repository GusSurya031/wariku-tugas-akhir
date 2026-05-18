<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    {{-- Basic Meta --}}
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    {{-- SEO Meta --}}
    <title inertia>{{ config('app.name', 'Wariku') }}</title>
    <meta name="description"
        content="Wariku adalah platform Learning Management System adaptif berbasis Wariga yang membantu siswa belajar matematika secara personal, interaktif, dan menyenangkan." />
    <meta name="keywords"
        content="Wariku, LMS Wariku, learning management system, LMS matematika, pembelajaran adaptif, Wariga, belajar matematika, platform edukasi" />
    <meta name="author" content="Wariku" />
    <meta name="robots" content="index, follow" />

    {{-- Canonical URL --}}
    <link rel="canonical" href="{{ url()->current() }}" />

    {{-- Favicon / Logo Icon Tab --}}
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}" />
    <link rel="apple-touch-icon" href="{{ asset('favicon.png') }}" />

    {{-- Open Graph Meta --}}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="{{ config('app.name', 'Wariku') }}" />
    <meta property="og:description"
        content="Wariku adalah platform LMS adaptif berbasis Wariga untuk membantu siswa belajar matematika secara lebih personal dan menyenangkan." />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:site_name" content="Wariku" />
    <meta property="og:image" content="{{ asset('images/og-wariku.png') }}" />

    {{-- Twitter Card Meta --}}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ config('app.name', 'Wariku') }}" />
    <meta name="twitter:description"
        content="Belajar matematika secara adaptif, personal, dan menyenangkan bersama Wariku." />
    <meta name="twitter:image" content="{{ asset('images/og-wariku.png') }}" />

    {{-- Fonts Optimization --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Courgette&family=Quando&family=Quicksand:wght@300..700&display=swap"
        rel="stylesheet">

    {{-- Vite Assets --}}
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])

    {{-- Inertia Dynamic Head --}}
    <x-inertia::head />
</head>

<body>
    <noscript>
        Website Wariku membutuhkan JavaScript untuk menampilkan konten pembelajaran dengan baik.
    </noscript>

    <x-inertia::app />
</body>

</html>
