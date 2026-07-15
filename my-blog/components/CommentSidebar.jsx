"use client";

import { useState, useEffect } from "react";
import api from "../lib/api";

function CommentSidebar({ open, onClose, blog }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      const res = await api.post(`/comments/${blog._id}/comment`, {
        comment,
      });

      setComments(res.data.comments);
      setComment("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to comment");
    }
  };
  const handleEditComment = async (commentId) => {
    try {
      const res = await api.put(`/comments/${blog._id}/comment/${commentId}`, {
        comment: editedComment,
      });
      setComments(res.data.comments);
      setEditingId(null);
      setEditedComment("");
      alert("Comment updated!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update comment");
    }
  };
  const handleDeleteComment = async (commentId) => {
    const confirmDelete = confirm("Delete this comment?");
    if (!confirmDelete) return;
    try {
      const res = await api.delete(
        `/comments/${blog._id}/comment/${commentId}`,
      );
      setComments(res.data.comments);
      alert("Comment deleted!");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
      console.log(error.response);
      console.log(error.response?.data);
    }
  };
  useEffect(() => {
    if (blog) {
      setComments(blog.comments || []);
    }
  }, [blog]);

  if (!blog) return null;

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <h2 className="text-2xl font-bold">Comments</h2>

            <p className="text-gray-500 text-sm mt-1">{blog.title}</p>
          </div>

          <button onClick={onClose} className="text-3xl">
            ×
          </button>
        </div>

        <div className="h-[65vh] overflow-y-auto p-5 space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="border p-3 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">
                      {c.user?.name || "Anonymous"}
                    </p>
                    <p className="text-gray-700">{c.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="ml-2 text-sm flex flex-col items-end">
                    <button
                      onClick={() => {
                        setEditingId(c._id);
                        setEditedComment(c.comment);
                      }}
                      className="text-blue-600 mb-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(c._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {editingId === c._id && (
                  <div className="mt-3">
                    <textarea
                      rows={2}
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="w-full border rounded-lg p-2 resize-none"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEditComment(c._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditedComment("");
                        }}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 w-full border-t bg-white p-5">
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border rounded-lg p-3 resize-none"
          />

          <button
            onClick={handleComment}
            className="mt-3 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Post Comment
          </button>
        </div>
      </div>
    </>
  );
}

export default CommentSidebar;
