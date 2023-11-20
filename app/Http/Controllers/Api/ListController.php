<?php

namespace App\Http\Controllers\Api;

use App\Models\ListT;
use App\Http\Requests\StoreListTRequest;
use App\Http\Requests\UpdateListTRequest;
use Illuminate\Http\Request;
use App\Http\Resources\ListResource;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use App\Http\Resources\TaskResource;


class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $projectId = $request->input('project-id');
            $lists = ListT::where('project_id', $projectId)
                            ->orderBy('position', 'asc')
                            ->get();
            return ListResource::collection($lists);
        } catch (QueryException $e) {
            return response()->json([
                'message' => "Une erreur s'est produite lors de la récupération des listes"
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreListTRequest $request)
    {
        try {

            $data = $request->validated();
            $list = ListT::create([
                'title' => $data['title'],
                'project_id' => $data['projectId'],
                'position' => $data['position']
            ]);

            return new ListResource($list);
        
        } catch (QueryException $e) {
            response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ListT $list)
    {
        try {
            $tasks = $list->tasks()
                            ->orderBy('position', 'asc')
                            ->get();
            return TaskResource::collection($tasks);
        } catch (QueryException $e) {
            return response()->json([
                'message' => $e
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateListTRequest $request, ListT $list)
    {   
        try {
            $data = $request->validated();
            $list->title = $data['title'];
            $list->save();
            return new ListResource($list);
        } catch (QueryException $e) {
            return response()->json([
                'message' => $e
            ], 500);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ListT $list)
    {
        {   
            try {
                $list->delete();
                return response('', 204);
            } catch (QueryException $e) {
                return response()->json([
                    'message' => 'Une erreur est survenue lors de la suppression de la tâche'
                ], 500);
            }
        }
    }
}
