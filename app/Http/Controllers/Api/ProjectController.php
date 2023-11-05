<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;


class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        try {
            $userId = $request->input('user-id');
            if ($request->input('name')) {
                $projectName = $request->input('name');
                $project = Project::where('user_id', $userId)
                                    ->where('name', 'like', "%$projectName%")
                                    ->orderBy('id', 'desc')
                                    ->paginate(7);
                return ProjectResource::collection($project);
            } else {
                $project = Project::where('user_id', $userId)
                                    ->orderBy('id', 'desc')
                                    ->paginate(7);
                return ProjectResource::collection($project);
            } 
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la récupération des projets'
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {   
        $data = $request->validated();

        $project = Project::create([
            'name' => $data['name'],
            'user_id' => $data['userId']
        ]);

        return new ProjectResource($project);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {   
        return new ProjectResource($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $project->name = $data['name'];
        $project->save();
        return new ProjectResource($project);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
