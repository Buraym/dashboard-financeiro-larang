<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public  function __construct(Category $category)
    {
        $this->category = $category;
    }

    /**
     * Retrieves all the categories
     *
     * @return array<\App\Models\Category>
     *
     * @throws \Exception
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Find category by id
     *
     * @param  string  $id
     * @return \App\Models\Category
     *
     * @throws \Exception
     */
    public function show($id)
    {
        $category = $this->category->find($id);
        if ($category === null) {
            return response()->json(["erro" => "Recurso pesquisado não existe"], 404);
        }

        return response()->json($category, 200);
    }

    /**
     * Register new category
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Models\Category
     *
     * @throws \Exception
     */
    public function store(Request $request)
    {
        // dd($request);
        $request->validate($this->category->rules(), $this->category->feedback());
        $category = $this->category->create([
            "name" => $request->name,
            "color" => $request->color
        ]);
        return response()->json($category, 201);
    }

    /**
     * Edit category attributes
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \App\Models\Category
     *
     * @throws \Exception
     */
    public function update(Request $request, $id)
    {
        $category = $this->category->find($id);
        if ($category === null) {
            return response()->json(["erro" => "Impossível realizar a atualização. O recurso solicitado não existe."], 404);
        }

        if ($request->method() === "PATCH") {
            $dynamic_rules = array();
            foreach ($category->rules() as $input => $rule) {
                if (array_key_exists($input, $request->all())) {
                    $dynamic_rules[$input] = $rule;
                }
            }
            $request->validate($dynamic_rules, $category->feedback());
        } else {
            $request->validate($category->rules(), $category->feedback());
        }

        $category->fill($request->all());
        $category->save();
        return response()->json($category, 200);
    }

    /**
     * Delete category
     *
     * @param  string  $id
     * @return void
     *
     * @throws \Exception
     */
    public function destroy($id)
    {
        $category = $this->category->find($id);
        if ($category === null) {
            return response()->json(["erro" => "Impossível realizar a exclusão. O recurso solicitado não existe."], 404);
        }
        $category->delete();
        return response()->json(["msg" => "Categoria removida com sucesso !"], 200);
    }
}
