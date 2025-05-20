<?php
namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Support\Facades\Log;

class NotifyAdminOfNewOrder
{
    public function handle(OrderPlaced $event)
    {
        Log::info("OrderPlaced event: order #{$event->order->id} placed by user {$event->order->user_id}");
    }
}
