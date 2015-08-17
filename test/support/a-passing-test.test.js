describe('A test that passes', () => {
  it('passes', () => {
    console.log('Within protractor block');
    browser.get('/');

    browser.driver.getPageSource().then(function (source) {
      console.log(source);
    });

    expect($('#failure').isPresent()).toBeTruthy();
  });
});
