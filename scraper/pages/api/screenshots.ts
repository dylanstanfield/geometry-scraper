import glob from 'glob';

export default async (req, res) => {
  glob('./public/screenshots/**/*.png', (error, files) => {
    if (error) {
      res.statusCode = 500;
      res.send('Unable to load screenshots');

      return;
    }

    res.statusCode = 200;
    res.json({
      screenshots: files.map(file => file.replace('./public', '')),
    });
  });
}
