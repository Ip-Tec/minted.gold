<?php

// app/Models/Footer.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Footer extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'PhoneNumber',
        // Add other fields as needed
    ];
}
