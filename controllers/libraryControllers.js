const { Op } = require('sequelize');
const { Member, Book, BorrowedBook, Penalty } = require('../models');

const borrowedBook = async (req, res) => {
    try {
        const { memberCode, bookCode } = req.body;

        const member = await Member.findOne({ where: { code: memberCode } });
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        const isPenalized = await Penalty.findOne({
            where: {
                memberCode,
                penaltyDate: {
                    [Op.lte]: new Date(),
                },
            },
        });
        if (isPenalized) {
            return res.status(400).json({ error: 'Member is currently penalized' });
        }

        const borrowedBooksCount = await BorrowedBook.count({ where: { memberCode, returnDate: null } });
        if (borrowedBooksCount >= 2) {
            return res.status(400).json({ error: 'Member cannot borrow more than 2 books' });
        }

        const book = await Book.findOne({ where: { code: bookCode, stock: { [Op.gt]: 0 } } });
        if (!book) {
            return res.status(404).json({ error: 'Book not found or not available' });
        }

        await BorrowedBook.create({
            memberCode,
            bookCode,
            borrowDate: new Date(),
        });

        await Book.update({ stock: book.stock - 1 }, { where: { code: bookCode } });

        res.status(200).json({ success: true, message: 'Book borrowed successfully' });
    } catch (error) {
        // next(error);
        // console.error('Error borrowing book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const returnBook = async (req, res) => {
    try {
        const { memberCode, bookCode } = req.body;

        const book = await Book.findOne({ where: { code: bookCode} });
        if (!book) {
            return res.status(404).json({ error: 'Book not found or not available' });
        }

        const borrowedBook = await BorrowedBook.findOne({
            where: {
                memberCode,
                bookCode,
                returnDate: null,
            },
        });
        if (!borrowedBook) {
            return res.status(404).json({ error: 'Member has not borrowed this book' });
        }

        const borrowDate = borrowedBook.borrowDate;
        const currentDate = new Date();
        const daysOverdue = Math.ceil((currentDate - borrowDate) / (1000 * 60 * 60 * 24));

        if (daysOverdue > 7) {
            await Penalty.create({
                memberCode,
                penaltyDate: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days penalty
            });
            return res.status(400).json({ error: 'Book returned after more than 7 days, penalty applied' });
        }

        await BorrowedBook.update({ returnDate: currentDate }, { where: { id: borrowedBook.id } });

        await Book.update({ stock: book.stock + 1 }, { where: { code: bookCode } });

        res.status(200).json({ success: true, message: 'Book returned successfully' });
    } catch (error) {
        // next(error);
        // console.error('Error returning book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const allBook = async (req, res) => {
    try {
        const books = await Book.findAll();
    
        res.status(200).json({ books: books });
      } catch (error) {
        // next(error);
        // console.error('Error checking books:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};


module.exports = {
    borrowedBook,
    returnBook,
    allBook
};