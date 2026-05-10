<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['role_id','username', 'fullname', 'email', 'password', 'profil_path'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function warigaProfile()
    {
        return $this->hasOne(WarigaProfile::class);
    }

    public function moodLogs()
    {
        return $this->hasMany(MoodLog::class);
    }

    public function userProfile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function userMaterialProgress()
    {
        return $this->hasMany(UserMaterialProgress::class);
    }

    public function quizAttempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }

    public function recomendations()
    {
        return $this->hasMany(RecommendationLog::class);
    }
}
