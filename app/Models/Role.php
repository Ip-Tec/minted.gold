<?php

// app/Models/Role.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        // Add other fields as needed
    ];

    public function admins()
    {
        return $this->hasMany(Admin::class, 'adminrole');
    }

    // Add other relationships as needed
}
