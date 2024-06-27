// utils/errorHandler.js
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  };
  
  module.exports = { handleError };
  