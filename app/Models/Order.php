<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = ['id'];
    protected $casts = [
        'total' => 'float',

    ];
    function orderDetails() {
        return $this->hasMany(OrderDetails::class)->with('product');
    }

    function user()  {
        return $this->belongsTo(User::class);
    }
}
