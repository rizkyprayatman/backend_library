const express = require("express");
const { allMembers } = require("../controllers/membersControllers");

const router = express.Router();

/**
 * @swagger
 * /api/library/member/all:
 *   get:
 *     summary: Get information about all members.
 *     description: Endpoint to show existing members and the number of books being borrowed by each member.
 *     tags:
 *       - Members
 *     responses:
 *       200:
 *         description: List of members with borrowed books count.
 *       500:
 *         description: Internal server error.
 */
router.get("/all", allMembers);


module.exports = router;
