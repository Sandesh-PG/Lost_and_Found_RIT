import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function FoundItemDetailPage() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Gets the item ID from the URL

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await fetch(`/api/found/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch item details.');
        }
        const data = await res.json();
        if (data.success) {
          setItem(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]); // Re-run the effect if the ID in the URL changes

  if (loading) {
    return <div className="text-center py-20">Loading item details...</div>;
  }

  if (error || !item) {
    return <div className="text-center py-20 text-red-500">Error: Could not load item.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/found" className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span>Back to Found Items</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <img 
                src={item.photoUrl || 'https://placehold.co/600x400/E2E8F0/A0AEC0?text=No+Image'} 
                alt={item.item} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="p-8 flex flex-col">
              <h1 className="text-4xl font-bold text-gray-800">{item.item}</h1>
              <div className="mt-6 space-y-4 text-gray-600">
                <p><strong>Reported by:</strong> {item.name}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Date Found:</strong> {formatDate(item.date)}</p>
                <p className="pt-2"><strong>Description:</strong><br/>{item.description}</p>
              </div>
              <div className="mt-auto pt-6">
                 <button className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                    Contact Reporter
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
