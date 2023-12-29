<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Osiset\ShopifyApp\Util;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class CheckAccessScopes
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->ajax()) {
            return $next($request);
        }

        $shop = $request->user();

        if ($shop->force_scope_update) {
            return response()->json(
                [
                    'forceRedirectUrl' => route(
                        Util::getShopifyConfig('route_names.authenticate'),
                        ['shop' => $shop->name]
                    )
                ],
                403
            );
        }

        return $next($request);
    }

}
