<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Urutan penting: id 1 = teacher, id 2 = student (dipakai di middleware & AuthController)
        foreach (['teacher', 'student'] as $roleName) {
            Role::firstOrCreate(['role_name' => $roleName]);
        }
    }
}
