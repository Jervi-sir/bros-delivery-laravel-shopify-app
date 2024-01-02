<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DeliveryCompany;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        //$delivery = new DeliveryCompany();
        //$delivery->name = 'ZR Express';
        //$delivery->code_name = 'zr_express';
        //$delivery->save();
        //DB::insert("INSERT INTO plans (`type`, `name`, `price`, `interval`, `capped_amount`, `terms`, `trial_days`, `test`, `on_install`, `created_at`, `updated_at`) VALUES ('RECURRING', 'Test Plan', 5.00, 'EVERY_30_DAYS', 10.00, 'Test terms', NULL, 1, 0, NULL, NULL)");



    }
}

/*
INSERT INTO plans (`type`,`name`,`price`,`interval`,`capped_amount`,`terms`,`trial_days`,`test`,`on_install`,`created_at`,`updated_at`) VALUES
('RECURRING','Test Plan',5.00,'EVERY_30_DAYS',10.00,'Test terms',7,FALSE,1,NULL,NULL);
*/

