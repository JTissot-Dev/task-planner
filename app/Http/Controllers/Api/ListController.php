<?php

namespace App\Http\Controllers\Api;

use App\Models\ListT;
use App\Http\Requests\StoreListTRequest;
use App\Http\Requests\UpdateListTRequest;
use Illuminate\Http\Request;
use App\Http\Resources\ListResource;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use App\Models\Task;
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
        //
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
            // return new ListResource($list);
        } catch (QueryException $e) {
            return response()->json([
                'message' => $e
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateListTRequest $request, ListT $listT)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ListT $listT)
    {
        //
    }
}
