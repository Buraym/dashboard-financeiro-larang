<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "tb_categories";
    use HasFactory;

    protected $fillable = ["name", "color"];

    public function rules()
    {
        return [
            "name" => "required|string",
            "color" => "required|string"
        ];
    }

    public function feedback()
    {
        return [
            "required" => "O campo :attribute é obrigatório",
            "string" => "O campo :attribute deve ser do tipo texto"
        ];
    }
}
