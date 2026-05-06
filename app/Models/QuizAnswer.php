<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[Fillable(['quiz_attempt_id', 'question_option_id', 'question_id', 'is_correct'])]

class QuizAnswer extends Model
{
    use HasFactory;
    public function quizAttempt()
    {
        return $this->belongsTo(QuizAttempt::class);
    }

    public function questionOption()
    {
        return $this->belongsTo(QuestionOption::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
