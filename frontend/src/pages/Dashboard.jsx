import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
    FiEdit2, FiTrash2, FiPlus, FiLogOut, FiSave, FiX, FiSearch, 
    FiFile, FiStar, FiTrash, FiGrid, FiSettings, FiChevronDown, 
    FiMenu, FiHeart, FiBookOpen, FiBriefcase, FiZap, FiUser,
    FiShoppingCart
} from 'react-icons/fi';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [formData, setFormData] = useState({ title: '', content: '', tags: [] });
    const [user, setUser] = useState(null);
    const [viewingNote, setViewingNote] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentView, setCurrentView] = useState('notes'); // 'notes', 'favorites', 'trash'
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token) {
            navigate('/login');
            return;
        }

        if (userData) {
            setUser(JSON.parse(userData));
        }

        fetchNotes();
    }, [navigate]);

    useEffect(() => {
        fetchNotes();
    }, [currentView]);

    useEffect(() => {
        const filtered = notes.filter(note => {
            const matchesSearch = searchQuery.trim() === '' || 
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                note.content.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesFilter = activeFilter === 'All' || 
                (note.tags && note.tags.includes(activeFilter));
            
            // Filter by view
            if (currentView === 'favorites') {
                return matchesSearch && matchesFilter && note.isFavorite;
            } else if (currentView === 'trash') {
                return matchesSearch && matchesFilter;
            }
            
            return matchesSearch && matchesFilter;
        });
        setFilteredNotes(filtered);
    }, [searchQuery, notes, activeFilter, currentView]);

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            const endpoint = currentView === 'trash' 
                ? 'http://localhost:5000/api/notes/trash/all'
                : 'http://localhost:5000/api/notes';
            
            const response = await axios.get(endpoint, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setNotes(response.data.notes);
                setFilteredNotes(response.data.notes);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                handleLogout();
            } else {
                // Set empty notes instead of showing error for now
                setNotes([]);
                setFilteredNotes([]);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const openModal = (note = null) => {
        if (note) {
            setEditingNote(note);
            setFormData({ 
                title: note.title, 
                content: note.content,
                tags: note.tags || []
            });
        } else {
            setEditingNote(null);
            setFormData({ title: '', content: '', tags: [] });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingNote(null);
        setFormData({ title: '', content: '', tags: [] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error('Title and content are required');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };

            if (editingNote) {
                const response = await axios.put(
                    `http://localhost:5000/api/notes/${editingNote._id}`,
                    formData,
                    config
                );

                if (response.data.success) {
                    toast.success('Note updated successfully');
                    fetchNotes();
                    closeModal();
                }
            } else {
                const response = await axios.post(
                    'http://localhost:5000/api/notes',
                    formData,
                    config
                );

                if (response.data.success) {
                    toast.success('Note created successfully');
                    fetchNotes();
                    closeModal();
                }
            }
        } catch (error) {
            console.error('Error saving note:', error);
            toast.error('Failed to save note');
        }
    };

    const handleDelete = async (noteId) => {
        if (!window.confirm('Are you sure you want to move this note to trash?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:5000/api/notes/${noteId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                toast.success('Note moved to trash');
                fetchNotes();
            }
        } catch (error) {
            console.error('Error deleting note:', error);
            toast.error('Failed to delete note');
        }
    };

    const toggleFavorite = async (noteId, event) => {
        event.stopPropagation();
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`http://localhost:5000/api/notes/${noteId}/favorite`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchNotes();
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error('Failed to update favorite');
        }
    };

    const restoreNote = async (noteId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`http://localhost:5000/api/notes/${noteId}/restore`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                toast.success('Note restored successfully');
                fetchNotes();
            }
        } catch (error) {
            console.error('Error restoring note:', error);
            toast.error('Failed to restore note');
        }
    };

    const permanentDelete = async (noteId) => {
        if (!window.confirm('Permanently delete this note? This action cannot be undone!')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:5000/api/notes/${noteId}/permanent`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                toast.success('Note permanently deleted');
                fetchNotes();
            }
        } catch (error) {
            console.error('Error permanently deleting note:', error);
            toast.error('Failed to delete note');
        }
    };

    const formatDate = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffTime = Math.abs(now - date);
        const diffMinutes = Math.ceil(diffTime / (1000 * 60));
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.ceil(diffDays / 7);
        const diffMonths = Math.ceil(diffDays / 30);

        if (diffMinutes < 60) return `${diffMinutes} mins ago`;
        if (diffHours < 24) return `${diffHours === 1 ? '1 hour' : diffHours + ' hours'} ago`;
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffWeeks === 1) return '1 week ago';
        if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
        if (diffMonths === 1) return '1 month ago';
        return `${diffMonths} months ago`;
    };

    const getNoteIcon = (tags) => {
        if (!tags || tags.length === 0) return { icon: FiFile, color: 'bg-purple-500/20', iconColor: 'text-purple-500' };
        if (tags.includes('Work')) return { icon: FiBriefcase, color: 'bg-purple-500/20', iconColor: 'text-purple-500' };
        if (tags.includes('Personal')) return { icon: FiUser, color: 'bg-blue-500/20', iconColor: 'text-blue-500' };
        if (tags.includes('Reading')) return { icon: FiBookOpen, color: 'bg-green-500/20', iconColor: 'text-green-500' };
        if (tags.includes('Ideas')) return { icon: FiZap, color: 'bg-orange-500/20', iconColor: 'text-orange-500' };
        if (tags.includes('Family')) return { icon: FiHeart, color: 'bg-pink-500/20', iconColor: 'text-pink-500' };
        if (tags.includes('Shopping')) return { icon: FiShoppingCart, color: 'bg-blue-500/20', iconColor: 'text-blue-500' };
        return { icon: FiFile, color: 'bg-gray-500/20', iconColor: 'text-gray-500' };
    };

    const getTagColor = (tag) => {
        const colors = {
            'Work': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            'Personal': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'Reading': 'bg-green-500/20 text-green-400 border-green-500/30',
            'Ideas': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
            'Family': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
            'Shopping': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
        };
        return colors[tag] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-900">
                <div className="text-xl text-white">Loading notes...</div>
            </div>
        );
    }

    console.log('Dashboard rendering with notes:', notes.length);

    return (
        <div className="flex min-h-screen bg-slate-900 text-white">
            <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-slate-900 border-r border-slate-700 transition-all duration-300 overflow-hidden flex flex-col`}>
                <div className="p-6 flex-1">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="text-blue-500 text-2xl">📝</div>
                        <span className="text-xl font-bold">NoteX</span>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">MENU</h3>
                        <nav className="space-y-1">
                            <button onClick={() => { setCurrentView('notes'); setActiveFilter('All'); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-600/30 transition ${currentView === 'notes' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:bg-slate-800'}`}>
                                <FiFile size={18} />
                                <span>All Notes</span>
                            </button>
                            <button onClick={() => { setCurrentView('favorites'); setActiveFilter('All'); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition ${currentView === 'favorites' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400'}`}>
                                <FiStar size={18} />
                                <span>Favorites</span>
                            </button>
                            <button onClick={() => { setCurrentView('trash'); setActiveFilter('All'); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition ${currentView === 'trash' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400'}`}>
                                <FiTrash size={18} />
                                <span>Trash</span>
                            </button>
                        </nav>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">TAGS</h3>
                        <nav className="space-y-1">
                            <button onClick={() => setActiveFilter('Personal')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${activeFilter === 'Personal' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:bg-slate-800'}`}>
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <span>Personal</span>
                            </button>
                            <button onClick={() => setActiveFilter('Work')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${activeFilter === 'Work' ? 'bg-purple-600/20 text-purple-400' : 'text-slate-400 hover:bg-slate-800'}`}>
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                <span>Work</span>
                            </button>
                            <button onClick={() => setActiveFilter('Reading')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${activeFilter === 'Reading' ? 'bg-green-600/20 text-green-400' : 'text-slate-400 hover:bg-slate-800'}`}>
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span>Reading</span>
                            </button>
                        </nav>
                    </div>
                </div>
                <div className="border-t border-slate-700">
                    <button className="w-full flex items-center gap-3 px-6 py-4 text-slate-400 hover:bg-slate-800 transition">
                        <FiSettings size={18} />
                        <span>Settings</span>
                    </button>
                    <div className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-lg">
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-sm">{user?.name || 'Alex Morgan'}</div>
                            <div className="text-xs text-blue-400">Pro Plan</div>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col">
                <header className="border-b border-slate-700 bg-slate-900">
                    <div className="px-6 py-4 flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white transition md:hidden">
                            <FiMenu size={24} />
                        </button>
                        <div className="flex-1 max-w-xl">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                                <input type="text" placeholder="Search titles or content..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500" />
                            </div>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white transition">
                            <FiGrid size={20} />
                        </button>
                        <button onClick={() => openModal()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium">
                            <FiPlus size={18} />
                            Create New Note
                        </button>
                        <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400 transition" title="Logout">
                            <FiLogOut size={20} />
                        </button>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-3xl font-bold">All Notes <span className="text-slate-500">({filteredNotes.length})</span></h1>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <span>Sort by:</span>
                                <button className="flex items-center gap-1 hover:text-white transition">
                                    Date Modified
                                    <FiChevronDown size={16} />
                                </button>
                            </div>
                        </div>
                        <p className="text-slate-400">View and manage your personal thoughts and projects.</p>
                    </div>
                    <div className="flex gap-3 mb-6">
                        <button onClick={() => setActiveFilter('All')} className={`px-4 py-2 rounded-lg font-medium transition ${activeFilter === 'All' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>All</button>
                        <button onClick={() => setActiveFilter('Work')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${activeFilter === 'Work' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Work
                        </button>
                        <button onClick={() => setActiveFilter('Personal')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${activeFilter === 'Personal' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Personal
                        </button>
                        <button onClick={() => setActiveFilter('Reading')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${activeFilter === 'Reading' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Reading
                        </button>
                    </div>
                    {filteredNotes.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiFile size={32} className="text-slate-600" />
                            </div>
                            <p className="text-slate-400 text-lg mb-4">No notes yet. Create your first note!</p>
                            <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">Create Note</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredNotes.map((note) => {
                                const { icon: Icon, color, iconColor } = getNoteIcon(note.tags);
                                return (
                                    <div key={note._id} className="bg-slate-800 rounded-lg p-5 border border-slate-700 hover:border-slate-600 transition group relative">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
                                                <Icon className={iconColor} size={20} />
                                            </div>
                                            {currentView !== 'trash' && (
                                                <button
                                                    onClick={(e) => toggleFavorite(note._id, e)}
                                                    className={`p-2 rounded-lg transition ${note.isFavorite ? 'text-yellow-500' : 'text-slate-400 hover:text-yellow-500'}`}
                                                >
                                                    <FiStar size={18} fill={note.isFavorite ? 'currentColor' : 'none'} />
                                                </button>
                                            )}
                                        </div>
                                        <div onClick={() => setViewingNote(note)} className="cursor-pointer">
                                            <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-400 transition">{note.title}</h3>
                                            <p className="text-slate-400 text-sm mb-4 line-clamp-3">{note.content.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-slate-500">{formatDate(note.updatedAt)}</span>
                                                {note.tags && note.tags.length > 0 && (
                                                    <span className={`px-2 py-1 rounded border ${getTagColor(note.tags[0])}`}>{note.tags[0]}</span>
                                                )}
                                            </div>
                                        </div>
                                        {currentView === 'trash' && (
                                            <div className="flex gap-2 mt-4">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); restoreNote(note._id); }}
                                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition"
                                                >
                                                    Restore
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); permanentDelete(note._id); }}
                                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition"
                                                >
                                                    Delete Forever
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
                    <div className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold text-white">{editingNote ? 'Edit Note' : 'Create New Note'}</h3>
                                <button onClick={closeModal} className="text-slate-400 hover:text-white text-2xl"><FiX /></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-slate-300 font-medium mb-2">Title</label>
                                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter note title" className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-slate-300 font-medium mb-2">Content</label>
                                    <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Write your note here..." rows="10" className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-white placeholder-slate-500" required />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-slate-300 font-medium mb-2">Tags</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Work', 'Personal', 'Reading', 'Ideas', 'Family', 'Shopping'].map(tag => (
                                            <button key={tag} type="button" onClick={() => { if (formData.tags.includes(tag)) { setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) }); } else { setFormData({ ...formData, tags: [...formData.tags, tag] }); } }} className={`px-3 py-1 rounded-lg text-sm transition border ${formData.tags.includes(tag) ? getTagColor(tag) : 'bg-slate-700 text-slate-400 hover:bg-slate-600 border-slate-600'}`}>{tag}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition font-semibold"><FiSave /> Save Note</button>
                                    <button type="button" onClick={closeModal} className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg transition font-semibold"><FiX /> Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {viewingNote && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={() => setViewingNote(null)}>
                    <div className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-700" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold text-white mb-2">{viewingNote.title}</h2>
                                    <p className="text-sm text-slate-400">{formatDate(viewingNote.updatedAt)}</p>
                                </div>
                                <button onClick={() => setViewingNote(null)} className="text-slate-400 hover:text-white text-2xl"><FiX /></button>
                            </div>
                            <div className="prose max-w-none">
                                <div className="text-slate-300 whitespace-pre-wrap text-lg leading-relaxed">{viewingNote.content}</div>
                            </div>
                            {viewingNote.tags && viewingNote.tags.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {viewingNote.tags.map((tag, index) => (
                                        <span key={index} className={`px-3 py-1 rounded-lg text-sm border ${getTagColor(tag)}`}>{tag}</span>
                                    ))}
                                </div>
                            )}
                            <div className="mt-6 flex gap-3">
                                <button onClick={() => { setViewingNote(null); openModal(viewingNote); }} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition"><FiEdit2 /> Edit Note</button>
                                <button onClick={() => { setViewingNote(null); handleDelete(viewingNote._id); }} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition"><FiTrash2 /> Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
