const appService = require('./')

describe('application service ', () => {
  it('should throw an error if no body is passed', () => {
    expect(() => appService.appendEmailDataToCsvFile()).toThrow(
      'email data is expected',
    )
  })

  it('should return a test indicatiing email has been appended', () => {
    const data = { email: 'a@yahoo.com' }
    expect(() =>
      appService
        .appendEmailDataToCsvFile(data)
        .toBe('Email appended to the CSV file.'),
    )
  })
})
