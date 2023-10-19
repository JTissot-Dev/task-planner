<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;

class ListT extends Model
{
    use HasFactory;

    /**
     * @var string
     */
    protected $fillable = 'title';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function list()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
