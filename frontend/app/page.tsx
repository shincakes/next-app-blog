"use client";

import { useEffect, useState } from "react";
import { fetchPosts, createPost, deletePost, updatePost } from "../lib/api";
import { BlogPost } from "../types/blog";
import { FaEdit, FaTimes, FaBars } from "react-icons/fa";

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // ✅ State for Create and Edit Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ✅ Fetch posts when page or search changes
  useEffect(() => {
    fetchPosts({ page: currentPage, search, per_page: 5 }).then((data) => {
      setPosts(data.posts);
      setTotalPages(data.total_pages);
    });
  }, [currentPage, search]);
  

  // ✅ Handle Create Post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const newPost = await createPost(title, content);
      setPosts([newPost, ...posts]);
      setTitle("");
      setContent("");
      setIsCreateModalOpen(false); // ✅ Close modal after submission
    } catch (error) {
      console.error("Failed to create post");
    }
  };

  // ✅ Handle Open Edit Modal
  const handleEditClick = (post: BlogPost) => {
    console.log("Editing Post:", post); // ✅ Debugging
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setIsEditModalOpen(true);
  };

  // ✅ Handle Update Post
  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    console.log("Updating Post:", editingPost.id, title, content); // ✅ Debugging

    try {
      await updatePost(editingPost.id, title, content);
      setPosts(posts.map((post) => (post.id === editingPost.id ? { ...post, title, content } : post)));
      setIsEditModalOpen(false); // ✅ Close modal
      setEditingPost(null);
    } catch (error) {
      console.error("Failed to update post");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      
      // ✅ Close the modal when deleting
      setIsEditModalOpen(false);
      setEditingPost(null);
    } catch (error) {
      console.error("Error deleting post");
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col text-black">
      {/* 🔥 Navbar */}
      <nav className="py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full">
        <h1 className="text-xl font-bold">Lambertdc</h1>
        <button className="text-2xl text-gray-700 hover:text-gray-900">
          <FaBars />
        </button>
      </nav>

      {/* 🔥 Main Content */}
      <div className="flex-grow max-w-5xl mx-auto p-6 pt-20 w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold">Blog Posts</h1>
            <p className="text-gray-500">You currently have {posts.length} blogs</p>
          </div>
          <button 
            onClick={() => {
              setTitle(""); 
              setContent(""); 
              setIsCreateModalOpen(true);
            }}
            className="text-blue-600 font-bold px-4 py-2 rounded-full transition-all duration-300 hover:bg-blue-200"
          >
            Create New
          </button>
        </div>

        {/* 🔥 Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Blogs"
            className="border border-gray-300 p-3 w-full rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 🔥 Blog Posts */}
        <div className="w-full flex-grow max-h-[70vh] overflow-y-auto space-y-4">
          {posts.length > 0 ? (
            posts.slice(0, 5).map((post) => (
              <div key={post.id} className="bg-white shadow-md p-6 rounded-xl flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold">{post.title}</h2>
                    <p className="text-gray-500 text-sm">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button className="text-black-600 hover:text-gray-900" onClick={() => handleEditClick(post)}>
                      <FaEdit size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{post.content}</p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-xl font-medium">No blog posts yet.</p>
          </div>
          )}
        </div>
      </div>

      {/* 🔥 Create Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center max-h-80vh overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Create New Blog</h2>
              <button className="text-gray-400 hover:text-gray-700" onClick={() => setIsCreateModalOpen(false)}>
                <FaTimes size={20} />
              </button>

          </div>
            <form onSubmit={handleCreatePost}>
              <input type="text" placeholder="Title" className="border p-2 w-full rounded-lg mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
              <textarea placeholder="Content" className="border p-2 w-full rounded-lg mb-2" value={content} onChange={(e) => setContent(e.target.value)} />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700">Create Post</button>
            </form>
          </div>
        </div>
      )}

      {/* 🔥 Edit Post Modal */}
      {isEditModalOpen && editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
             {/* 🔥 Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Edit Blog</h2>
              <button className="text-gray-400 hover:text-gray-500" onClick={() => setIsEditModalOpen(false)}>
                <FaTimes size={20} />
              </button>

          </div>
            <form onSubmit={handleUpdatePost}>
              <input type="text" placeholder="Title" className="border p-2 w-full rounded-lg mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
              <textarea placeholder="Content" className="border p-2 w-full rounded-lg mb-2" value={content} onChange={(e) => setContent(e.target.value)} />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 mb-1">Update Post</button>
              <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600" onClick={() => handleDelete(editingPost.id)}>Delete Post</button>
            </form>
          </div>
        </div>
      )}

        {/* Pagination Controls */}
        <div className="fixed bottom-0 left-0 w-full  py-2 flex justify-center items-center gap-4 text-gray-600">
          <button
            className={`text-sm font-medium ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:text-black'}`}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-sm">Page {currentPage} of {totalPages}</span>

          <button
            className={`text-sm font-medium ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:text-black'}`}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>


    </div>
  );
}
