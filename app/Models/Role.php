<?php

// app/Models/Role.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d/m/Y');
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d/m/Y');
    }

    // Add other relationships as needed
}
