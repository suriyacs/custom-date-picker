import { newE2EPage } from '@stencil/core/testing';

describe('date-calendar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<date-calendar></date-calendar>');

    const element = await page.find('date-calendar');
    expect(element).toHaveClass('hydrated');
  });
});
