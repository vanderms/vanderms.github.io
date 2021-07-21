import shutil

shutil.rmtree('docs', ignore_errors=True)
shutil.move('build', 'docs')
