/* eslint-disable no-undef */
import list_helper from '../utils/list_helper'

describe('dummy', () => {
  test('dummy returns 1', () => {
    const blogs = []
    const result = list_helper.dummy(blogs)
    expect(result).toBe(1)
  })
})