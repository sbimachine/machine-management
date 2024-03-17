module.exports = function getPagination(count, page, limit) {
  const totalPage = Math.ceil(parseInt(count) / parseInt(limit));
  const current = parseInt(page);
  return {
    currentPage: current,
    totalPage: totalPage,
    totalData: count,
  };
};
