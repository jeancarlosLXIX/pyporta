import os
commit = input("Commit message: ")
os.system(f'git add . && git commit -m "{commit}" && git push')