import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

initStoryshots({
  integrityOptions: { cwd: __dirname },
  test: imageSnapshot({
    storybookUrl: 'http://localhost:6006/',
  }),
});
