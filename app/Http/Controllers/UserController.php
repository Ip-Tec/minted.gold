<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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

    /**
     * Update the user's profile information.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateSettings(Request $request)
    {
        $user = Auth::user();

        // Validate the request data
        $request->validate([
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Avatar validation
            'phone_number' => 'nullable|string|max:15',
            'gender' => 'nullable|string|max:8',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'DOB' => 'nullable|date_format:Y-m-d|before:today',
        ]);

        // Update the user's avatar if the request contains an avatar
        if ($request->hasFile('avatar')) {
            // Sanitize the email to create a valid file name
            $sanitizedEmail = preg_replace('/[^a-zA-Z0-9-_\.]/', '_', $user->email);
            $extension = $request->file('avatar')->getClientOriginalExtension();
            $avatarName = "{$sanitizedEmail}.{$extension}";

            // Delete the old avatar if it exists
            if ($user->avatar) {
                Storage::disk('public')->delete($sanitizedEmail);
            }

            // Store the avatar with the sanitized email as the file name
            $avatarPath = $request->file('avatar')->storeAs('avatars', $avatarName, 'public');
            $user->avatar = $avatarPath;

            \Illuminate\Support\Facades\Log::info('Avatar uploaded: ' . $avatarPath); // Log the uploaded path
        }

        // Update the user's information if the request contains any of the following fields
        // Define the fields that can be updated
        $fields = ['DOB', 'phone_number', 'gender', 'address', 'city', 'state', 'country', 'postal_code'];

        // Iterate over each field and update the user model if the field is present in the request
        foreach ($fields as $field) {
            if ($request->filled($field)) {
                $user->{$field} = $request->input($field);
            }
        }

        $saveState = $user->update();

        if ($saveState) {
            // Return a successful response with the updated avatar
            return back()->with(['success' => 'Profile updated successfully.', 'data' => $user]);
        } else {
            // Failed to save
            return back()->with(['error' => 'Failed to update profile.']);
        }
    }
}
