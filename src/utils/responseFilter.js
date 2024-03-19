const excludeTimeStamp = () => {
  return ['updatedAt', 'deletedAt', 'createdAt'];
};

module.exports = { excludeTimeStamp };
