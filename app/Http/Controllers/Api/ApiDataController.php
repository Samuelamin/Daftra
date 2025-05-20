<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\CategoryRessource;
use App\Http\Resources\Api\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;              // ← import Str helper

class ApiDataController extends Controller
{
    public function products(Request $request)
    {
        $catId   = $request->get('category_id');
        $min     = $request->get('min_price');
        $max     = $request->get('max_price');
        $search  = $request->get('search');    // ← grab search term
        $perPage = (int) $request->get('per_page', 2);
        $page    = (int) $request->get('page', 1);
        // load & cache full list
        $products = Cache::rememberForever('products', function () {
            return Product::with('category')
                ->orderBy('id', 'desc')
                ->get()
                ->map(fn($p) => new ProductResource($p));
        });

        $categories = Cache::rememberForever('categories', function () {
            return Category::orderBy('id', 'desc')
                ->get()
                ->map(fn($c) => new CategoryRessource($c));
        });

        // start filtering in‐memory
        $filtered = collect($products);

        // filter by category if given
        if ($catId) {
            $filtered = $filtered->where('category.id', $catId);
        }

        // filter by price range
        if (! is_null($min) || ! is_null($max)) {
            $min      = $min !== null ? (float)$min : 0;
            $max      = $max !== null ? (float)$max : INF;
            $filtered = $filtered->filter(fn($item) =>
                $item['price'] >= $min && $item['price'] <= $max
            );
        }

        // filter by search term (case‐insensitive on name)
        if ($search) {
            $needle = Str::lower($search);
            $filtered = $filtered->filter(fn($item) =>
                Str::contains(Str::lower($item['name']), $needle)
            );
        }

        // pagination
        $total   = $filtered->count();
        $results = $filtered
            ->slice(($page - 1) * $perPage, $perPage)
            ->values();

        $paginator = new LengthAwarePaginator(
            $results,
            $total,
            $perPage,
            $page,
            [
                'path'  => LengthAwarePaginator::resolveCurrentPath(),
                'query' => $request->query(),
            ]
        );

        return response()->json([
            'data'       => $results,
            'categories' => $categories,
            'meta'       => [
                'current_page'  => $paginator->currentPage(),
                'per_page'      => $paginator->perPage(),
                'total'         => $paginator->total(),
                'last_page'     => $paginator->lastPage(),
                'next_page_url' => $paginator->nextPageUrl(),
            ],
        ]);
    }
}
