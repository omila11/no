import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Get all notes for logged-in user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({userId: req.userId, isDeleted: false}).sort({updatedAt: -1});
        res.status(200).json({
            success: true,
            notes
        });
    } catch (error) {
        console.error("Get notes error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching notes"
        });
    }
});

// Get a single note by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const note = await Note.findOne({_id: req.params.id, userId: req.userId});
        
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            note
        });
    } catch (error) {
        console.error("Get note error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching note"
        });
    }
});

// Create a new note
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {title, content, tags} = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            });
        }

        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: req.userId
        });

        await note.save();

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            note
        });
    } catch (error) {
        console.error("Create note error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating note"
        });
    }
});

// Update a note
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const {title, content, tags} = req.body;

        const note = await Note.findOne({_id: req.params.id, userId: req.userId});

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        note.updatedAt = Date.now();

        await note.save();

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note
        });
    } catch (error) {
        console.error("Update note error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating note"
        });
    }
});

// Delete a note (soft delete - move to trash)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const note = await Note.findOne({_id: req.params.id, userId: req.userId});

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        note.isDeleted = true;
        note.updatedAt = Date.now();
        await note.save();

        res.status(200).json({
            success: true,
            message: "Note moved to trash"
        });
    } catch (error) {
        console.error("Delete note error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting note"
        });
    }
});

// Toggle favorite
router.patch("/:id/favorite", authMiddleware, async (req, res) => {
    try {
        const note = await Note.findOne({_id: req.params.id, userId: req.userId});

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        note.isFavorite = !note.isFavorite;
        note.updatedAt = Date.now();
        await note.save();

        res.status(200).json({
            success: true,
            message: note.isFavorite ? "Added to favorites" : "Removed from favorites",
            note
        });
    } catch (error) {
        console.error("Toggle favorite error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating favorite status"
        });
    }
});

// Get trash notes
router.get("/trash/all", authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({userId: req.userId, isDeleted: true}).sort({updatedAt: -1});
        res.status(200).json({
            success: true,
            notes
        });
    } catch (error) {
        console.error("Get trash error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching trash"
        });
    }
});

// Restore note from trash
router.patch("/:id/restore", authMiddleware, async (req, res) => {
    try {
        const note = await Note.findOne({_id: req.params.id, userId: req.userId});

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        note.isDeleted = false;
        note.updatedAt = Date.now();
        await note.save();

        res.status(200).json({
            success: true,
            message: "Note restored successfully",
            note
        });
    } catch (error) {
        console.error("Restore note error:", error);
        res.status(500).json({
            success: false,
            message: "Error restoring note"
        });
    }
});

// Permanently delete note
router.delete("/:id/permanent", authMiddleware, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({_id: req.params.id, userId: req.userId});

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note permanently deleted"
        });
    } catch (error) {
        console.error("Permanent delete error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting note permanently"
        });
    }
});

export default router;
