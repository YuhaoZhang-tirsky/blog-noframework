const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'title A',
      content: 'content A',
      createTime: 1546610491112,
      author: 'yuhao'
    },
    {
      id: 2,
      title: 'title B',
      content: 'content B',
      createTime: 1546610492423,
      author: 'yuhao'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: 'title A',
    content: 'content A',
    createTime: 1546610491112,
    author: 'yuhao'
  }
}

module.exports = {
  getList,
  getDetail
}