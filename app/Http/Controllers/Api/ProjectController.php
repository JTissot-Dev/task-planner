<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        if ($request->input('name')) {
            $projectName = $request->input('name');

            return ProjectResource::collection(
                Project::where('name', 'like', "%$projectName%")->orderBy('id', 'desc')->paginate(7)
            );
        } else {
            return ProjectResource::collection(
                Project::orderBy('id', 'desc')->paginate(7)
            );
        } 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
