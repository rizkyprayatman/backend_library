const { literal } = require('sequelize');
const { Member, BorrowedBook } = require('../models');

const allMembers = async (req, res, next) => {
    try {
        const members = await Member.findAll({
            attributes: [
                'code',
                'name',
                [literal('(SELECT COUNT(*) FROM "borrowedBooks" WHERE "borrowedBooks"."memberCode" = "Member"."code")'), 'borrowedBooksCount']
            ],
            include: [{
                model: BorrowedBook,
                as: 'borrowedBook'
            }],
        });

        res.status(200).json({ members: members });
    } catch (error) {
        // next(error);
        console.error('Error checking members:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    allMembers
};
