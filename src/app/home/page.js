"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [schoolName, setSchoolName] = useState("");
  const [studentCount, setStudentCount] = useState(1);
  const [students, setStudents] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userTopic, setUserTopic] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and then fetch topics
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/login");
      return;
    }
    setUserEmail(email);
    fetchTopics(email);
  }, [router]);

  const fetchTopics = async (emailArg) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://c6c2z3v06c.execute-api.ap-south-1.amazonaws.com/SClist"
      );
      const data = await response.json();

      if (data.topics) {
        // Transform the API response to match our frontend structure
        const transformedTopics = data.topics.map(item => ({
          topic: item.topic_name,
          assigned: item.assigned === 'none' ? 'none' : 'assigned',
          email: item.email,
          schoolName: item.schoolName,
          students: item.students === 'none' ? [] : item.students.split(',')
        }));

        setTopics(transformedTopics);

        // Check if user has already selected a topic
        const alreadySelected = transformedTopics.find(
          (topic) => topic.assigned === "assigned" && topic.email === emailArg
        );

        if (alreadySelected) {
          setUserTopic(alreadySelected);
        } else {
          setUserTopic(null);
        }
      }
    } catch (err) {
      console.error("Error fetching topics:", err);
      setError(
        "Failed to load topics. Please refresh the page and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTopic = (topic) => {
    if (userTopic) {
      // User already has a topic, do nothing
      return;
    }
    setSelectedTopic(topic);
    // Reset student inputs on new selection
    setStudentCount(1);
    setStudents([""]);
    // Scroll to the application form
    setTimeout(() => {
      document
        .getElementById("applicationForm")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setStudentCount(count);
    setStudents((prev) => {
      const newArr = [...prev];
      if (newArr.length < count) {
        // add empty strings
        return newArr.concat(Array(count - newArr.length).fill(""));
      }
      return newArr.slice(0, count);
    });
  };

  const handleStudentNameChange = (index, value) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleApply = async (e) => {
    e.preventDefault();

    if (!selectedTopic || !schoolName.trim()) {
      setError("Please select a topic and enter your school name.");
      return;
    }

    // Validate student names
    if (students.length < 1 || students.length > 5) {
      setError("Please select between 1 and 5 students.");
      return;
    }
    for (let i = 0; i < students.length; i++) {
      if (!students[i].trim()) {
        setError(`Please enter a name for Student ${i + 1}.`);
        return;
      }
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        "https://eaa2t16brb.execute-api.ap-south-1.amazonaws.com/SCupdate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topicName: selectedTopic.topic, // Using topic property that maps to topic_name in the backend
            schoolName: schoolName.trim(),
            email: userEmail,
            students: students.map((s) => s.trim()),
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        alert(
          "Congratulations! Your topic has been reserved successfully."
        );
        setSelectedTopic(null);
        setSchoolName("");
        setStudentCount(1);
        setStudents([""]);
        fetchTopics(userEmail); // Refresh the topics
      } else {
        setError(data.message || "Failed to reserve topic. Please try again.");
      }
    } catch (err) {
      console.error("Error applying for topic:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  const navigateToAdmin = () => {
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header with navigation */}
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold">School Competition Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              {userEmail === "admin6032@compete.com" && (
                <button
                  onClick={navigateToAdmin}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Admin Panel
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                Welcome to the School Competition Portal!
              </h2>
              <p className="text-gray-600">
                Logged in as: <span className="font-medium">{userEmail}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-center">
                <p className="text-blue-800 font-medium mb-1">
                  Competition Status
                </p>
                <p className="text-green-600 font-bold">
                  {userTopic ? "Topic Selected" : "Ready to Select Topic"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User's selected topic card */}
        {userTopic && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Your Selected Topic
            </h2>
            <div className="bg-green-50 border-l-4 border-green-500 rounded-md shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-green-800">
                      {userTopic.topic}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      <span className="font-medium">School:</span> {userTopic.schoolName}
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium">
                    Reserved
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-gray-700">
                    You have successfully registered for this topic. Good luck with your project!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Available Topics Section */}
        {!userTopic && (
          <>
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Available Competition Topics
            </h2>
            <p className="text-gray-600 mb-6">
              Select from the available topics below. Once reserved, a topic becomes exclusively yours for the competition.
            </p>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700">
                <p>{error}</p>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {topics.filter(topic => topic.assigned === 'none').map((topic, index) => (
                  <div 
                    key={index} 
                    className={
                      `
                        bg-white rounded-lg shadow-md overflow-hidden
                        border-2 ${selectedTopic?.topic === topic.topic ? 'border-blue-500' : 'border-transparent'}
                        transition-all hover:shadow-lg
                      `}
                    onClick={() => handleSelectTopic(topic)}
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{topic.topic}</h3>
                      <div className="flex justify-between items-center mt-4">
                        <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium">
                          Available
                        </span>
                        <button 
                          className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Unavailable Topics Section */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-600 mb-4">Already Assigned Topics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.filter(topic => topic.assigned !== 'none').map((topic, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg shadow-sm overflow-hidden opacity-75">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-600 mb-2">{topic.topic}</h3>
                      <div className="flex justify-between items-center mt-4">
                        <span className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-sm font-medium">
                          Reserved
                        </span>
                        <span className="text-gray-500 text-sm">
                          {topic.schoolName}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            {selectedTopic && (
              <div id="applicationForm" className="mt-12 bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Apply for Selected Topic</h3>
                <div className="mb-6">
                  <p className="text-gray-700">
                    You are applying for: <span className="font-bold text-blue-700">{selectedTopic.topic}</span>
                  </p>
                </div>
                <form onSubmit={handleApply}>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Your Email</label>
                    <input
                      type="email"
                      value={userEmail}
                      disabled
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="schoolName">
                      School Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="schoolName"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Enter your school's name"
                      required
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="studentCount">
                      Number of Students <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="studentCount"
                      value={studentCount}
                      onChange={handleCountChange}
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1,2,3,4,5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  {students.map((student, index) => (
                    <div className="mb-4" key={index}>
                      <label className="block text-gray-700 font-medium mb-2">
                        Student {index + 1} Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={student}
                        onChange={(e) => handleStudentNameChange(index, e.target.value)}
                        placeholder={`Enter name of student ${index + 1}`}
                        required
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedTopic(null)}
                      className="px-4 py-2 mr-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : "Apply for Topic"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}

        {/* Competition Rules and Information */}
        <div className="mt-12 bg-blue-50 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Competition Rules & Information</h2>
          <div className="space-y-4 text-gray-700">
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-medium">Entry Fees:</span> Per group ₹250.</li>
              <li><span className="font-medium">Participation:</span> Each school should participate with only one group.</li>
              <li><span className="font-medium">Group Composition:</span> Students can form mixed or single grade groups from Grade 8th, 9th, and 10th.</li>
              <li><span className="font-medium">Group Size:</span> Each group must consist of exactly 5 students.</li>
              <li><span className="font-medium">Teacher Requirement:</span> One in-charge teacher from the respective school is required.</li>
              <li><span className="font-medium">Entry Finalization:</span> A correctly filled Google Form and paid entry fees are mandatory to finalize the entry.</li>
              <li><span className="font-medium">Props Allowed:</span> Charts, flags, and creative presentations are permitted.</li>
              <li><span className="font-medium">Time Limits:</span> Each round will have a separate, strictly followed time limit.</li>
              <li><span className="font-medium">Cheating:</span> Any form of cheating will lead to immediate disqualification.</li>
              <li><span className="font-medium">Fair Play:</span> No use of mobile phones or external assistance is allowed.</li>
              <li><span className="font-medium">Judges&apos; Decision:</span> The decision of the judges will be final and binding.</li>
              <li><span className="font-medium">Meals:</span> Breakfast is included in the entry fees; lunch will be available at an additional cost.</li>
              <li><span className="font-medium">Dress Code:</span> Students should wear decent coloured dress.</li>
            </ul>
            <p className="pt-4">
              <span className="font-medium">Support:</span> For any questions or assistance, please contact the competition organizers at <a href="mailto:support@schoolcompetition.org" className="text-blue-600 hover:underline">support@schoolcompetition.org</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}