<?php

namespace App\Models;

use App\Enums\MethodType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

class Expense extends Model
{
    protected $table = 'tb_expenses';
    use HasFactory;

    protected $fillable = ["name", "ammount", "method", "date", "category", "due_date", "hasInstallments", "installments"];

    public function rules()
    {
        return [
            "name" => "required",
            "ammount" => "required|numeric|min:0.01",
            "method" => [Rule::enum(MethodType::class)],
            "date" => "required|date",
            "due_date" => "required|date",
            "hasInstallments" => "required|boolean",
            "installments" => "required|numeric",
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

    public function expense()
    {
        return $this->belongsTo("App\Models\Expense");
    }
}
