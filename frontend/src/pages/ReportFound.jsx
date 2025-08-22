import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../AuthContext.jsx'; // Make sure this path is correct

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-gray-500">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

export default function ReportFoundPage() {
  const { currentUser } = useContext(AuthContext); // Get the current user from context
  const [formData, setFormData] = useState({
    name: '',
    item: '',
    location: '',
    date: '',
    description: '',
    photoUrl: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!currentUser) {
      toast.error("You must be logged in to report an item.");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!currentUser || !currentUser._id) {
        throw new Error("User information is missing. Please log in again.");
      }
      
      // Prepare the data payload, including the reporter's ID
      const submissionData = {
        ...formData,
        reportedBy: currentUser._id
      };

      const res = await fetch('/api/found', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message || 'An unknown error occurred.');
        toast.error(data.message || 'Failed to submit report.');
        setLoading(false);
        return;
      }

      setLoading(false);
      toast.success('Report submitted successfully! Notifications will be sent.');
      
      navigate('/found');

    } catch (err) {
      console.error('Submission Error:', err);
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-2xl mb-8">
          <header className="flex items-center justify-start">
              <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  <span>Go Back</span>
              </Link>
          </header>
      </div>

      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Report a Found Item
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Thank you for helping our community. Please fill out the details below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="e.g., John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>

          <div>
            <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-1">
              Item Found
            </label>
            <input
              type="text"
              id="item"
              placeholder="e.g., Black Wallet, iPhone 13"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.item}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location Found
            </label>
            <input
              type="text"
              id="location"
              placeholder="e.g., Central Park, Library Room 204"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.location}
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date Found
            </label>
            <input
              type="date"
              id="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.date}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              placeholder="Provide a brief description of the item."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.description}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
            <label htmlFor="photo-upload" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-500 flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <UploadIcon/>
              <span className="truncate">{formData.photo?.name || 'Choose a file...'}</span>
            </label>
             <input
              type="file"
              id="photo-upload"
              name="photo"
              onChange={handleChange}
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
      </div>
    </div>
  );
}
