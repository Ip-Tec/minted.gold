<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    public function showSettings()
    {
        return view('user.settings', [
            'user' => Auth::user(),
        ]);
    }

    public function updateSettings(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Avatar validation
            'phone_number' => 'nullable|string|max:15',
            'gender' => 'nullable|string|max:8',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            "day" => 'nullable|number|max:2',
            "month" => 'nullable|string|max:15',
            "year" => 'nullable|number|max:4',
            // Add validation for other fields as needed
        ]);

        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($user->avatar) {
                Storage::delete($user->avatar);
            }

            // Store new avatar
            $avatarPath = $request->file('avatar')->store('avatars');
            $user->avatar = $avatarPath;
        }

        // Update other user information
        $user->update($request->only('phone_number', 'address', 'city', 'state', 'country', 'postal_code'));

        return back()->with('success', 'Profile updated successfully.');
    }
}
