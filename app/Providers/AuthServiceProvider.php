<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];
    protected $clientIds = [
        // Client ID: 1
        // Client secret: UtWZQwgmqZ0FkSNyojIFQRFq5wc80sORAhyDojgg
        // Client ID: 2
        // Client secret: g2YsXwjVdLXaNIQAi03Am3mIDLuoK2gONX69QUsW

    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
    }
}
