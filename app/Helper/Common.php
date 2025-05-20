<?php
namespace App\Helper;

use App\Http\Resources\Api\ProductResource;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class Common
{
    public static function cacheProducts()
    {
        Cache::forget('products');
        $products = Cache::rememberForever('products', function () {
            return Product::with('category')
                ->orderBy('id', 'desc')
                ->get()
                ->map(fn($p) => new ProductResource($p));
        });

    }
}
