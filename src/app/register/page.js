"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [form, setForm] = useState({ school_name: "", email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format the request body according to Lambda function expectations
      const requestBody = {
        email: form.email,
        password: form.password,
        school_name: form.school_name  // Changed from schoolName to school_name to match Lambda expectations
      };
      
      const response = await fetch("https://eaa2t16brb.execute-api.ap-south-1.amazonaws.com/SCresgister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      
      if (response.status === 201) {
        // Store email in localStorage for later use
        localStorage.setItem("userEmail", form.email);
        alert(data.message || "Signup successful!");
        router.push("/home");
      } else {
        alert(data.message || "Signup failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Card Container */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-blue-800">School Signup</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* School Name Input */}
          <div>
            <label htmlFor="school_name" className="block text-sm font-medium text-gray-700">
              School Name
            </label>
            <input
              id="school_name"
              name="school_name"
              type="text"
              placeholder="Enter your school name"
              value={form.school_name}
              onChange={handleChange}
              required
              className="mt-1 text-black block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 text-black block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 text-black block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        {/* Additional Links */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}