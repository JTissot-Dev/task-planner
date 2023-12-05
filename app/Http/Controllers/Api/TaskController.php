<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\ListT;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $projectId = $request->input('project-id');
            $tasks = ListT::with('tasks')
                            ->where('project_id', $projectId)
                            ->get()
                            ->pluck('tasks')
                            ->flatten()
                            ->sortBy('position');
                            
            return TaskResource::collection($tasks);            
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la récupération des tâches'
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {   
        try {
            $data = $request->validated();
            $task = Task::create([
                'title' => $data['title'],
                'position' => $data['position'],
                'list_id' => $data['listId']
            ]);
            return new TaskResource($task);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création de la tâche'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {   
        try {
            $data = $request->validated();
            $task->title = $data['title'];
            $task->description = $data['description'];
            $task->deadline = $data['deadline'];
            $task->priority = $data['priority'];
            $task->save();
            return new TaskResource($task);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour de la tâche'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {   
        try {
            $task->delete();
            return response('', 204);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression de la tâche'
            ], 500);
        }
    }
}
