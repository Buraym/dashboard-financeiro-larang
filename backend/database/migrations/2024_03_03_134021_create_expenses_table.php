<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_expenses', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->float("ammount");
            $table->enum("method", ["credit_card", "debit_card", "card", "pix", "money"]);
            $table->date("date");
            $table->date("due_date");
            $table->boolean("hasInstallments");
            $table->integer("installments");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_expenses');
    }
};
