import { ProjPage } from './app.po';

describe('proj App', () => {
  let page: ProjPage;

  beforeEach(() => {
    page = new ProjPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
