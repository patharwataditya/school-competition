"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  const ADMIN_EMAIL = "admin6032@compete.com";

  // Get greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  // Check if user is authenticated and authorized
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/login");
      return;
    }
    
    setUserEmail(email);
    
    // Check if the user is authorized as admin
    if (email === ADMIN_EMAIL) {
      setIsAuthorized(true);
      fetchTopics();
    } else {
      // Redirect unauthorized users to home page
      alert("You do not have permission to access the admin page.");
      router.push("/home");
    }
  }, [router]);

  const fetchTopics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://ud2bqdxp3m.execute-api.us-east-1.amazonaws.com/listtopic");
      const data = await response.json();
      if (data.topics) {
        setTopics(data.topics);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
      alert("Failed to load topics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!newTopic.trim()) {
      alert("Please enter a topic name");
      return;
    }

    try {
      const response = await fetch("https://ud2bqdxp3m.execute-api.us-east-1.amazonaws.com/addtopic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicName: newTopic.trim() }),
      });
      
      const data = await response.json();
      
      if (response.status === 201) {
        alert(data.message || "Topic added successfully");
        setNewTopic("");
        fetchTopics(); // Refresh the topics list
      } else {
        alert(data.message || "Failed to add topic");
      }
    } catch (error) {
      console.error("Error adding topic:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleRemoveTopic = async (topicName) => {
    if (window.confirm(`Are you sure you want to remove the topic: "${topicName}"?`)) {
      try {
        const response = await fetch("https://26zh11j7rc.execute-api.us-east-1.amazonaws.com/SCremoveTopic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topicName }),
        });
        
        const data = await response.json();
        
        if (response.status === 200) {
          alert(data.message || "Topic removed successfully");
          fetchTopics(); // Refresh the topics list
        } else {
          alert(data.message || "Failed to remove topic");
        }
      } catch (error) {
        console.error("Error removing topic:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const downloadCSV = () => {
    if (topics.length === 0) {
      alert("No data to download");
      return;
    }

    // Convert topics array to CSV format
    const headers = ["Topic", "Status", "School Name", "Email"];
    const csvContent = [
      headers.join(","),
      ...topics.map(topic => 
        `"${topic.topic}","${topic.assigned}","${topic.schoolName}","${topic.email}"`
      )
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `topics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  // Show loading or unauthorized message
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-6">You do not have permission to access this page.</p>
          <Link href="/home" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">School Admin Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">{greeting}, Admin</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Info Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
          <p className="text-gray-600">
            Logged in as: <span className="font-semibold">{userEmail}</span>
          </p>
        </div>

        {/* Add Topic Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Topic</h2>
          <form onSubmit={handleAddTopic} className="flex gap-4">
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Enter topic name"
              className="flex-grow text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Topic
            </button>
          </form>
        </div>

        {/* Topics Table Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">Topics List</h2>
            <button
              onClick={downloadCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download CSV
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
          ) : topics.length === 0 ? (
            <div className="text-center p-8 text-gray-500">No topics available</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Topic
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      School Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topics.map((topic, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {topic.topic}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          topic.assigned === 'none' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {topic.assigned === 'none' ? 'Available' : 'Assigned'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {topic.schoolName === 'none' ? '—' : topic.schoolName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {topic.email === 'none' ? '—' : topic.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleRemoveTopic(topic.topic)}
                          className="text-red-600 hover:text-red-900 focus:outline-none"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}