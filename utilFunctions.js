exports.getCommentCount = (articlesData, commentsData) => {
  const newArticlesData = [];
  articlesData.forEach((item) => {
    const temp = Object.assign({}, item);
    newArticlesData.push(temp);
  });

  const keyToFind = {};
};
