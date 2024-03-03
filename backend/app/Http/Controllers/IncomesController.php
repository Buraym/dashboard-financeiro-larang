<?php

namespace App\Http\Controllers;

use App\Models\Income;
use Illuminate\Http\Request;

class IncomesController extends Controller
{
    public  function __construct(Income $income)
    {
        $this->income = $income;
    }
    public function index()
    {
        return Income::all();
    }

    public function show($id)
    {
        $income = $this->income->find($id);
        if ($income === null) {
            return response()->json(["erro" => "Recurso pesquisado não existe"], 404);
        }

        return response()->json($income, 200);
    }

    public function store(Request $request)
    {
        // dd($request);
        $request->validate($this->income->rules(), $this->income->feedback());
        $income = $this->income->create([
            "name" => $request->name,
            "ammount" => $request->ammount,
            "method" => $request->method,
            "category" => $request->category,
            "date" => $request->date,
            "isLoan" => $request->isLoan,
            "isInvestment" => $request->isInvestment
        ]);
        return response()->json($income, 201);
    }

    public function update(Request $request, $id)
    {
        $income = $this->income->find($id);
        if ($income === null) {
            return response()->json(["erro" => "Impossível realizar a atualização. O recurso solicitado não existe."], 404);
        }

        if ($request->method() === "PATCH") {
            $dynamic_rules = array();
            foreach ($income->rules() as $input => $rule) {
                if (array_key_exists($input, $request->all())) {
                    $dynamic_rules[$input] = $rule;
                }
            }
            $request->validate($dynamic_rules, $income->feedback());
        } else {
            $request->validate($income->rules(), $income->feedback());
        }

        $income->fill($request->all());
        $income->save();
        return response()->json($income, 200);
    }

    public function destroy($id)
    {
        $income = $this->income->find($id);
        if ($income === null) {
            return response()->json(["erro" => "Impossível realizar a exclusão. O recurso solicitado não existe."], 404);
        }
        $income->delete();
        return response()->json(["msg" => "Receita removida com sucesso !"], 200);
    }
}
