<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = ['id'];

    function products()  {
        return $this->hasMany(Product::class);
    }
}
