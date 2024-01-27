const express = require("express");
const { borrowedBook, returnBook, allBook } = require("../controllers/libraryControllers");

const router = express.Router();

/**
 * @swagger
 * /api/library/borrow-book:
 *   post:
 *     summary: Borrow a book.
 *     description: Endpoint to allow members to borrow book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     tags:
 *       - Library
 *     responses:
 *       200:
 *         description: Book borrowed successfully.
 *       400:
 *         description: Bad request or member is penalized.
 *       404:
 *         description: Member not found or book not available.
 */
router.post("/borrow-book", borrowedBook);

/**
 * @swagger
 * /api/library/return-book:
 *   post:
 *     summary: Return a borrowed book.
 *     description: Endpoint for members to return a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     tags:
 *       - Library
 *     responses:
 *       200:
 *         description: Book returned successfully.
 *       400:
 *         description: Book returned after more than 7 days, penalty applied or invalid return.
 *       404:
 *         description: Member has not borrowed this book.
 */
router.post("/return-book", returnBook);

/**
 * @swagger
 * /api/library/books:
 *   get:
 *     summary: Get information about all books.
 *     description: Endpoint to show existing books and quantities.
 *     tags:
 *       - Library
 *     responses:
 *       200:
 *         description: List of books with available quantities.
 *       500:
 *         description: Internal server error.
 */
router.get("/books", allBook);


module.exports = router;
