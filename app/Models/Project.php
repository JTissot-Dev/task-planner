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

    public function orderLists($orderedLists): void
    {
        foreach ($orderedLists as $orderedList) {
            $list = $this->lists->find($orderedList['id']);
    
            if ($list) {
                $list->update(['position' => $orderedList['position']]);
            }
        }
    }

    public function orderTasks($orderedTasks)
    {
        $lists = $this->lists;
        foreach ($lists as $list) {
            foreach ($orderedTasks as $orderedTask) {
                $task = $list->tasks()->find($orderedTask['id']);
                if ($task) {
                    $task->update([
                        'position' => $orderedTask['position'],
                        'list_id' => $orderedTask['list_id']
                    ]);
                } 
            }
        }
    }
}
