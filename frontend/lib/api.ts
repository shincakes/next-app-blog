import axios from "axios";
import { BlogPost } from "../types/blog";

const API_BASE_URL = "http://localhost:5000/api/blogs/";

export const fetchPosts = async ({ page, search, per_page }: { page: number; search: string; per_page: number }) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: { page, search, per_page },  // Send the parameters as query params
      });
      return response.data;  // This should return the data in the form { posts, total_pages }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return { posts: [], total_pages: 0 };  // Default empty response in case of error
    }
  };

export const createPost = async (title: string, content: string): Promise<BlogPost> => {
  try {
    const response = await axios.post<BlogPost>(API_BASE_URL, { title, content });
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const deletePost = async (id: number | undefined): Promise<void> => {
    if (!id) {
      console.error("❌ Cannot send DELETE request: ID is undefined.");
      return;
    }
  
    try {
      console.log(`🛠️ Attempting DELETE request: ${API_BASE_URL}${id}`);
      await axios.delete(`${API_BASE_URL}${id}`, {
        headers: { "Content-Type": "application/json" }
      });
      console.log(`✅ Post ${id} deleted successfully`);
    } catch (error: any) {
      console.error("❌ Error deleting blog post:", error.response?.data || error.message);
      throw error;
    }
  };
  

export const updatePost = async (id: number | undefined, title: string, content: string): Promise<void> => {
    if (!id) {
      console.error("❌ Cannot send PUT request: ID is undefined.");
      return;
    }
  
    try {
      console.log(`🛠️ Attempting PUT request: ${API_BASE_URL}${id}`);
      await axios.put(`${API_BASE_URL}${id}`, { title, content }, {
        headers: { "Content-Type": "application/json" }
      });
      console.log(`✅ Post ${id} updated successfully`);
    } catch (error: any) {
      console.error("❌ Error updating blog post:", error.response?.data || error.message);
      throw error;
    }
  };
  
  