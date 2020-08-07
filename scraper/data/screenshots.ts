import { DirectoryTree } from 'directory-tree';

export const getScreenshots = async () => {
    const res = await fetch('http://localhost:3000/api/screenshots');
    return (await res.json() as { screenshots: DirectoryTree });
}