const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  if (blogs.length === 1) return blogs[0].likes

  const reducer = (sum, item) => {
    return sum.likes + item.likes
  }

  return blogs.reduce(reducer)
}

const favoriteBlog = (blogs) => {
  // if (blogs.length === 1) return blogs.shift();

  let max = blogs[0]
  blogs.forEach((blog) => {
    if (blog.likes > max.likes) {
      max = blog
    }
  })

  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
