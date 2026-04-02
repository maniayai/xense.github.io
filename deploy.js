const { execSync } = require('child_process');

console.log('>>> 开始部署...');

console.log('>>> 执行 npm run build...');
execSync('npm run build', { stdio: 'inherit' });

process.chdir('build');

console.log('>>> 初始化 Git...');
execSync('git init', { stdio: 'inherit' });
execSync('git add -A', { stdio: 'inherit' });
execSync('git commit -m deploy', { stdio: 'inherit' });

console.log('>>> 推送到 docs 分支...');
execSync('git push -f https://github.com/maniayai/xense.github.io.git master:docs', { stdio: 'inherit' });

process.chdir('..');
console.log('>>> 部署完成！');