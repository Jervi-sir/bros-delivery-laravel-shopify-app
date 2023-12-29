<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFakeDataRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'productsCount' => ['nullable', 'integer', 'min:0', 'max:17', function(string $attribute, mixed $value, \Closure $fail) {
                if($value <= 0 && $this->get('customersCount') <= 0) {
                    $fail('Slide either Number of Products or Customers to at least 1 to proceed.');
                }
            }],
            'customersCount' => ['nullable', 'integer', 'min:0', 'max:17']
        ];
    }
}
