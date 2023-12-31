<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Task;

class ListT extends Model
{
    use HasFactory;

    protected $table = 'lists';

    /**
     * @var string
     */
    protected $fillable = [
        'title',
        'project_id',
        'position'
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function($list) {
            self::where('project_id', $list->project_id)
                ->where('position', '>', $list->position)
                ->decrement('position');
        });
    }


    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'list_id', 'id');
    }
}
