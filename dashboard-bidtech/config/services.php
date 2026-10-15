<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Resend, Postmark, AWS, and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'idcloudhost' => [
        'url' => env('IDCLOUDHOST_API_URL', 'https://api.srs.idch.co.id/v1'),
        'key' => env('IDCLOUDHOST_API_KEY'),
        'secret' => env('IDCLOUDHOST_API_SECRET'),
        'webhook_secret' => env('IDCLOUDHOST_WEBHOOK_SECRET'),
    ],

    'xendit' => [
        'key'           => env('XENDIT_SECRET_KEY'),
        'webhook_token' => env('XENDIT_WEBHOOK_TOKEN'),
    ],

    'fonnte' => [
        'token' => env('FONNTE_TOKEN'),
    ],

    'whatsapp' => [
        'admin_phone' => env('WHATSAPP_ADMIN_PHONE', env('ADMIN_WHATSAPP_PHONE')),
    ],

];
