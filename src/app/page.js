import React from "react";
import Link from "next/link";

export default function CompetitionDetails() {
  return (
     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      {/* Header */}
      <header className="mb-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {/* Logo Div */}
          <div className="flex-shrink-0">
            <img 
              src="../logo.png" 
              alt="School Logo" 
              className="h-20 md:h-26 w-auto object-contain"
            />
          </div>
          
          {/* Header Text Div */}
          <div className="text-center">
            <h1 className="text-xl md:text-3xl font-bold text-blue-800 leading-tight">
              APPASAHEB BIRNALE PUBLIC SCHOOL, SANGLI
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Affiliation No: 1130074
            </p>
            <p className="text-lg md:text-xl text-gray-600 mt-2">
              WORLD LEADERSHIP GLOBAL FORUM
            </p>
            <p className="text-sm md:text-lg text-gray-500 px-2">
              INTER-SCHOOL COMPETITION - HON. BABANRAO BIRNALE TROPHY (2025-26)
            </p>
          </div>
        </div>
      </header>

      {/* Register and Login Buttons */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 flex gap-2 md:gap-4">
        <Link
          href="/register"
          className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="bg-gray-200 text-gray-800 px-3 py-1 md:px-4 md:py-2 text-sm rounded-md hover:bg-gray-300 transition-colors"
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

        {/* Prizes Card */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">🏆</span>
            Exciting Cash Prizes & Awards
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-yellow-100 p-3 rounded-md">
              <span className="font-semibold text-yellow-800">🥇 1st Place</span>
              <span className="text-yellow-700 font-bold">₹5,000 + Trophy</span>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
              <span className="font-semibold text-gray-700">🥈 2nd Place</span>
              <span className="text-gray-600 font-bold">₹3,000 + Trophy</span>
            </div>
            <div className="flex items-center justify-between bg-orange-100 p-3 rounded-md">
              <span className="font-semibold text-orange-700">🥉 3rd Place</span>
              <span className="text-orange-600 font-bold">₹2,000 + Trophy</span>
            </div>
            <div className="bg-blue-50 p-3 rounded-md text-center">
              <span className="text-blue-700 font-medium">🎖️ Participation Certificate to all participants</span>
            </div>
          </div>
        </div>

        {/* Rules Card */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-bold text-red-700 mb-2">General Rules &amp; Regulations</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Entry Fees: ₹250 per group.</li>
            <li>Each school can participate with only 1 group (5 students max).</li>
            <li>Students should be from grade 8th, 9th and 10th as a combined group.</li>
            <li>One in-charge teacher required from each school.</li>
            <li>Correctly filled Entry Form + paid entry fees finalize participation.</li>
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