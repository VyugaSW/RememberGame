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
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('userid')->unsigned();
            $table->foreign('userid')->references('id')->on('users')->onDelete('Cascade');
            $table->bigInteger('typegameid')->unsigned();
            $table->foreign('typegameid')->references('id')->on('game_types')->onDelete('Cascade');
            $table->tinyInteger('minutes')->unsigned();
            $table->tinyInteger('seconds')->unsigned();
            $table->integer('scores')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('records');
    }
};
