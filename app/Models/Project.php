<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ListT;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

        /**
     * The attributes that are mass assignable.
     *
     * @var string
     */
    protected $fillable = [
        'name',
        'user_id'
    ];

    public function lists(): HasMany
    {
        return $this->hasMany(ListT::class);
    }
}