const { exec, escape } = require('../db/mysql') 
const xss = require('xss')

const getList = (author, keyword) => {
  author = escape(xss(author))
  keyword = escape('%'+xss(keyword)+'%')
  let sql = `select * from blogs where 1=1 `
  if (author != "''") {
    sql += `and author=${author} `
  }
  if (keyword) {
    sql += `and title like ${keyword} `
  }
  sql += `order by createtime desc;`

  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id=${id} `
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const title = escape(xss(blogData.title))
  const content = escape(xss(blogData.content))
  const author = escape(xss(blogData.author))
  const createTime = Date.now()
  const sql = `
    insert into blogs (title, content, createtime, author) 
    values (${title}, ${content},${createTime},${author})
  `
  return exec(sql).then(insertData => {
    //console.log('insertData is ', insertData)
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const title = escape(xss(blogData.title))
  const content = escape(xss(blogData.content))

  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `
  return exec(sql).then(updateData => {
    if(updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

const deleteBlog = (id, author) => {
  const sql = `
    delete from blogs where id='${id}' and author='${author}'
  `
  return exec(sql).then(deleteData => {
    if(deleteData.affectedRows > 0) {
      return true
    }
    return false
  })
}



module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}