<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function handleCallback(Request $request)
    {
        $paymentReference = $request->input('reference');

        // Verify payment with Paystack API
        $paymentDetails = \Illuminate\Support\Facades\Http::withHeaders([
            'Authorization' => 'Bearer ' . env('PayStack_Secret_Key'),
        ])->get('https://api.paystack.co/transaction/verify/' . $paymentReference);

        if ($paymentDetails['data']['status'] === 'success') {
            // Update order status and other relevant details in the database
            return redirect()->route('order.success');
        } else {
            // Handle payment failure
            return redirect()->route('order.failure');
        }
    }
}
