<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpensesController extends Controller
{

    public  function __construct(Expense $expense)
    {
        $this->expense = $expense;
    }
    public function index()
    {
        return Expense::all();
    }

    public function show($id)
    {
        $expense = $this->expense->find($id);
        if ($expense === null) {
            return response()->json(["erro" => "Recurso pesquisado não existe"], 404);
        }

        return response()->json($expense, 200);
    }

    public function store(Request $request)
    {
        // dd($request);
        $request->validate($this->expense->rules(), $this->expense->feedback());
        $expense = $this->expense->create([
            "name" => $request->name,
            "ammount" => $request->ammount,
            "method" => $request->method,
            "category" => $request->category,
            "date" => $request->date,
            "due_date" => $request->due_date,
            "hasInstallments" => $request->hasInstallments,
            "installments" => $request->installments,
        ]);
        return response()->json($expense, 201);
    }

    public function update(Request $request, $id)
    {
        $expense = $this->expense->find($id);
        if ($expense === null) {
            return response()->json(["erro" => "Impossível realizar a atualização. O recurso solicitado não existe."], 404);
        }

        if ($request->method() === "PATCH") {
            $dynamic_rules = array();
            foreach ($expense->rules() as $input => $regra) {
                if (array_key_exists($input, $request->all())) {
                    $dynamic_rules[$input] = $regra;
                }
            }
            $request->validate($dynamic_rules, $expense->feedback());
        } else {
            $request->validate($expense->rules(), $expense->feedback());
        }

        $expense->fill($request->all());
        $expense->save();
        return response()->json($expense, 200);
    }

    public function destroy($id)
    {
        $expense = $this->expense->find($id);
        if ($expense === null) {
            return response()->json(["erro" => "Impossível realizar a exclusão. O recurso solicitado não existe."], 404);
        }
        $expense->delete();
        return response()->json(["msg" => "Despesa removido com sucesso !"], 200);
    }
}
