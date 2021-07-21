import shutil
import os

shutil.rmtree('docs', ignore_errors=True)
shutil.move('build', 'docs')

message = input('insert commit message: ')
os.system('git add .')
os.system(f'git commit -m "{ message }"')
os.system('git push origin main')

