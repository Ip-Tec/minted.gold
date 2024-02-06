<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products_display', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description'); 
            $table->float('price');
            $table->string('adminName');
            $table->string('category');
            $table->json('image');
            $table->string('stock');
            // Add other fields as needed
            $table->timestamps();

            $table->index('adminName', 'Product_adminName_fkey');
            $table->index('category', 'Product_categorie_fkey');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_display');
    }
};
