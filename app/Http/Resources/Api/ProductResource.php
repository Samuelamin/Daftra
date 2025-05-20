<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => new CategoryRessource($this->category),
            'name' => $this->name,
            'description' => $this->description,
            'stock' => $this->stock,
            'price' =>   (float) $this->price,
            'image' => $this->image,
        ];
    }
}
