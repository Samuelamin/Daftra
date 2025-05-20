<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    protected $guarded = ['id'];

    function product()  {
        return $this->belongsTo(Product::class);
    }

}
