import directoryTree from 'directory-tree';

export default async (req, res) => {
  const screenshots = directoryTree('./public/screenshots', { extensions:/\.png$/ });

  res.statusCode = 200;
  res.json({ screenshots });
}
