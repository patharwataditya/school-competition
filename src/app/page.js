import React from "react";
import Link from "next/link";

export default function CompetitionDetails() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">
          APPASAHEB BIRNALE PUBLIC SCHOOL SANGLI
        </h1>
        <p className="text-xl text-gray-600 mt-2">
          WORLD LEADERSHIP GLOBAL FORUM
        </p>
        <p className="text-lg text-gray-500">
          INTER-SCHOOL COMPETITION - HON. BABANRAO BIRNALE TROPHY (2025-26)
        </p>
      </header>

      {/* Register and Login Buttons */}
      <div className="absolute top-4 right-4 flex gap-4">
        <Link
          href="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Login
        </Link>
      </div>

      {/* Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {/* Round 1 Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Round 1: Mock Summit</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Each team represents a global organization.</li>
            <li>Lock your organization in the Google Form (no changes allowed).</li>
            <li>Presentation via PPT or Oral Presentation (5 minutes).</li>
            <li>Minus marking for exceeding time limits.</li>
            <li>Judging Criteria: Research, diplomacy, teamwork, presentation.</li>
            <li>Scoring: 30 points maximum.</li>
          </ul>
        </div>

        {/* Round 2 Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-2">
            Round 2: Passport to Power (Quiz Round)
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Rapid-fire quiz based on the selected organization.</li>
            <li>Time allotted: 1 minute per team.</li>
            <li>Correct answers = Stamps in their passport.</li>
            <li>Teams with 5+ stamps move forward.</li>
            <li>Lowest-scoring teams are eliminated.</li>
            <li>Wild Card Round for borderline teams (e.g., mimicking a world leader&apos;s speech).</li>
          </ul>
        </div>

        {/* Round 3 Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-2">
            Round 3: Summit Showdown (Buzzer &amp; Strategy)
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Fast-paced buzzer round on global summits, organizations, and issues.</li>
            <li>Teams must buzz within 30 seconds.</li>
            <li>Correct answers earn &quot;Summit Coins&quot;; wrong answers deduct 1 mark.</li>
          </ul>
        </div>

        {/* Round 4 Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-2">
            Round 4: Crisis Room (Role Play &amp; Debate)
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Each team represents a country in a crisis summit.</li>
            <li>Assigned crises: Climate change, refugee crisis, pandemic response, poverty.</li>
            <li>Negotiate and propose solutions in 5 minutes.</li>
            <li>Judging Criteria: Creativity, facts, negotiation skills.</li>
            <li>Twist: Secret Disruptor (judge as journalist throws challenges).</li>
          </ul>
        </div>

        {/* Round 5 Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-2">
            Round 5: The Ultimate Summit (Finale)
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Top 2 teams face off in a mock global summit.</li>
            <li>Global issue announced on the spot.</li>
            <li>Teams argue for/against the issue.</li>
            <li>Win over neutral nations (judges + audience).</li>
            <li>Best arguments win the competition.</li>
          </ul>
        </div>

        {/* Rules Card */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-bold text-red-700 mb-2">General Rules &amp; Regulations</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Entry Fees: ₹250 per group.</li>
            <li>Each school can participate with only 1 group (5 students max).</li>
            <li>Students can be from grades 8th, 9th, or 10th (mixed or single grade).</li>
            <li>One in-charge teacher required from each school.</li>
            <li>Correctly filled Google Form + paid entry fees finalize participation.</li>
            <li>Props Allowed: Charts, flags, creative presentations.</li>
            <li>Strict adherence to time limits; cheating leads to disqualification.</li>
            <li>No use of mobile phones or external help.</li>
            <li>Judges&apos; decision is final and binding.</li>
            <li>Breakfast included in entry fees; lunch is paid.</li>
            <li>Decent color dress code for students.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}