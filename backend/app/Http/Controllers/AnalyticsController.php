<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public  function __construct(Expense $expense, Income $income)
    {
        $this->expense = $expense;
        $this->income = $income;
    }

    /**
     * Retrieves analytics data for the actual month
     *
     * @return array<\App\Models\Expense || \App\Models\Expense>
     *
     * @throws \Exception
     */
    public function index()
    {
        $result = array();
        $expenses = Expense::whereYear('date', '=', date("Y"))->whereMonth('date', '=', date("m"))->get();
        $last_expense = Expense::whereYear('date', '=', date("Y"))->whereMonth('date', '=', date("m"))->orderByDesc("date")->limit(1)->get();
        $expenses_total = Expense::whereYear('date', '=', date("Y"))->whereMonth('date', '=', date("m"))->select('ammount')->sum("ammount");
        $incomes = Income::whereYear('date', '=', date("Y"))->whereMonth('date', '=', date("m"))->get();
        $last_income = Income::whereYear('date', '=', date("Y"))->whereMonth('date', '=', date("m"))->orderByDesc("date")->limit(1)->get();
        $incomes_total = Income::whereYear('date', '=', date("Y"))->whereMonth('date', '=', date("m"))->select('ammount')->sum("ammount");
        $result["expenses"] = $expenses;
        $result["last_expense"] = $last_expense;
        $result["expenses_total"] = $expenses_total;
        $result["incomes"] = $incomes;
        $result["last_income"] = $last_income;
        $result["incomes_total"] = $incomes_total;
        $result["percentage_acquired"] = $expenses_total / $incomes_total * 100;
        return response()->json($result, 200);
    }
}
