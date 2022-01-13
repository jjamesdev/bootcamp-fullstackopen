const listHelper = require('../utils/list_helpers')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const listBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f5',
    title: 'El camino del exceso',
    author: 'w. blake',
    url: 'http://algo',
    likes: 8,
    __v: 0,
  },
]

test('dummy returns one', () => {
  const blogs = []

  const results = listHelper.dummy(blogs)
  expect(results).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const results = listHelper.totalLikes(listWithOneBlog)
    expect(results).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const results = listHelper.totalLikes(listBlog)
    expect(results).toBe(13)
  })
})

describe('favorite blog', () => {
  test('favorite', () => {
    const results = listHelper.favoriteBlog(listBlog)
    expect(results).toEqual({
      _id: '5a422aa71b54a676234d17f5',
      title: 'El camino del exceso',
      author: 'w. blake',
      url: 'http://algo',
      likes: 8,
      __v: 0,
    })
  })
})
