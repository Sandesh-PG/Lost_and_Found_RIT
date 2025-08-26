import React from 'react';

// --- SVG Icon for the close button ---
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// --- Helper Function to Format Dates ---
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

// --- Item Detail Modal Component ---
const ItemDetailModal = ({ item, onClose }) => {
    // If no item is selected, the modal is not rendered
    if (!item) return null;

    return (
        // Modal container with blurred background
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={onClose} // Close modal when clicking on the background
        >
            {/* Modal content box */}
            <div 
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-8"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
                >
                    <CloseIcon />
                </button>
                
                {/* Content Layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Image Column */}
                    <div className="md:w-1/2">
                        <img src={item.photoUrl || 'https://placehold.co/600x400/E2E8F0/A0AEC0?text=No+Image'} alt={item.item} className="w-full h-64 object-cover rounded-lg" />
                    </div>
                    
                    {/* Details Column */}
                    <div className="md:w-1/2 flex flex-col">
                        <h2 className="text-3xl font-bold text-gray-800">{item.item}</h2>
                        <div className="mt-4 space-y-3 text-gray-600">
                            <p><strong>Found by:</strong> {item.name}</p>
                            <p><strong>Location:</strong> {item.location}</p>
                            <p><strong>Date:</strong> {formatDate(item.date)}</p>
                            <p className="pt-2"><strong>Description:</strong><br/>{item.description}</p>
                        </div>
                        
                        {/* Conditional Action Button/Text */}
                        <div className="mt-auto pt-4">
                            {item.status === 'found' ? (
                                <p className="text-center font-semibold text-green-600 bg-green-50 py-3 rounded-lg">
                                    Item claimed by {item.claimedBy || 'the owner'}
                                </p>
                            ) : (
                                <button className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                                    Claim Item
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailModal;
