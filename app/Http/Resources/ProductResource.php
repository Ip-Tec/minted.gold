<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
            'name' => $this->name,
            'description' => $this->description,
            'category_id' => $this->category_id,
            'price' => $this->price,
            'slang_price' => $this->slang_price,
            'slug' => $this->slug,
            'main_image' => $this->main_image,
            'images' => $this->images,
            'created_at' => (new Carbon($this->created_at, ))->format('d-m-Y'),
            'updated_at' => (new Carbon($this->updated_at, ))->format('d-m-Y'),
            'rating' => $this->rating,
            'features' => $this->features,
        ];
    }
}
