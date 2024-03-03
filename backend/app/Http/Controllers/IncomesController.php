<?php

namespace App\Http\Controllers;

use App\Models\Income;
use Illuminate\Http\Request;

class IncomesController extends Controller
{
    public function index()
    {
        return Income::all();
    }
}
