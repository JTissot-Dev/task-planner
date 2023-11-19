<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ListT;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    /**
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'deadline',
        'priority',
        'position',
        'list_id'
    ];

    public function list(): BelongsTo
    {
        return $this->belongsTo(ListT::class, 'list_id');
    }
}
