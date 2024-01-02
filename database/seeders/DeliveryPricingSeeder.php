<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeliveryPricingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['Adrar',           '1400', '1000', '350', 'Adrar'],
            ['Chlef',           '850', '500', '200', 'Chlef'],
            ['Laghouat',        '950', '600', '200', 'Laghouat'],
            ['Oum El Bouaghi',  '850', '500', '200', 'OUM EL BOUGHI - AIN EL BEIDA'],
            ['Batna',           '850', '500', '200', 'Batna'],
            ['Bejaia',          '850', '500', '200', 'Bejaia'],
            ['Biskra',          '950', '600', '200', 'Biskra'],
            ['Bechar',          '1000', '650', '250','Bechar'],
            ['Blida',           '800', '500', '200', 'BLIDA, BLIDA BOUGARA, BLIDA MOUZAIA'],
            ['Bouira',          '850', '500', '200', 'Bouira'],
            ['Tamanrasset',     '1700', '1200', '350','Tamanrasset'],
            ['Tebessa',         '900', '500', '200', 'Tebessa'],
            ['Tlemcen',         '750', '500', '200', 'Tlemcen'],
            ['Tiaret',          '800', '500', '200', 'Tiaret'],
            ['Tizi Ouzou',      '850', '500', '200', 'Tizi Ouzou'],
            ['Alger',           '650', '400', '200',    'ALGER - BIRKHADEM, ALGER - LIDOU, ALGER - OULED FAYET, HUB REGHAIA'],
            ['Djelfa',          '950', '600', '200',    'Djelfa'],
            ['Jijel',           '850', '500', '200',    'Jijel'],
            ['Sétif',           '850', '500', '200',    'Sétif, El EULMA'],
            ['Saida',           '750', '0', '200',      'Saida'],
            ['Skikda',          '850', '500', '200',    'Skikda'],
            ['Sidi Bel Abbès',  '750', '500', '200',    'Sidi Bel Abbès'],
            ['Annaba',          '850', '500', '200',    'Annaba'],
            ['Guelma',          '850', '500', '200',    'Guelma'],
            ['Constantine',     '850', '500', '200',    'CONSTANTINE - ZOUAGHI, CONSTANTINE - NOUVELLE VILLE,CONSTANTINE - BELLE VUE'],
            ['Medea',           '800', '500', '200',    'Medea'],
            ['Mostaganem',      '700', '450', '200',    'Mostaganem'],
            ['M\'Sila',         '900', '600', '200',    'M\'Sila'],
            ['Mascara',         '750', '500', '200',    'Mascara'],
            ['Ouargla',         '1000', '650', '250',   'OUARGLA, HASSI MESSAOUD'],
            ['Oran',            '750', '500', '200',    'ORAN - USTO/HLM, ORAN - MILLENIUM'],
            ['El Bayadh',       '1200', '700', '250',   'El Bayadh'],
            ['Illizi',          '0', '0', '0', ''],
            ['Bordj Bou Arreridj', '850', '500', '200', 'Bordj Bou Arreridj'],
            ['Boumerdes',       '800', '500', '200',    'Boumerdes'],
            ['El Tarf',         '900', '500', '200',    'El Tarf'],
            ['Tindouf',         '0', '0', '0',          ''],
            ['Tissemsilt',      '850', '500', '200',    ''],
            ['El Oued',         '1000', '650', '250',   'El Oued'],
            ['Khenchela',       '850', '500', '200',    ''],
            ['Souk Ahras',      '850', '500', '200',    'Souk Ahras'],
            ['Tipaza',          '850', '500', '200',    'Tipaza'],
            ['Mila',            '850', '500', '200',    'Mila'],
            ['Ain Defla',       '800', '500', '200',    'Ain Defla'],
            ['Naama',           '1000', '600', '250',   'Naama'],
            ['Ain Temouchent',  '500', '350', '200',    'Ain Temouchent'],
            ['Ghardaia',        '950', '600', '250',    'Ghardaia'],
            ['Relizane',        '800', '500', '200',    'Relizane'],
            ['Timimoun',        '1400', '0', '350',     ''],
            ['Bordj Badji Mokhtar', '0', '0', '0',      ''],
            ['Ouled Djellal',   '1000', '600', '200',   'Ouled Djellal'],
            ['Béni Abbès',      '1200', '0', '250',     ''],
            ['In Salah',        '1700', '0', '350',     ''],
            ['In Guezzam',      '1700', '0', '350',     ''],
            ['Touggourt',       '1000', '650', '250',   'Touggourt'],
            ['Djanet',          '0', '0', '0',          ''],
            ['M\'Ghair',        '1000', '0', '250',     ''],
            ['Meniaa',          '1000', '0', '250',     ''],
        ];

        foreach ($data as $index => $row) {
            $insertData = [
                'wilaya' => $row[0],
                'wilaya_number' => $index + 1,
                'zr_express' => json_encode([
                    'domicile' => $row[1],
                    'stopdesk' => $row[2],
                    'retour' => $row[3],
                ]),
                'zr_express_stopdesks' => strtoupper($row[4]),
                'created_at' => now(),
                'updated_at' => now(),
            ];

            DB::table('delivery_pricings')->insert($insertData);
        }
    }
}
