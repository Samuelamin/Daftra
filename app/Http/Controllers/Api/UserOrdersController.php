<?php
namespace App\Http\Controllers\Api;

use App\Events\OrderPlaced;
use App\Helper\Common;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserOrdersController extends Controller
{
    public function index(Request $request)
    {
        $user   = $request->user();
        $orders = $user->orders()->orderBy('id', 'desc')->get();
        return response()->json(['status' => 200, 'data' => $orders]);
    }

    public function store(Request $request)
    {
        // 1) Basic validation
        $data = $request->validate([
            'items'           => 'required|array|min:1',
            'items.*.item_id' => 'required|integer|exists:products,id',
            'items.*.count'   => 'required|integer|min:1',
        ]);

        $items = $data['items'];

        // 2) Load all products in one query
        $productIds = collect($items)->pluck('item_id')->all();
        $products   = Product::whereIn('id', $productIds)->get()->keyBy('id');

        // 3) Check stock for each line
        $errors = [];
        foreach ($items as $i => $line) {
            $prod = $products->get($line['item_id']);
            if (! $prod) {
                // should not happen because of exists:products,id
                $errors["items.$i.item_id"] = "Product ID {$line['item_id']} not found.";
            } elseif ($line['count'] > $prod->stock) {
                $errors["items.$i.count"] = "Only {$prod->stock} left in stock for {$prod->name}.";
            }
        }
        if (! empty($errors)) {
            return response()->json(['errors' => $errors], 422);
        }
        $user_id = $request->user()->id;
        // 4) Everything OK → create order in a transaction
        $order = DB::transaction(function () use ($items, $products, $user_id) {
            // compute total
            $total = 0;
            foreach ($items as $line) {
                $prod = $products->get($line['item_id']);
                $total += $prod->price * $line['count'];
            }

            // create orders record
            $order = Order::create([
                'user_id' => $user_id,
                'total'   => $total,
            ]);

            // create order_details and decrement stock
            foreach ($items as $line) {
                $prod = $products->get($line['item_id']);
                OrderDetails::create([
                    'order_id'   => $order->id,
                    'product_id' => $prod->id,
                    'quantity'   => $line['count'],
                    'total'      => $prod->price * $line['count'],
                ]);

                // reduce stock
                $prod->decrement('stock', $line['count']);
            }

            return $order;
        });
        Common::cacheProducts();
        event(new OrderPlaced($order));

        return response()->json([
            'message'  => 'Order placed successfully',
            'order_id' => $order->id,
        ], 201);
    }

    public function show(Request $request, string $id)
    {
        $user  = User::find($request->user()->id);
        $order = $user->orders()->where('id', $id)->first();
        if (! $order) {
            return response()->json(['status' => 404, 'message' => 'Order not found']);
        }
        return response()->json(['status' => 200, 'data' => $order]);
    }

}
