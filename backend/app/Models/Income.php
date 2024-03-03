<?php

namespace App\Models;

use App\Enums\MethodType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

class Income extends Model
{
    protected $table = 'tb_incomes';
    use HasFactory;

    protected $fillable = ["name", "ammount", "method", "date", "category", "isLoan", "isInvestment"];

    public function rules()
    {
        return [
            "name" => "required",
            "ammount" => "required|numeric|min:0.01",
            "method" => [Rule::enum(MethodType::class)],
            "date" => "required|date",
            "isLoan" => "required|boolean",
            "isInvestment" => "required|boolean"
        ];
    }

    public function feedback()
    {
        return [
            "required" => "O campo :attribute é obrigatório",
            "date" => "O campo :attribute deve ser do tipo data",
            "boolean" => "O campo :attribute deve ser do tipo booleano",
            "numeric" => "O campo :attribute deve ser do tipo numerico",
            "min" => "O campo :attribute deve ser pelo menos o valor minimo para validação"
        ];
    }
}
